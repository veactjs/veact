import React from 'react'
import { useShallowReactive } from '../src'
import { useRenderCount } from './utils'

export const Component: React.FC = () => {
  const renderCount = useRenderCount()

  const object = useShallowReactive({
    data: 10,
    nested: { data: 1 },
  })

  const incrementData = () => {
    object.data++
  }

  const incrementNestedData = () => {
    object.nested.data++
  }

  return (
    <div>
      <mark>renderCount: {renderCount}</mark>
      <pre>object = {JSON.stringify(object, null, 2)}</pre>
      <button onClick={incrementData}>increment object.data++</button>
      <button onClick={incrementNestedData}>increment object.nested.data++</button>
    </div>
  )
}
