import { FunctionComponent, ReactElement, useMemo } from "react";
import { useComputed } from "../computed";
import React from "react";
import { useOnce } from "../useOnce";

//允许组件直接对外部响应式容器进行反应
//自动缓存dom
/**
 * 对应mobx的observe
 * 全函数监听
 * 让func在另一个组件的上下文中执行
 */
function observe<P>(Func:(p:P)=>ReactElement){
  const t:FunctionComponent<P&React.JSX.IntrinsicAttributes>=(p)=>{

    //todo:设法让执行过程在computed上下文中 同时保持函数上下文不变
    return Func(p);
  }
  return t;
}

// let Comp=observe((p:{
//   aaa:number
// })=>{
//   return <div></div>
// })
// let a=<Comp aaa={1} />



/**
 * 对应mobx的组件
 * 函数中不能调用hook
 */
export function Observer({children}:{
  children:()=>ReactElement
}){
  const v=useComputed(()=>children())
  return v.value;
}
