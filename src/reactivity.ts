/**
 * @module veact.reactivity
 * @author Surmon <https://github.com/surmon-china>
 */

import { useWatch } from './watch'
import { useForceUpdate } from './_utils'
import { useCallback, useMemo } from 'react'
import { mapValues } from 'lodash'
import { list } from 'ts-pystyle'
import { isReactive, isRef } from '@vue/reactivity'

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
export function useReactivity<T = any>(getter: () => T): T {
  const forceUpdate = useForceUpdate()
  // deep > watch > traverse(getter()) > ref | array | set | map | plain object(reactive) > force update
  useWatch(() => getter(), forceUpdate, { deep: true })
  return getter()
}

function objToArr(obj:any){
  function *inner(){
    for(let  k in obj){
      yield obj[k]
    }
  }
  return list(inner());
}
/**
 * 执行对象内监听 过滤非ref reactive
 * 针对构造setupComponent支持
 * @param getter
 * @returns
 */
export function useReactivityObject<T extends object=any>(getter: () => T): T {
  const forceUpdate = useForceUpdate()
  // deep > watch > traverse(getter()) > ref | array | set | map | plain object(reactive) > force update
  const f=useCallback(()=>{
    const t=getter();
    const ar=objToArr(t).filter(v=>isRef(v)||isReactive(v))
    return ar;
  },[getter])
  const v=useMemo(()=>f(),[f])
  useWatch(() => v, forceUpdate, { deep: true })
  return getter()
}
