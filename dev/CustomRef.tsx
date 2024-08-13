import React from 'react'
import { useShallowRef, useCustomRef } from '../src'
import { useRenderCount } from './utils'

function useDebouncedRef<T>(initValue: T, delay = 200) {
  const value = useShallowRef(initValue)
  const timeout = useShallowRef<number>()
  return useCustomRef<T>((track, trigger) => {
    return {
      get() {
        track()
        return value.value
      },
      set(newValue) {
        window.clearTimeout(timeout.value)
        timeout.value = window.setTimeout(() => {
          value.value = newValue
          trigger()
        }, delay)
      },
    }
  })
}

export const Component: React.FC = () => {
  const renderCount = useRenderCount()

  const text = useDebouncedRef('hello')
  const setTextValue = (value: string) => {
    text.value = value
  }

  return (
    <div>
      <mark>renderCount: {renderCount}</mark>
      <pre>text: {text.value}</pre>
      <input type="text" defaultValue={text.value} onChange={(event) => setTextValue(event.target.value)} />
      <button onClick={() => setTextValue('')}>clear text</button>
    </div>
  )
}
