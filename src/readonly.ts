/**
 * @module veact.readonly
 * @author Surmon <https://github.com/surmon-china>
 */

import { useState as useReactState } from 'react'
import { useWatch } from './watch'
import { useForceUpdate } from './_utils'
import { readonly as vReadonly, shallowReadonly as vShallowReadonly } from '@vue/reactivity'
import type { DeepReadonly, UnwrapNestedRefs } from '@vue/reactivity'

/**
 * Takes an object (reactive or plain) or a ref and returns a readonly proxy to
 * the original.
 *
 * A readonly proxy is deep: any nested property accessed will be readonly as
 * well. It also has the same ref-unwrapping behavior as {@link useReactive()},
 * except the unwrapped values will also be made readonly.
 *
 * @param target - The source object.
 * @see {@link https://vuejs.org/api/reactivity-core.html#readonly Vue `readonly()`}
 *
 * @example
 * ```js
 * const original = useReactive({ count: 0 })
 * const copy = useReadonly(original)
 *
 * useWatchEffect(() => {
 *   // works for reactivity tracking
 *   console.log(copy.count)
 * })
 *
 * // mutating original will trigger watchers relying on the copy
 * original.count++
 *
 * // mutating the copy will fail and result in a warning
 * copy.count++ // warning!
 * ```
 */
export function useReadonly<T extends object>(target: T): DeepReadonly<UnwrapNestedRefs<T>> {
  const [value] = useReactState(() => vReadonly(target))
  const forceUpdate = useForceUpdate()
  useWatch(value, forceUpdate)
  return value
}

// https://vuejs.org/api/reactivity-advanced.html#shallowreadonly
// useShallowReadonly

/**
 * Shallow version of {@link useReadonly()}.
 *
 * Unlike {@link useReadonly()}, there is no deep conversion: only root-level
 * properties are made readonly. Property values are stored and exposed as-is -
 * this also means properties with ref values will not be automatically
 * unwrapped.
 *
 * @param target - The source object.
 * @see {@link https://vuejs.org/api/reactivity-advanced.html#shallowreadonly Vue `shallowReadonly()`}
 *
 * @example
 * ```js
 * const state = useShallowReadonly({
 *   foo: 1,
 *   nested: {
 *     bar: 2
 *   }
 * })
 *
 * // mutating state's own properties will fail
 * state.foo++
 *
 * // ...but works on nested objects
 * isReadonly(state.nested) // false
 *
 * // works
 * state.nested.bar++
 * ```
 */
export function useShallowReadonly<T extends object>(target: T): Readonly<T> {
  const [value] = useReactState(() => vShallowReadonly(target))
  const forceUpdate = useForceUpdate()
  useWatch(value, forceUpdate)
  return value
}
