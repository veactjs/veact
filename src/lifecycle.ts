/**
 * @module veact.lifecycle
 * @author Surmon <https://github.com/surmon-china>
 */

import { useEffect } from 'react'

export function onMounted(callback: () => any) {
  useEffect(() => {
    callback()
  }, [])
}

export function onBeforeUnmount(callback: () => void) {
  useEffect(() => {
    return () => {
      callback()
    }
  }, [])
}

export function onUpdated(callback: () => void) {
  useEffect(() => {
    callback()
  })
}
