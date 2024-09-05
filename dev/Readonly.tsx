import React from 'react'
import { reactive, useReadonly, useShallowReadonly } from '../src'
import { useRenderCount } from './utils'

const dataObject = reactive({
  data: 10,
  nested: { data: 1 },
})

export const Component: React.FC = () => {
  const renderCount = useRenderCount()

  const readonlyObject = useReadonly(dataObject)
  const shallowReadonlyObject = useShallowReadonly(dataObject)

  return (
    <div>
      <mark>renderCount: {renderCount}</mark>
      <pre>shallowReadonlyObject = {JSON.stringify(shallowReadonlyObject, null, 2)}</pre>
      {/* @ts-ignore */}
      <button onClick={() => shallowReadonlyObject.data++}>shallowReadonlyObject.data++</button>
      <button onClick={() => shallowReadonlyObject.nested.data++}>shallowReadonlyObject.nested.data++</button>
      <hr />
      <pre>readonlyObject = {JSON.stringify(readonlyObject, null, 2)}</pre>
      {/* @ts-ignore */}
      <button onClick={() => readonlyObject.data++}>readonlyObject.data++</button>
      {/* @ts-ignore */}
      <button onClick={() => readonlyObject.nested.data++}>readonlyObject.nested.data++</button>
    </div>
  )
}
