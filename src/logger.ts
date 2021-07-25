/**
 * @module veact.logger
 * @author Surmon <https://github.com/surmon-china>
 */

import { isFunction, isPromise } from './utils'

const VEACT_NAME = 'veact'
const LOGGER_PREFIX = `[${VEACT_NAME}]`

export const logger: Console = {
  ...console,
  log(...args: any) {
    console.log(LOGGER_PREFIX, ...args)
  },
  warn(...args: any) {
    console.warn(LOGGER_PREFIX, ...args)
  },
  error(...args: any) {
    console.error(LOGGER_PREFIX, ...args)
  },
}

// fork from: https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/src/errorHandling.ts
export function callWithErrorHandling(
  fn: Function,
  errorString: string,
  args?: unknown[]
) {
  let result
  try {
    result = args ? fn(...args) : fn()
  } catch (error) {
    logger.error(error, errorString)
  }
  return result
}

export function callWithAsyncErrorHandling(
  fn: Function | Function[],
  errorString: string,
  args?: unknown[]
): any[] {
  if (isFunction(fn)) {
    const result = callWithErrorHandling(fn, errorString, args)
    if (result && isPromise(result)) {
      result.catch((error) => {
        logger.error(error, errorString)
      })
    }
    return result
  }

  const values = []
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], errorString, args))
  }
  return values
}
