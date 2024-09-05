/**
 * @module veact.computed
 * @author Surmon <https://github.com/surmon-china>
 */

import { useState as useReactState } from 'react'
import { computed as vueComputed } from '@vue/reactivity'
import type {
  ComputedRef,
  ComputedGetter,
  WritableComputedRef,
  WritableComputedOptions,
  DebuggerOptions,
} from '@vue/reactivity'
import { useWatch } from './watch'
import { useForceUpdate } from './_utils'

/**
 * Takes a getter function and returns a readonly reactive ref object for the
 * returned value from the getter. It can also take an object with get and set
 * functions to create a writable ref object.
 *
 * @param getter - Function that produces the next value.
 * @param debugOptions - For debugging. See {@link https://vuejs.org/guide/extras/reactivity-in-depth.html#computed-debugging Vue Computed Debugging}.
 * @see {@link https://vuejs.org/api/reactivity-core.html#computed Vue `computed()`}
 *
 * @example
 * ```js
 * // Creating a readonly computed ref:
 * const count = useRef(1)
 * const plusOne = useComputed(() => count.value + 1)
 *
 * console.log(plusOne.value) // 2
 * plusOne.value++ // error
 * ```
 *
 * @example
 * ```js
 * // Creating a writable computed ref:
 * const count = useRef(1)
 * const plusOne = useComputed({
 *   get: () => count.value + 1,
 *   set: (val) => {
 *     count.value = val - 1
 *   }
 * })
 *
 * plusOne.value = 1
 * console.log(count.value) // 0
 * ```
 */
export function useComputed<T>(getter: ComputedGetter<T>, debugOptions?: DebuggerOptions): ComputedRef<T>
export function useComputed<T, S = T>(
  options: WritableComputedOptions<T, S>,
  debugOptions?: DebuggerOptions,
): WritableComputedRef<T, S>
export function useComputed(arg1: any, arg2: any) {
  const [value] = useReactState(() => vueComputed(arg1, arg2))
  const forceUpdate = useForceUpdate()
  useWatch(value, forceUpdate)
  return value
}
