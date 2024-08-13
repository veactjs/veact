/**
 * @module veact.utils
 * @author Surmon <https://github.com/surmon-china>
 */

import { useReducer } from 'react'

export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never
export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N

export const increment = (s: number) => s + 1
export const useForceUpdate = () => useReducer(increment, 0)[1]

// compare whether a value has changed, accounting for NaN.
export const hasChanged = (value: any, oldValue: any): boolean => {
  return value !== oldValue && (value === value || oldValue === oldValue)
}

export const isArray = Array.isArray
export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string => {
  return objectToString.call(value)
}
export const isMap = (value: unknown): value is Map<any, any> => {
  return toTypeString(value) === '[object Map]'
}
export const isSet = (value: unknown): value is Set<any> => {
  return toTypeString(value) === '[object Set]'
}
export const isDate = (value: unknown): value is Date => {
  return value instanceof Date
}
export const isFunction = (value: unknown): value is (...args: any[]) => any => {
  return typeof value === 'function'
}
export const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}
export const isSymbol = (value: unknown): value is symbol => {
  return typeof value === 'symbol'
}
export const isObject = (value: unknown): value is Record<any, any> => {
  return value !== null && typeof value === 'object'
}
export const isPlainObject = (value: unknown): value is object => {
  return toTypeString(value) === '[object Object]'
}
export const isPromise = <T = any>(value: unknown): value is Promise<T> => {
  return isObject(value) && isFunction(value.then) && isFunction(value.catch)
}

export const removeArrayItem = <T>(array: T[], element: T) => {
  const i = array.indexOf(element)
  if (i > -1) {
    array.splice(i, 1)
  }
}
