import { useRef } from "react";

/**
 * 保证函数只执行一次 后每次返回同样的结果
 * @param func 执行一次并返回结果的函数
 * @returns
 */
export function useOnce<T>(func: () => T) {
  const first = useRef(true);
  const data = useRef<any>(undefined);
  if (first.current) {
    first.current = false;
    data.current = func();
  }
  return data.current as T;
}
