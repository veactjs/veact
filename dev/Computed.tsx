import React from 'react'
import { useReactive, useComputed } from '../src'
import { useRenderCount } from './utils'

export const Component: React.FC = () => {
  const renderCount = useRenderCount()

  const data = useReactive({
    year: 3,
    count: 4,
  })

  const doubleCount = useComputed({
    get: () => data.count * 2,
    set: (val) => {
      data.count = val / 2
    },
  })

  const total = useComputed(() => {
    return data.count * data.year
  })

  const incrementData = () => {
    data.count += 2
    data.year++
  }

  const setDoubleCount = (value: number) => {
    doubleCount.value = value
  }

  return (
    <div>
      <mark>renderCount: {renderCount}</mark>
      <pre>data = {JSON.stringify(data)}</pre>
      <pre>year * count = {total.value}</pre>
      <pre>doubleCount = {doubleCount.value}</pre>
      <button onClick={incrementData}>increment data</button>
      <button onClick={() => setDoubleCount(10)}>setDoubleCount to 10</button>
    </div>
  )
}
