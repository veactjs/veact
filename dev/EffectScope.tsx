import React from 'react'
import { watch, ref, reactive, useRef, useEffectScope } from '../src'
import { useRenderCount } from './utils'

const fooRef = ref(0)
const barReactive = reactive({ bar: 10 })

export const Component: React.FC = () => {
  const renderCount = useRenderCount()

  const scope = useEffectScope()
  const fooWatchChanged = useRef(0)
  const barWatchChanged = useRef(0)

  const incrementFoo = () => {
    fooRef.value++
  }

  const incrementBar = () => {
    barReactive.bar++
  }

  scope.run(() => {
    watch(fooRef, () => {
      fooWatchChanged.value++
    })
    watch(barReactive, () => {
      barWatchChanged.value++
    })
  })

  return (
    <div>
      <mark>renderCount: {renderCount}</mark>
      <pre>foo.value = {fooRef.value}</pre>
      <pre>bar object = {JSON.stringify(barReactive)}</pre>
      <pre>fooWatchChanged: {fooWatchChanged.value}</pre>
      <pre>barWatchChanged: {barWatchChanged.value}</pre>
      <button onClick={incrementFoo}>increment Foo</button>
      <button onClick={incrementBar}>increment Bar</button>
      <hr />
      <button onClick={() => scope.pause()}>pause Scope</button>
      <button onClick={() => scope.resume()}>resume Scope</button>
      <button onClick={() => scope.stop()}>stop Scope</button>
    </div>
  )
}
