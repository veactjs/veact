/**
 * @module veact.reactivity
 * @description redirect all APIs from @vue/reactivity
 * @author Surmon <https://github.com/surmon-china>
 */

export {
  computed,
  customRef,
  effect,
  enableTracking,
  isProxy,
  isReactive,
  isReadonly,
  isRef,
  ITERATE_KEY,
  markRaw,
  pauseTracking,
  reactive,
  readonly,
  ref,
  resetTracking,
  shallowReactive,
  shallowReadonly,
  shallowRef,
  stop,
  toRaw,
  toRef,
  toRefs,
  track,
  trigger,
  triggerRef,
  unref,
  ReactiveEffect,
} from '@vue/reactivity';

export type {
  EffectScheduler,
  DebuggerOptions,
  ComputedGetter,
  ComputedRef,
  ComputedSetter,
  DebuggerEvent,
  DeepReadonly,
  ReactiveEffectOptions,
  Ref,
  RefUnwrapBailTypes,
  UnwrapNestedRefs,
  ToRefs,
  UnwrapRef,
  WritableComputedOptions,
  WritableComputedRef,
} from '@vue/reactivity';
