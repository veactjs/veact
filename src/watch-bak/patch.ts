/**
 * @module veact.watch.patch
 * @author Surmon <https://github.com/surmon-china>
 */

import { isRef, ReactiveFlags } from '@vue/reactivity'
import { isArray, isObject, isSet, isMap, isFunction, isPromise, isPlainObject } from '../_utils'
import { logger } from '../_logger'

export const NOOP_FN = () => {}

// fork form: https://github.com/vuejs/core/blob/main/packages/runtime-core/src/errorHandling.ts
export const WATCH_GETTER_ERROR = 'watcher getter'
export const WATCH_CLEANUP_ERROR = 'watcher cleanup function'
export const WATCH_CALLBACK_ERROR = 'watcher callback'

// fork from: https://github.com/vuejs/vue-next/blob/main/packages/runtime-core/src/errorHandling.ts
export function callWithErrorHandling(fn: Function, errorString: string, args?: unknown[]) {
  try {
    return args ? fn(...args) : fn()
  } catch (error) {
    logger.error(error, errorString)
  }
}

export function callWithAsyncErrorHandling(
  fn: Function | Function[],
  errorString: string,
  args?: unknown[],
): any {
  if (isFunction(fn)) {
    const result = callWithErrorHandling(fn, errorString, args)
    if (result && isPromise(result)) {
      result.catch((error) => {
        logger.error(error, errorString)
      })
    }
    return result
  }

  if (isArray(fn)) {
    const values = []
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], errorString, args))
    }
    return values
  }
}

// fork form: https://github.com/vuejs/core/blob/main/packages/runtime-core/src/apiWatch.ts#L466
export function traverse(value: unknown, depth: number = Infinity, seen?: Set<unknown>): unknown {
  if (depth <= 0 || !isObject(value) || (value as any)[ReactiveFlags.SKIP]) {
    return value
  }

  seen = seen || new Set()
  if (seen.has(value)) {
    return value
  }
  seen.add(value)
  depth--
  if (isRef(value)) {
    traverse(value.value, depth, seen)
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen)
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v: any) => {
      traverse(v, depth, seen)
    })
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen)
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key as any], depth, seen)
      }
    }
  }
  return value
}
