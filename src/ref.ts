/**
 * @module veact.ref
 * @author Surmon <https://github.com/surmon-china>
 */

import { useState as useReactState } from 'react'
import { ref as vueRef, shallowRef as vueShallowRef, customRef as vueCustomRef } from '@vue/reactivity'
import type { Ref, UnwrapRef, ShallowRef, CustomRefFactory } from '@vue/reactivity'
import { useForceUpdate, IfAny } from './_utils'
import { useWatch } from './watch'

/**
 * Takes an inner value and returns a reactive and mutable ref object, which
 * has a single property `.value` that points to the inner value.
 *
 * @param value - The object to wrap in the ref.
 * @see {@link https://vuejs.org/api/reactivity-core.html#ref Vue `ref()`}
 *
 * @example
 * ```js
 * const count = useRef(0)
 * console.log(count.value) // 0
 *
 * count.value = 1
 * console.log(count.value) // 1
 * ```
 */
export function useRef<T>(
  value: T,
): [T] extends [Ref] ? IfAny<T, Ref<T>, T> : Ref<UnwrapRef<T>, UnwrapRef<T> | T>
export function useRef<T = any>(): Ref<T | undefined>
export function useRef(initValue?: unknown) {
  const [refObject] = useReactState(() => vueRef(initValue))
  const forceUpdate = useForceUpdate()
  useWatch(refObject, forceUpdate, { deep: true })
  return refObject as unknown as any
}

/**
 * Shallow version of {@link useRef()}.
 *
 * @param value - The "inner value" for the shallow ref.
 * @see {@link https://vuejs.org/api/reactivity-advanced.html#shallowref Vue `shallowRef()`}
 *
 * @example
 * ```js
 * const state = useShallowRef({ count: 1 })
 * // does NOT trigger change
 * state.value.count = 2
 * // does trigger change
 * state.value = { count: 2 }
 * ```
 */
export function useShallowRef<T>(
  value: T,
): Ref extends T ? (T extends Ref ? IfAny<T, ShallowRef<T>, T> : ShallowRef<T>) : ShallowRef<T>
export function useShallowRef<T = any>(): ShallowRef<T | undefined>
export function useShallowRef(initValue?: unknown) {
  const [shallowRefObject] = useReactState(() => vueShallowRef(initValue))
  const forceUpdate = useForceUpdate()
  useWatch(shallowRefObject, forceUpdate)
  return shallowRefObject
}

/**
 * Creates a customized ref with explicit control over its dependency tracking
 * and updates triggering.
 *
 * @param factory - The function that receives the `track` and `trigger` callbacks.
 * @see {@link https://vuejs.org/api/reactivity-advanced.html#customref Vue `customRef()`}
 */
export function useCustomRef<T>(factory: CustomRefFactory<T>): Ref<T> {
  const [customRefObject] = useReactState(() => vueCustomRef(factory))
  const forceUpdate = useForceUpdate()
  useWatch(customRefObject, forceUpdate)
  return customRefObject
}
