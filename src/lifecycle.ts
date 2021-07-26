/**
 * @module veact.lifecycle
 * @author Surmon <https://github.com/surmon-china>
 */

import { useRef, useEffect } from 'react'

export function onMounted(callback: () => any) {
  useEffect(() => {
    callback()
  }, [])
}

export function onUpdated(callback: () => void) {
  const isMounted = useRef(false)
  useEffect(() => {
    if (isMounted.current) {
      callback()
    } else {
      isMounted.current = true
    }
  })
}

export function onBeforeUnmount(callback: () => void) {
  useEffect(() => {
    return () => {
      callback()
    }
  }, [])
}
