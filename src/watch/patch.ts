/**
 * @module veact.watch.patch
 * @author Surmon <https://github.com/surmon-china>
 */

import { isRef } from '@vue/reactivity'
import { isArray, isObject, isSet, isMap, isPlainObject } from '../utils'

// fork form: https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/src/errorHandling.ts
export const WATCH_GETTER_ERROR = 'watcher getter'
export const WATCH_CLEANUP_ERROR = 'watcher cleanup function'
export const WATCH_CALLBACK_ERROR = 'watcher callback'

// fork form: https://github.com/vuejs/vue-next/blob/master/packages/reactivity/src/reactive.ts#L16
export const enum ReactiveFlags {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  RAW = '__v_raw',
}

// fork form: https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/src/apiWatch.ts#L401
export const traverse = (value: unknown, seen: Set<unknown> = new Set()) => {
  if (!isObject(value) || seen.has(value) || (value as any)[ReactiveFlags.SKIP]) {
    return value
  }
  seen.add(value)
  if (isRef(value)) {
    traverse(value.value, seen)
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen)
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v: any) => {
      traverse(v, seen)
    })
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse((value as any)[key], seen)
    }
  }
  return value
}
