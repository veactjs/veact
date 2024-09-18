
/**
 * @module veact.watch
 * @author Surmon <https://github.com/surmon-china>
 */

import { useCallback, useEffect, useState as useReactState, useRef } from 'react'
import { watch as vueWatch } from '@vue/reactivity'
import type {
  ReactiveMarker,
  DebuggerOptions,
  WatchCallback,
  WatchSource,
  WatchHandle,
} from '@vue/reactivity'
import { onBeforeUnmount, onMounted } from './lifecycle'
import { logger } from './_logger'

// changelog: https://github.com/vuejs/core/blob/main/CHANGELOG.md
// https://github.com/vuejs/core/blob/main/packages/runtime-core/src/apiWatch.ts
// https://github.com/vuejs/core/blob/main/packages/reactivity/src/watch.ts

export interface WatchOptions<Immediate = boolean> extends DebuggerOptions {
  immediate?: Immediate
  deep?: boolean | number
  once?: boolean
  // The `flush` option is not supported in veact at the moment.
  // flush?: 'pre' | 'post' | 'sync'
}

export type MultiWatchSources = (WatchSource<unknown> | object)[]

type MaybeUndefined<T, I> = I extends true ? T | undefined : T
type MapSources<T, Immediate> = {
  [K in keyof T]: T[K] extends WatchSource<infer V>
  ? MaybeUndefined<V, Immediate>
  : T[K] extends object
  ? MaybeUndefined<T[K], Immediate>
  : never
}

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

// overload: single source + cb
export function watch<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  callback: WatchCallback<T, MaybeUndefined<T, Immediate>>,
  options?: WatchOptions<Immediate>,
): WatchHandle

// overload: reactive array or tuple of multiple sources + cb
export function watch<T extends Readonly<MultiWatchSources>, Immediate extends Readonly<boolean> = false>(
  sources: readonly [...T] | T,
  callback: [T] extends [ReactiveMarker]
    ? WatchCallback<T, MaybeUndefined<T, Immediate>>
    : WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
  options?: WatchOptions<Immediate>,
): WatchHandle

// overload: array of multiple sources + cb
export function watch<T extends MultiWatchSources, Immediate extends Readonly<boolean> = false>(
  sources: [...T],
  callback: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
  options?: WatchOptions<Immediate>,
): WatchHandle

// overload: watching reactive object w/ cb
export function watch<T extends object, Immediate extends Readonly<boolean> = false>(
  source: T,
  callback: WatchCallback<T, MaybeUndefined<T, Immediate>>,
  options?: WatchOptions<Immediate>,
): WatchHandle

// implementation
export function watch<T = any, Immediate extends Readonly<boolean> = false>(
  source: T | WatchSource<T>,
  callback: WatchCallback<T>,
  options: WatchOptions<Immediate> = {},
): WatchHandle {
  return vueWatch(source as any, callback, {
    ...options,
    onWarn: logger.warn,
    scheduler: (job) => job(),
  })
}
/**
 * 保证函数只执行一次 后每次返回同样的结果
 * @param func 执行一次并返回结果的函数
 * @returns
 */
export function useOnce<T>(func:()=>T){
  const first=useRef(true)
  const data=useRef<any>(undefined)
  if(first.current){
      first.current=false;
      data.current=func();
  }
  return data.current as T;
}

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
export const useWatch = (source: any, callback: any, options = {}) => {
  const watcher = useRef<WatchHandle>()
  //执行watch
  const cancelWatch = useCallback(() => {
    if (watcher.current) {
      watcher.current();
      watcher.current = undefined;
    }
  }, [])
  const doWatch = useCallback(() => {
    if (watcher.current) cancelWatch();

    watcher.current = watch(source as any, () => {
      console.log("触发更新")
      callback()
    }, options)

  }, [])
  onMounted(() => {
    console.log("执行监听")
    doWatch();
  })
  onBeforeUnmount(() => {
    console.log("取消监听")
    cancelWatch();
  })
  useOnce(()=>{
    console.log("初始监听")
    doWatch();
  })

  return watcher;
}
