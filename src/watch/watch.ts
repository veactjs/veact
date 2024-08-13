/**
 * @module veact.watch.watch
 * @author Surmon <https://github.com/surmon-china>
 */

import { useState as useReactState } from 'react'
import { isRef, isShallow, isReactive, getCurrentScope, EffectFlags, ReactiveEffect } from '@vue/reactivity'
import type { Ref, ComputedRef, ReactiveMarker, EffectScheduler, DebuggerOptions } from '@vue/reactivity'
import { onBeforeUnmount } from '../lifecycle'
import { logger } from '../_logger'
import { hasChanged, isArray, isFunction, removeArrayItem } from '../_utils'
import type { EffectScope, WatchHandle, OnCleanup } from './type'
import {
  traverse,
  NOOP_FN,
  WATCH_GETTER_ERROR,
  WATCH_CLEANUP_ERROR,
  WATCH_CALLBACK_ERROR,
  callWithErrorHandling,
  callWithAsyncErrorHandling,
} from './patch'

// fork form: https://github.com/vuejs/core/blob/main/packages/runtime-core/src/apiWatch.ts

// initial value for watchers to trigger on undefined initial values
const INITIAL_WATCHER_VALUE = {}

const warnInvalidSource = (source: unknown) => {
  logger.warn(
    `Invalid watch source: `,
    source,
    `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`,
  )
}

export interface WatchOptions<Immediate = boolean> extends DebuggerOptions {
  immediate?: Immediate
  deep?: boolean | number
  once?: boolean
  // The `flush` option is not supported in react at the moment.
  // flush?: 'pre' | 'post' | 'sync'
}

type WatchFn<T> = () => T
export type WatchSource<T = any> = Ref<T, any> | ComputedRef<T> | WatchFn<T>
export type MultiWatchSources = (WatchSource<unknown> | object)[]
export type WatchCallback<Value = any, OldValue = any> = (
  value: Value,
  oldValue: OldValue,
  onCleanup: OnCleanup,
) => any

type MaybeUndefined<T, I> = I extends true ? T | undefined : T
type MapSources<T, Immediate> = {
  [K in keyof T]: T[K] extends WatchSource<infer V>
    ? MaybeUndefined<V, Immediate>
    : T[K] extends object
      ? MaybeUndefined<T[K], Immediate>
      : never
}

/**
 * Watches one or more reactive data sources and invokes a callback function when the sources change.
 *
 * @param source - The watcher's source.
 * @param callback - This function will be called when the source is changed.
 * @param options - An optional options object that does not support the `flush` option compared to Vue (3.5.0).
 * @see {@link https://vuejs.org/api/reactivity-core.html#watch Vue `watch()`}
 *
 * @example
 * ```js
 * const count = ref(0)
 * watch(count, (count, prevCount) => {
 *  // ...
 * })
 * ```
 */

// overload: single source + cb
export function watch<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  callback: WatchCallback<T, MaybeUndefined<T, Immediate>>,
  options?: WatchOptions<Immediate>,
): WatchHandle

// overload: reactive array or tuple of multiple sources + cb
export function watch<T extends Readonly<MultiWatchSources>, Immediate extends Readonly<boolean> = false>(
  sources: readonly [...T] | T,
  callback: [T] extends [ReactiveMarker]
    ? WatchCallback<T, MaybeUndefined<T, Immediate>>
    : WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
  options?: WatchOptions<Immediate>,
): WatchHandle

// overload: array of multiple sources + cb
export function watch<T extends MultiWatchSources, Immediate extends Readonly<boolean> = false>(
  sources: [...T],
  callback: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
  options?: WatchOptions<Immediate>,
): WatchHandle

// overload: watching reactive object w/ cb
export function watch<T extends object, Immediate extends Readonly<boolean> = false>(
  source: T,
  callback: WatchCallback<T, MaybeUndefined<T, Immediate>>,
  options?: WatchOptions<Immediate>,
): WatchHandle

