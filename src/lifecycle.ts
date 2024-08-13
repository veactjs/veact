/**
 * @module veact.lifecycle
 * @author Surmon <https://github.com/surmon-china>
 */

import { useRef, useEffect } from 'react'

/**
 * The function is called right after the component is mounted.
 *
 * @param fn
 * @see {@link https://react.dev/reference/react/Component#componentdidmount React `componentDidMount()`}
 */
export function onMounted(fn: () => any) {
  useEffect(() => {
    fn()
  }, [])
}

/**
 * The function is called right before the component is unmounted.
 *
 * @param fn
 * @see {@link https://react.dev/reference/react/Component#componentwillunmount React `componentWillUnmount()`}
 */
export function onBeforeUnmount(fn: () => void) {
  useEffect(() => {
    return () => {
      fn()
    }
  }, [])
}

/**
 * The function is called immediately after the component is re-rendered with updated props or state.
 * This method is not invoked during the initial render.
 *
 * @param fn
 * @see {@link https://react.dev/reference/react/Component#componentdidupdate React `componentDidUpdate()`}
 */
export function onUpdated(fn: () => void) {
  const isMounted = useRef(false)
  useEffect(() => {
    if (isMounted.current) {
      fn()
    } else {
      isMounted.current = true
    }
  })
}
