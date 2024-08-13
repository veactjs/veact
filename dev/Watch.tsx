import React from 'react'
import { useRef, useReactive, useWatch, useWatchEffect, toRefs } from '../src'
import { useRenderCount } from './utils'

export const Component: React.FC = () => {
  const renderCount = useRenderCount()

  const dataWatchChanged = useRef(0)
  const countWatchChanged = useRef(0)
  const deep2WatchChanged = useRef(0)
  const deep4WatchChanged = useRef(0)
  const immediateWatchChanged = useRef(0)
  const onceWatchChanged = useRef(0)
  const watchEffectChanged = useRef(0)

  const data = useReactive({
    count: 0,
    level1: {
      level2: {
        level3: {
          level4: 100,
        },
      },
    },
  })

  const incrementCount = () => {
    data.count++
  }

  const incrementLevel4 = () => {
    data.level1.level2.level3.level4++
  }

  useWatch(data, () => {
    dataWatchChanged.value++
  })

  useWatch(
    () => data.count,
    () => countWatchChanged.value++,
  )

  useWatch(data, () => deep2WatchChanged.value++, { deep: 2 })
  useWatch(data, () => deep4WatchChanged.value++, { deep: 4 })
  useWatch(data, () => immediateWatchChanged.value++, { immediate: true })
  useWatch(data, () => onceWatchChanged.value++, { once: true })

  useWatchEffect(() => {
    console.debug(toRefs(data))
    watchEffectChanged.value++
  })

  return (
    <div>
      <mark>renderCount: {renderCount}</mark>
      <pre>data = {JSON.stringify(data, null, 2)}</pre>
      <p>dataWatchChanged: {dataWatchChanged.value}</p>
      <p>countWatchChanged: {countWatchChanged.value}</p>
      <p>deep2WatchChanged: {deep2WatchChanged.value}</p>
      <p>deep4WatchChanged: {deep4WatchChanged.value}</p>
      <p>immediateWatchChanged: {immediateWatchChanged.value}</p>
      <p>onceWatchChanged: {onceWatchChanged.value}</p>
      <p>watchEffectChanged: {watchEffectChanged.value}</p>
      <button onClick={incrementCount}>increment count</button>
      <button onClick={incrementLevel4}>increment level4</button>
    </div>
  )
}
