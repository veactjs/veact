/**
 * @module veact.watch.watch
 * @author Surmon <https://github.com/surmon-china>
 */

// DOC: https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watch
// fork form: https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/src/apiWatch.ts
import { useState as useReactState } from 'react'
import {
  isRef,
  isReactive,
  Ref,
  EffectScheduler,
  ReactiveEffect,
} from '@vue/reactivity'
import { onBeforeUnmount } from '../lifecycle'
import type { ComputedRef } from '../reactivity'

import { logger, callWithErrorHandling, callWithAsyncErrorHandling } from '../logger'
import { hasChanged, isArray, isFunction } from '../utils'
import {
  traverse,
  WATCH_GETTER_ERROR,
  WATCH_CLEANUP_ERROR,
  WATCH_CALLBACK_ERROR,
} from './patch'
import {
  WatchEffectOptions,
  WatchStopHandle,
  InvalidateCallbackRegistrator,
} from './watchEffect'

const NOOP_FN = () => {}
const INITIAL_WATCHER_VALUE = {}
const warnInvalidSource = (source: unknown) => {
  logger.warn(
    `Invalid watch source: `,
    source,
    `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
  )
}

export interface WatchOptions<Immediate = boolean> extends WatchEffectOptions {
  immediate?: Immediate
  deep?: boolean
  /* in SSR there is no need to setup an actual effect, and it will return noop. */
  ssr?: boolean
}

export type WatchFn<T> = () => T
export type WatchSource<T = any> = Ref<T> | ComputedRef<T> | WatchFn<T>
export type WatchCallback<Value = any, OldValue = any> = (
  value: Value,
  oldValue: OldValue,
  onInvalidate: InvalidateCallbackRegistrator
) => any

type MultiWatchSources = (WatchSource<unknown> | object)[]
type MapSources<T, Immediate> = {
  [K in keyof T]: T[K] extends WatchSource<infer V>
    ? Immediate extends true
      ? V | undefined
      : V
    : T[K] extends object
    ? Immediate extends true
      ? T[K] | undefined
      : T[K]
    : never
}

// overload: array of multiple sources + cb
export function watch<
  T extends MultiWatchSources,
  Immediate extends Readonly<boolean> = false
>(
  sources: [...T],
  cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
  options?: WatchOptions<Immediate>
): WatchStopHandle

/**
 * overload: multiple sources w/ `as const`
 * @description somehow [...T] breaks when the type is readonly
 * @example watch([foo, bar] as const, () => {})
 */
export function watch<
  T extends Readonly<MultiWatchSources>,
  Immediate extends Readonly<boolean> = false
>(
  source: T,
  cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
  options?: WatchOptions<Immediate>
): WatchStopHandle

// overload: single source + cb
export function watch<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchOptions<Immediate>
): WatchStopHandle

// overload: watching reactive object w/ cb
export function watch<T extends object, Immediate extends Readonly<boolean> = false>(
  source: T,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchOptions<Immediate>
): WatchStopHandle

// implementation
export function watch<T = any, Immediate extends Readonly<boolean> = false>(
  source: T | WatchSource<T>,
  callback: WatchCallback<T>,
  options: WatchOptions<Immediate> = {}
): WatchStopHandle {
  if (!isFunction(callback)) {
    logger.warn(`\`watch\` only supports \`watch(source, cb, options?) signature.`)
  }

  const { immediate, deep, ssr, onTrack, onTrigger } = options
  let getter: WatchFn<any>
  let effector: ReactiveEffect<T>

  let isDeep = deep
  let isMultiSource = false
  let forceTrigger = false
  let cleanup: () => void
  let onInvalidate: InvalidateCallbackRegistrator = (fn: () => void) => {
    cleanup = effector.onStop = () => {
      callWithErrorHandling(fn, WATCH_CLEANUP_ERROR)
    }
  }

  if (isFunction(source)) {
    // Function
    getter = () => callWithErrorHandling(source, WATCH_GETTER_ERROR)
  } else if (isRef(source)) {
    // Ref | ComputedRef
    forceTrigger = Boolean((source as any)._shallow)
    getter = () => source.value
  } else if (isReactive(source)) {
    // Reactive
    isDeep = true
    getter = () => source
  } else if (isArray(source)) {
    // Array
    isMultiSource = true
    forceTrigger = source.some(isReactive)
    getter = () => {
      return source.map((_source) => {
        if (isRef(_source)) {
          return _source.value
        } else if (isReactive(_source)) {
          return traverse(_source)
        } else if (isFunction(_source)) {
          return callWithErrorHandling(_source, WATCH_GETTER_ERROR)
        } else {
          warnInvalidSource(_source)
          return null
        }
      })
    }
  } else {
    getter = NOOP_FN
    warnInvalidSource(source)
  }

  // deep
  if (isDeep) {
    const _getter = getter
    getter = () => traverse(_getter())
  }

  // in SSR there is no need to setup an actual effect, and it should be noop, unless it's eager.
  if (ssr) {
    // we will also not call the invalidate callback (+ runner is not set up)
    onInvalidate = NOOP_FN
    if (immediate) {
      callWithAsyncErrorHandling(callback, WATCH_CALLBACK_ERROR, [
        getter(),
        isMultiSource ? [] : undefined,
        onInvalidate,
      ])
    }
    return NOOP_FN
  }

  let oldValue: any = isMultiSource ? [] : INITIAL_WATCHER_VALUE
  const scheduler: EffectScheduler = () => {
    if (!effector.active) {
      return
    }
    const newValue = effector.run()
    if (
      isDeep ||
      forceTrigger ||
      (isMultiSource
        ? (newValue as unknown as any[]).some((value, i) =>
            hasChanged(value, (oldValue as any[])[i])
          )
        : hasChanged(newValue, oldValue))
    ) {
      // cleanup before running cb again
      cleanup?.()
      callWithAsyncErrorHandling(callback, WATCH_CALLBACK_ERROR, [
        newValue,
        // pass undefined as the old value when it's changed for the first time
        oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
        onInvalidate,
      ])
      oldValue = newValue
    }
  }

  effector = new ReactiveEffect<T>(getter, scheduler)
  effector.onTrack = onTrack
  effector.onTrigger = onTrigger

  // initial run
  if (immediate) {
    scheduler()
  } else {
    oldValue = effector.run()
  }

  // stop handle
  return () => effector.stop()
}

// ------------------------------

// fork watch types
export function useWatch<
  T extends MultiWatchSources,
  Immediate extends Readonly<boolean> = false
>(
  sources: [...T],
  cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
  options?: WatchOptions<Immediate>
): WatchStopHandle
export function useWatch<
  T extends Readonly<MultiWatchSources>,
  Immediate extends Readonly<boolean> = false
>(
  source: T,
  cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
  options?: WatchOptions<Immediate>
): WatchStopHandle
// overload: single source + cb
export function useWatch<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchOptions<Immediate>
): WatchStopHandle
// overload: watching reactive object w/ cb
export function useWatch<T extends object, Immediate extends Readonly<boolean> = false>(
  source: T,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchOptions<Immediate>
): WatchStopHandle
// implementation
export function useWatch<T = any, Immediate extends Readonly<boolean> = false>(
  source: T | WatchSource<T>,
  callback: WatchCallback<T>,
  options: WatchOptions<Immediate> = {}
): WatchStopHandle {
  const [stopHandler] = useReactState(() => watch(source as any, callback, options))
  onBeforeUnmount(() => stopHandler?.())
  return stopHandler
}
