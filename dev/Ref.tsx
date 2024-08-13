import React from 'react'
import { useRef } from '../src'
import { useRenderCount } from './utils'

export const Component: React.FC = () => {
  const renderCount = useRenderCount()

  const refData = useRef({
    data: 10,
    nested: { data: 1 },
  })

  const incrementData = () => {
    refData.value.data++
  }

  const incrementNestedData = () => {
    refData.value.nested.data++
  }

  const incrementRefValues = () => {
    refData.value = {
      data: refData.value.data + 1,
      nested: {
        data: refData.value.nested.data + 1,
      },
    }
  }

  return (
    <div>
      <mark>renderCount: {renderCount}</mark>
      <pre>ref.value = {JSON.stringify(refData.value, null, 2)}</pre>
      <button onClick={incrementData}>increment ref.value.data</button>
      <button onClick={incrementNestedData}>increment ref.value.nested.data</button>
      <button onClick={incrementRefValues}>increment ref.value</button>
    </div>
  )
}
