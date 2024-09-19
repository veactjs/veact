import { watch as baseWatch } from '@vue/reactivity';
import { ComputedGetter } from '@vue/reactivity';
import { ComputedRef } from '@vue/reactivity';
import { CustomRefFactory } from '@vue/reactivity';
import { DebuggerOptions } from '@vue/reactivity';
import { DeepReadonly } from '@vue/reactivity';
import { default as default_2 } from 'react';
import { EffectScope } from '@vue/reactivity';
import { effectScope } from '@vue/reactivity';
import { MutableRefObject } from 'react';
import { ReactElement } from 'react';
import { Reactive } from '@vue/reactivity';
import { ReactiveMarker } from '@vue/reactivity';
import { Ref } from '@vue/reactivity';
import { ShallowReactive } from '@vue/reactivity';
import { ShallowRef } from '@vue/reactivity';
import { UnwrapNestedRefs } from '@vue/reactivity';
import { UnwrapRef } from '@vue/reactivity';
import { WatchCallback } from '@vue/reactivity';
import { WatchEffect } from '@vue/reactivity';
import { WatchHandle } from '@vue/reactivity';
import { WatchSource } from '@vue/reactivity';
import { WritableComputedOptions } from '@vue/reactivity';
import { WritableComputedRef } from '@vue/reactivity';

/**
 * @module veact.utils
 * @author Surmon <https://github.com/surmon-china>
 */
declare type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

export { baseWatch }

/**
 * 定义一个veact组件
 * @param v 类似vue的定义对象
 * @returns
 */
export declare function defineSetupComponent<P, T>(v: ISetupComponent<P, T>): (props: P) => default_2.JSX.Element;

declare type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;

export declare interface ISetupComponent<P, T> {
    setup(p: P): T;
    render(ctx: T): ReactElement;
}

declare type MapSources<T, Immediate> = {
    [K in keyof T]: T[K] extends WatchSource<infer V> ? MaybeUndefined<V, Immediate> : T[K] extends object ? MaybeUndefined<T[K], Immediate> : never;
};

declare type MaybeUndefined<T, I> = I extends true ? T | undefined : T;

export declare type MultiWatchSources = (WatchSource<unknown> | object)[];

/**
 * 对应mobx的组件
 * 函数中不能调用hook
 */
export declare function Observer({ children }: {
    children: () => ReactElement;
}): ReactElement<any, string | default_2.JSXElementConstructor<any>>;

/**
 * The function is called right before the component is unmounted.
 *
 * @param fn
 * @see {@link https://react.dev/reference/react/Component#componentwillunmount React `componentWillUnmount()`}
 */
export declare function onBeforeUnmount(fn: () => void): void;

/**
 * @module veact.lifecycle
 * @author Surmon <https://github.com/surmon-china>
 */
/**
 * The function is called right after the component is mounted.
 *
 * @param fn
 * @see {@link https://react.dev/reference/react/Component#componentdidmount React `componentDidMount()`}
 */
export declare function onMounted(fn: () => any): void;

/**
 * The function is called immediately after the component is re-rendered with updated props or state.
 * This method is not invoked during the initial render.
 *
 * @param fn
 * @see {@link https://react.dev/reference/react/Component#componentdidupdate React `componentDidUpdate()`}
 */
export declare function onUpdated(fn: () => void): void;

export declare function SetupComponentRenderer(p: {
    target: ISetupComponent<any, any>;
    props: any;
}): default_2.JSX.Element;

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
export declare function useComputed<T>(getter: ComputedGetter<T>, debugOptions?: DebuggerOptions): ComputedRef<T>;

export declare function useComputed<T, S = T>(options: WritableComputedOptions<T, S>, debugOptions?: DebuggerOptions): WritableComputedRef<T, S>;

/**
 * Creates a customized ref with explicit control over its dependency tracking
 * and updates triggering.
 *
 * @param factory - The function that receives the `track` and `trigger` callbacks.
 * @see {@link https://vuejs.org/api/reactivity-advanced.html#customref Vue `customRef()`}
 */
export declare function useCustomRef<T>(factory: CustomRefFactory<T>): Ref<T>;

/**
 * Creates an effect scope object which can capture the reactive effects (i.e.
 * computed and watchers) created within it so that these effects can be
 * disposed together. For detailed use cases of this API, please consult its
 * corresponding {@link https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md | RFC}.
 *
 * @param detached - Can be used to create a "detached" effect scope.
 * @see {@link https://vuejs.org/api/reactivity-advanced.html#effectscope Vue `effectScope()`}
 */
export declare function useEffectScope(...args: ArgumentTypes<typeof effectScope>): EffectScope;

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
export declare function useReactive<T extends object>(target: T): Reactive<T>;

/**
 * @module veact.reactivity
 * @author Surmon <https://github.com/surmon-china>
 */
/**
 * Converts some of the 'raw Vue' data, which is not already wrapped in a hook,
 * into reactive hook data to ensure proper reactivity within the component.
 *
 * @param getter - A function that returns the data to be deeply watched.
 * @example
 * ```tsx
 * import React from 'react'
 * import { ref, useReactivity } from 'veact'
 *
 * const countRef = ref(0)
 *
 * export const Component: React.FC = () => {
 *   // Convert to a reactivity hook
 *   const count = useReactivity(() => countRef)
 *   const increment = () => {
 *     count.value++
 *   }
 *
 *   return (
 *     <div>
 *       <span>{count.value}</span>
 *       <button onClick={increment}>Increment</button>
 *     </div>
 *   )
 * }
 * ```
 */
