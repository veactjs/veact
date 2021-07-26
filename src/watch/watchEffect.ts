/**
 * @module veact.watch.watchEffect
 * @author Surmon <https://github.com/surmon-china>
 */

// DOC: https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watcheffect
// fork form: https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/src/apiWatch.ts#L73
import { useState as useReactState } from 'react'
import { DebuggerOptions, ReactiveEffect, EffectScheduler } from '@vue/reactivity'
import { onBeforeUnmount } from '../lifecycle'
import { callWithErrorHandling, callWithAsyncErrorHandling } from '../logger'
import { WATCH_CLEANUP_ERROR, WATCH_CALLBACK_ERROR } from './patch'

export type WatchEffectOptions = DebuggerOptions
export type WatchStopHandle = () => void
export type InvalidateCallbackRegistrator = (callback: () => void) => void
export type WatchEffect = (onInvalidate: InvalidateCallbackRegistrator) => any

/**
 * @example
 * const stopHandle = watchEffect(onInvalidate => {
 *   const token = performAsyncOperation(id.value)
 *   onInvalidate(() => {
 *     // id has changed or watcher is stopped.
 *     // invalidate previously pending async operation
 *     token.cancel()
 *   })
 * })
 */
export function watchEffect(
  effect: WatchEffect,
  options: WatchEffectOptions = {}
): WatchStopHandle {
  let effector: ReactiveEffect<any>
  let cleanup: () => void
  const onInvalidate: InvalidateCallbackRegistrator = (fn: () => void) => {
    cleanup = effector.onStop = () => {
      callWithErrorHandling(fn, WATCH_CLEANUP_ERROR)
    }
  }

  const scheduler: EffectScheduler = () => {
    if (!effector.active) {
      return
    }
    effector.run()
  }

  const getter = () => {
    // cleanup before running cb again
    cleanup?.()
    return callWithAsyncErrorHandling(effect, WATCH_CALLBACK_ERROR, [onInvalidate])
  }

  // effector
  effector = new ReactiveEffect(getter, scheduler)
  effector.onTrack = options.onTrack
  effector.onTrigger = options.onTrigger

  // initial run
  effector.run()

  // stop handle
  return () => effector.stop()
}

export function useWatchEffect(
  effect: WatchEffect,
  options?: WatchEffectOptions
): WatchStopHandle {
  const [stopHandle] = useReactState(() => watchEffect(effect, options))
  onBeforeUnmount(() => stopHandle?.())
  return stopHandle
}
