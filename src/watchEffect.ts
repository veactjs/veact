/**
 * @module veact.watchEffect
 * @author Surmon <https://github.com/surmon-china>
 */

import { useState as useReactState } from 'react'
import { watch as vueWatch } from '@vue/reactivity'
import type { WatchEffect, WatchHandle, DebuggerOptions } from '@vue/reactivity'
import { onBeforeUnmount } from './lifecycle'
import { logger } from './_logger'

// changelog: https://github.com/vuejs/core/blob/main/CHANGELOG.md
// https://github.com/vuejs/core/blob/main/packages/runtime-core/src/apiWatch.ts
// https://github.com/vuejs/core/blob/main/packages/reactivity/src/watch.ts

export type WatchEffectOptions = DebuggerOptions

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
  return vueWatch(effectFn, null, {
    ...options,
    onWarn: logger.warn,
    scheduler: (job) => job(),
  })
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
