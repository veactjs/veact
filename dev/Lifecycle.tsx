import React from 'react'
import { onMounted, onBeforeUnmount, onUpdated } from '../src'
import { useRenderCount } from './utils'

export interface ComponentProps {
  onNewLog(log: string): void
}

export const Component: React.FC<ComponentProps> = (props) => {
  const renderCount = useRenderCount()

  onMounted(() => {
    props.onNewLog('Lifecycle component mounted')
  })

  onUpdated(() => {
    // props.onNewLog('component updated')
  })

  onBeforeUnmount(() => {
    props.onNewLog('Lifecycle component will unmount')
  })

  return (
    <div>
      <h4>Lifecycle component</h4>
      <mark>renderCount: {renderCount}</mark>
    </div>
  )
}
