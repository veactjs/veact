/**
 * @module veact.utils
 * @author Surmon <https://github.com/surmon-china>
 */

import { useReducer } from 'react'

export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never
export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N

export const increment = (s: number) => s + 1
export const useForceUpdate = () => useReducer(increment, 0)[1]
