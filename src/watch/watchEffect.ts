/**
 * @module veact.watch.watchEffect
 * @author Surmon <https://github.com/surmon-china>
 */

// DOC: https://vuejs.org/api/reactivity-core.html#watcheffect
// fork form: https://github.com/vuejs/core/blob/main/packages/runtime-core/src/apiWatch.ts#L82
import { useState as useReactState } from 'react'
import { getCurrentScope, EffectFlags, ReactiveEffect } from '@vue/reactivity'
import type { DebuggerOptions, EffectScheduler } from '@vue/reactivity'
import { onBeforeUnmount } from '../lifecycle'
import { removeArrayItem } from '../_utils'
import type { OnCleanup, EffectScope, WatchHandle } from './type'
import {
  WATCH_CLEANUP_ERROR,
  WATCH_CALLBACK_ERROR,
  callWithErrorHandling,
  callWithAsyncErrorHandling,
} from './patch'

export type WatchEffectOptions = DebuggerOptions
export type WatchEffect = (onCleanup: OnCleanup) => void

/**
 * Runs a function immediately while reactively tracking its dependencies and re-runs it whenever the dependencies are changed.
 *
 * @param effectFn - The effect function to run.
 * @param options - An optional options object that can be used to adjust the effect's flush timing or to debug the effect's dependencies; the `flush` option is not supported compared to Vue (3.5.0).
 * @see {@link https://vuejs.org/api/reactivity-core.html#watcheffect Vue `watchEffect()`}
 *
 * @example
 * ```js
 * const count = ref(0)
 * watchEffect(() => console.log(count.value))
 * // -> logs 0
 *
 * count.value++
 * // -> logs 1
 * ```
 */
export function watchEffect(effectFn: WatchEffect, options: WatchEffectOptions = {}): WatchHandle {
  let effect: ReactiveEffect<any>
  let watchHandle: WatchHandle
  let cleanup: (() => void) | undefined

  const onCleanup: OnCleanup = (fn: () => void) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, WATCH_CLEANUP_ERROR)
      cleanup = effect.onStop = undefined
    }
  }

  const getter = () => {
    // cleanup before running cb again
    cleanup?.()
    return callWithAsyncErrorHandling(effectFn, WATCH_CALLBACK_ERROR, [onCleanup])
  }

  const scheduler: EffectScheduler = () => {
    if (!((effect as any).flags & EffectFlags.ACTIVE) || !effect.dirty) {
      return
    }
    effect.run()
  }

  // effect
  effect = new ReactiveEffect(getter)
  effect.scheduler = scheduler
  effect.onTrack = options.onTrack
  effect.onTrigger = options.onTrigger

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
  effect.run()

  // stop handle
  return watchHandle
}

/**
 * Runs a function immediately while reactively tracking its dependencies and re-runs it whenever the dependencies are changed.
 *
 * @param effect - The effect function to run.
 * @param options - An optional options object that can be used to adjust the effect's flush timing or to debug the effect's dependencies; the `flush` option is not supported compared to Vue (3.5.0).
 * @see {@link https://vuejs.org/api/reactivity-core.html#watcheffect Vue `watchEffect()`}
 *
 * @example
 * ```js
 * const count = useRef(0)
 * useWatchEffect(() => console.log(count.value))
 * // -> logs 0
 *
 * count.value++
 * // -> logs 1
 * ```
 */
export const useWatchEffect: typeof watchEffect = (effect: any, options?: any) => {
  const [watchHandle] = useReactState(() => watchEffect(effect, options))
  onBeforeUnmount(() => watchHandle.stop())
  return watchHandle
}