// implementation
export function watch<T = any, Immediate extends Readonly<boolean> = false>(
  source: T | WatchSource<T>,
  callback: WatchCallback<T>,
  options: WatchOptions<Immediate> = {},
): WatchHandle {
  const { immediate, deep, once, onTrack, onTrigger } = options
  const reactiveGetter = (source: object) => {
    // traverse will happen in wrapped getter below
    if (deep) return source
    // for `deep: false | 0` or shallow reactive, only traverse root-level properties
    if (isShallow(source) || deep === false || deep === 0) return traverse(source, 1)
    // for `deep: undefined` on a reactive object, deeply traverse all properties
    return traverse(source)
  }

  let watchHandle: WatchHandle
  let getter: WatchFn<any>
  let forceTrigger = false
  let isMultiSource = false
  let effect: ReactiveEffect<T>

  // In an SSR environment, callbacks need to be wrapped
  if (once) {
    const _callback = callback
    callback = (...args) => {
      _callback(...args)
      watchHandle()
    }
  }

  if (isRef(source)) {
    getter = () => source.value
    forceTrigger = isShallow(source)
  } else if (isReactive(source)) {
    // @ts-ignore
    getter = () => reactiveGetter(source)
    forceTrigger = true
  } else if (isArray(source)) {
    isMultiSource = true
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s))
    getter = () => {
      return source.map((s) => {
        if (isRef(s)) {
          return s.value
        } else if (isReactive(s)) {
          return reactiveGetter(s)
        } else if (isFunction(s)) {
          return callWithErrorHandling(s, WATCH_GETTER_ERROR)
        } else {
          warnInvalidSource(s)
        }
      })
    }
  } else if (isFunction(source)) {
    getter = () => callWithErrorHandling(source, WATCH_GETTER_ERROR)
  } else {
    getter = NOOP_FN
    warnInvalidSource(source)
  }

  if (deep) {
    const baseGetter = getter
    const depth = deep === true ? Infinity : deep
    getter = () => traverse(baseGetter(), depth)
  }

  let cleanup: (() => void) | undefined
  let onCleanup: OnCleanup = (fn: () => void) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, WATCH_CLEANUP_ERROR)
      cleanup = effect.onStop = undefined
    }
  }

  // in SSR there is no need to setup an actual effect, and it should be noop, unless it's eager.
  // if (isSSR) {
  //   // we will also not call the invalidate callback (+ runner is not set up)
  //   onCleanup = NOOP_FN
  //   if (immediate) {
  //     callWithAsyncErrorHandling(callback, WATCH_CALLBACK_ERROR, [
  //       getter(),
  //       isMultiSource ? [] : undefined,
  //       onCleanup,
  //     ])
  //   }
  //   watchHandle = () => {}
  //   watchHandle.stop = NOOP_FN
  //   watchHandle.resume = NOOP_FN
  //   watchHandle.pause = NOOP_FN
  //   return watchHandle
  // }

  let oldValue: any = isMultiSource
    ? new Array((source as []).length).fill(INITIAL_WATCHER_VALUE)
    : INITIAL_WATCHER_VALUE

  const scheduler: EffectScheduler = (immediateFirstRun?: boolean) => {
    if (!((effect as any).flags & EffectFlags.ACTIVE) || (!effect.dirty && !immediateFirstRun)) {
      return
    }
    const newValue = effect.run()
    if (
      deep ||
      forceTrigger ||
      (isMultiSource
        ? (newValue as any[]).some((v, i) => hasChanged(v, oldValue[i]))
        : hasChanged(newValue, oldValue))
    ) {
      // cleanup before running cb again
      cleanup?.()
      callWithAsyncErrorHandling(callback, WATCH_CALLBACK_ERROR, [
        newValue,
        // pass undefined as the old value when it's changed for the first time
        oldValue === INITIAL_WATCHER_VALUE
          ? undefined
          : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE
            ? []
            : oldValue,
        onCleanup,
      ])
      oldValue = newValue
    }
  }

  effect = new ReactiveEffect<T>(getter)
  ;(effect as any).flags |= EffectFlags.NO_BATCH
  effect.scheduler = scheduler
  effect.onTrack = onTrack
  effect.onTrigger = onTrigger

  const scope = getCurrentScope()
  // @ts-ignore
  watchHandle = () => {
    effect.stop()
    if (scope) {
      removeArrayItem((scope as EffectScope).effects, effect)
    }
  }

  watchHandle.pause = effect.pause.bind(effect)
  watchHandle.resume = effect.resume.bind(effect)
  watchHandle.stop = watchHandle

  // initial run
  if (immediate) {
    scheduler(true)
  } else {
    oldValue = effect.run()
  }

  // stop handle
  return watchHandle
}

/**
 * Watches one or more reactive data sources and invokes a callback function when the sources change.
 *
 * @param source - The watcher's source.
 * @param callback - This function will be called when the source is changed.
 * @param options - An optional options object that does not support the `flush` option compared to Vue (3.5.0).
 * @see {@link https://vuejs.org/api/reactivity-core.html#watch Vue `watch()`}
 *
 * @example
 * ```js
 * const count = useRef(0)
 * useWatch(count, (count, prevCount) => {
 *  // ...
 * })
 * ```
 */
export const useWatch: typeof watch = (source: any, callback: any, options = {}) => {
  const [watchHandle] = useReactState(() => watch(source as any, callback, options))
  onBeforeUnmount(() => watchHandle.stop())
  return watchHandle
}
