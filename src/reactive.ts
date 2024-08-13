/**
 * @module veact.reactive
 * @author Surmon <https://github.com/surmon-china>
 */

import { useState as useReactState } from 'react'
import { useWatch } from './watch/watch'
import { useForceUpdate } from './_utils'
import { reactive as vReactive, shallowReactive as vShallowReactive } from '@vue/reactivity'
import type { Reactive, ShallowReactive } from '@vue/reactivity'

/**
 * Returns a reactive proxy of the object.
 *
 * The reactive conversion is "deep": it affects all nested properties. A
 * reactive object also deeply unwraps any properties that are refs while
 * maintaining reactivity.
 *
 * @param target - The source object.
 * @see {@link https://vuejs.org/api/reactivity-core.html#reactive Vue `reactive()`}
 *
 * @example
 * ```js
 * const obj = useReactive({ count: 0 })
 * ```
 */
export function useReactive<T extends object>(target: T): Reactive<T>
export function useReactive(target: object) {
  const [value] = useReactState(() => vReactive(target))
  const forceUpdate = useForceUpdate()
  useWatch(value, forceUpdate)
  return value
}

/**
 * Shallow version of {@link useReactive()}.
 *
 * Unlike {@link useReactive()}, there is no deep conversion: only root-level
 * properties are reactive for a shallow reactive object. Property values are
 * stored and exposed as-is - this also means properties with ref values will
 * not be automatically unwrapped.
 *
 * @param target - The source object.
 * @see {@link https://vuejs.org/api/reactivity-advanced.html#shallowreactive Vue `shallowReactive()`}
 *
 * @example
 * ```js
 * const state = useShallowReactive({
 *   foo: 1,
 *   nested: {
 *     bar: 2
 *   }
 * })
 *
 * // mutating state's own properties is reactive
 * state.foo++
 *
 * // ...but does not convert nested objects
 * isReactive(state.nested) // false
 *
 * // NOT reactive
 * state.nested.bar++
 * ```
 */
export function useShallowReactive<T extends object>(target: T): ShallowReactive<T> {
  const [value] = useReactState(() => vShallowReactive(target))
  const forceUpdate = useForceUpdate()
  useWatch(value, forceUpdate)
  return value
}
