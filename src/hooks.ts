/**
 * @module veact.hooks
 * @author Surmon <https://github.com/surmon-china>
 */

import { useState as useReactState } from 'react';
import { useWatch } from './watch';
import { useForceUpdate } from './utils';
import {
  ref as vRef,
  shallowRef as vShallowRef,
  reactive as vReactive,
  shallowReactive as vShallowReactive,
  computed as vComputed,
  ComputedGetter,
} from './reactivity';

/** ref hook */
export function useRef<T>(initValue: T) {
  const [value] = useReactState(() => vRef(initValue));
  const forceUpdate = useForceUpdate();
  useWatch(value, forceUpdate);
  return value;
}

/** shallowRef hook */
export function useShallowRef<T extends object>(initValue: T) {
  const [value] = useReactState(() => vShallowRef(initValue));
  const forceUpdate = useForceUpdate();
  useWatch(value, forceUpdate);
  return value;
}

/** reactive hook */
export function useReactive<T extends object>(target: T) {
  const [value] = useReactState(() => vReactive(target));
  const forceUpdate = useForceUpdate();
  useWatch(value, forceUpdate);
  return value;
}

/** shallowReactive hook */
export function useShallowReactive<T extends object>(target: T) {
  const [value] = useReactState(() => vShallowReactive(target));
  const forceUpdate = useForceUpdate();
  useWatch(value, forceUpdate);
  return value;
}

/** computed hook */
export function useComputed<T>(getter: ComputedGetter<T>) {
  const [value] = useReactState(() => vComputed(getter));
  const forceUpdate = useForceUpdate();
  useWatch(value, forceUpdate);
  return value;
}

/** any data to reactivity */
type ReactivityHookFn<T> = () => T;
export function useReactivity<T = any>(getter: ReactivityHookFn<T>) {
  const forceUpdate = useForceUpdate();
  // deep > watch > traverse(getter()) > ref | array | set | map | plain object(reactive) > forch update
  useWatch(() => getter(), forceUpdate, { deep: true });
  return getter();
}
