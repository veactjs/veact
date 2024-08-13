import React from 'react'
import { useShallowRef } from '../src'
import { useRenderCount } from './utils'

export const Component: React.FC = () => {
  const renderCount = useRenderCount()

  const refData = useShallowRef({
    data: 10,
  })

  const incrementData = () => {
    refData.value.data++
  }

  const incrementRefValues = () => {
    refData.value = {
      data: refData.value.data + 1,
    }
  }

  return (
    <div>
      <mark>renderCount: {renderCount}</mark>
      <pre>ref.value = {JSON.stringify(refData.value, null, 2)}</pre>
      <button onClick={incrementData}>increment ref.value.data++</button>
      <button onClick={incrementRefValues}>increment ref.value</button>
    </div>
  )
}
