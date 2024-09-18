import { ReactElement } from "react";
import { useOnce } from "../useOnce";
import { isReactive, isRef, reactive } from "@vue/reactivity";
import React from "react";
import { useReactivity, useReactivityObject } from "../reactivity";
import { mapValues } from "lodash";

export interface ISetupComponent<P, T> {
  setup(p: P): T;
  render(ctx: T): ReactElement;
}

export function SetupComponentRenderer(p: {
  target: ISetupComponent<any, any>;
  props: any;
}) {
  const store = useOnce(() => {
    let t = p.target.setup(p.props);
    return t;
  });
  const tt=useReactivityObject(store)
  // let t = mapValues(store, (v, k) => {
  //   if (isRef(v) || isReactive(v)) {
  //     return useReactivity(() => v);
  //   } else return v;
  // });
  const RenderComp = p.target.render;
  return <RenderComp {...tt} />;
}

/**
 * 定义一个veact组件
 * @param v 类似vue的定义对象
 * @returns
 */
export function defineSetupComponent<P, T>(v: ISetupComponent<P, T>) {
  return (props: P) => {
    return <SetupComponentRenderer target={v} props={props} />;
  };
}