export declare function useReactivity<T = any>(getter: () => T): T;

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
export declare function useReadonly<T extends object>(target: T): DeepReadonly<UnwrapNestedRefs<T>>;

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
export declare function useRef<T>(value: T): [T] extends [Ref] ? IfAny<T, Ref<T>, T> : Ref<UnwrapRef<T>, UnwrapRef<T> | T>;

export declare function useRef<T = any>(): Ref<T | undefined>;

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
export declare function useShallowReactive<T extends object>(target: T): ShallowReactive<T>;

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
export declare function useShallowReadonly<T extends object>(target: T): Readonly<T>;

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
export declare function useShallowRef<T>(value: T): Ref extends T ? (T extends Ref ? IfAny<T, ShallowRef<T>, T> : ShallowRef<T>) : ShallowRef<T>;

export declare function useShallowRef<T = any>(): ShallowRef<T | undefined>;

export declare const useWatch: (InstanceType<typeof WatchHelper<MutableRefObject<WatchHandle | undefined>>>)["watch"];

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
export declare const useWatchEffect: typeof watchEffect;

export declare const watch: {
    <T, Immediate extends Readonly<boolean> = false>(source: WatchSource<T>, callback: WatchCallback<T, Immediate extends true ? T | undefined : T>, options?: WatchOptions<Immediate> | undefined): WatchHandle;
    <T extends Readonly<MultiWatchSources>, Immediate extends Readonly<boolean> = false>(sources: T | readonly [...T], callback: [T] extends [ReactiveMarker] ? WatchCallback<T, Immediate extends true ? T | undefined : T> : WatchCallback<    { [K in keyof T]: T[K] extends WatchSource<infer V> ? V : T[K] extends object ? T[K] : never; }, { [K_1 in keyof T]: T[K_1] extends WatchSource<infer V> ? Immediate extends true ? V | undefined : V : T[K_1] extends object ? Immediate extends true ? T[K_1] | undefined : T[K_1] : never; }>, options?: WatchOptions<Immediate> | undefined): WatchHandle;
    <T extends MultiWatchSources, Immediate extends Readonly<boolean> = false>(sources: [...T], callback: WatchCallback<    { [K in keyof T]: T[K] extends WatchSource<infer V> ? V : T[K] extends object ? T[K] : never; }, { [K_1 in keyof T]: T[K_1] extends WatchSource<infer V> ? Immediate extends true ? V | undefined : V : T[K_1] extends object ? Immediate extends true ? T[K_1] | undefined : T[K_1] : never; }>, options?: WatchOptions<Immediate> | undefined): WatchHandle;
    <T extends object, Immediate extends Readonly<boolean> = false>(source: T, callback: WatchCallback<T, Immediate extends true ? T | undefined : T>, options?: WatchOptions<Immediate> | undefined): WatchHandle;
};

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
export declare function watchEffect(effectFn: WatchEffect, options?: WatchEffectOptions): WatchHandle;

export declare type WatchEffectOptions = DebuggerOptions;

/**
 * Watches one or more reactive data sources and invokes a callback function when the sources change.
 *
 * @param source - The watcher's source.
 * @param callback - This function will be called when the source is changed.
 * @param options - An optional options object that does not support the `flush` option compared to Vue (3.5.0).
 * @see {@link https://vuejs.org/api/reactivity-core.html#watch Vue `watch()`}
 *
 * @example
 * ```js
 * const count = useRef(0)
 * useWatch(count, (count, prevCount) => {
 *  // ...
 * })
 * ```
 */
export declare const watcherInstance: WatchHelper<WatchHandle>;

/**
 * Watches one or more reactive data sources and invokes a callback function when the sources change.
 *
 * @param source - The watcher's source.
 * @param callback - This function will be called when the source is changed.
 * @param options - An optional options object that does not support the `flush` option compared to Vue (3.5.0).
 * @see {@link https://vuejs.org/api/reactivity-core.html#watch Vue `watch()`}
 *
 * @example
 * ```js
 * const count = ref(0)
 * watch(count, (count, prevCount) => {
 *  // ...
 * })
 * ```
 */
declare class WatchHelper<R = WatchHandle> {
    watch<T, Immediate extends Readonly<boolean> = false>(source: WatchSource<T>, callback: WatchCallback<T, MaybeUndefined<T, Immediate>>, options?: WatchOptions<Immediate>): R;
    watch<T extends Readonly<MultiWatchSources>, Immediate extends Readonly<boolean> = false>(sources: readonly [...T] | T, callback: [T] extends [ReactiveMarker] ? WatchCallback<T, MaybeUndefined<T, Immediate>> : WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>, options?: WatchOptions<Immediate>): R;
    watch<T extends MultiWatchSources, Immediate extends Readonly<boolean> = false>(sources: [...T], callback: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>, options?: WatchOptions<Immediate>): R;
    watch<T extends object, Immediate extends Readonly<boolean> = false>(source: T, callback: WatchCallback<T, MaybeUndefined<T, Immediate>>, options?: WatchOptions<Immediate>): R;
}

export declare interface WatchOptions<Immediate = boolean> extends DebuggerOptions {
    immediate?: Immediate;
    deep?: boolean | number;
    once?: boolean;
}


export * from "@vue/reactivity";

export { }
