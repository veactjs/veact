/**
 * @module veact.hooks
 * @author Surmon <https://github.com/surmon-china>
 */

import { useState as useReactState } from 'react'
import { useWatch } from './watch'
import { useForceUpdate } from './utils'
import type { ToRef } from './reactivity'
import {
  ref as vRef,
  shallowRef as vShallowRef,
  reactive as vReactive,
  shallowReactive as vShallowReactive,
  computed as vComputed,
  ComputedGetter,
  Ref,
  UnwrapRef,
  UnwrapNestedRefs,
  DebuggerOptions,
  ComputedRef,
  WritableComputedOptions,
  WritableComputedRef,
} from '@vue/reactivity'

/** ref hook */
export function useRef<T extends object>(value: T): ToRef<T>
export function useRef<T>(value: T): Ref<UnwrapRef<T>>
export function useRef<T = any>(initValue?: T): Ref<T | undefined> {
  const [value] = useReactState(() => vRef(initValue))
  const forceUpdate = useForceUpdate()
  useWatch(value, forceUpdate)
  return value as unknown as any
}

/** shallowRef hook */
export function useShallowRef<T extends object>(value: T): T extends Ref ? T : Ref<T>
export function useShallowRef<T>(value: T): Ref<T>
export function useShallowRef<T = any>(initValue: T): Ref<T | undefined> {
  const [value] = useReactState(() => vShallowRef(initValue))
  const forceUpdate = useForceUpdate()
  useWatch(value, forceUpdate)
  return value
}

/** reactive hook */
export function useReactive<T extends object>(target: T): UnwrapNestedRefs<T> {
  const [value] = useReactState(() => vReactive(target))
  const forceUpdate = useForceUpdate()
  useWatch(value, forceUpdate)
  return value
}

/** shallowReactive hook */
export function useShallowReactive<T extends object>(target: T): T {
  const [value] = useReactState(() => vShallowReactive(target))
  const forceUpdate = useForceUpdate()
  useWatch(value, forceUpdate)
  return value
}

/** computed hook */
export function useComputed<T>(
  options: WritableComputedOptions<T>,
  debugOptions?: DebuggerOptions
): WritableComputedRef<T>
export function useComputed<T>(
  getter: ComputedGetter<T>,
  debugOptions?: DebuggerOptions
): ComputedRef<T>
export function useComputed(arg1: any, arg2: any) {
  const [value] = useReactState(() => vComputed(arg1, arg2))
  const forceUpdate = useForceUpdate()
  useWatch(value, forceUpdate)
  return value
}

/** any data to reactivity */
export function useReactivity<T = any>(getter: () => T): T {
  const forceUpdate = useForceUpdate()
  // deep > watch > traverse(getter()) > ref | array | set | map | plain object(reactive) > force update
  useWatch(() => getter(), forceUpdate, { deep: true })
  return getter()
}
