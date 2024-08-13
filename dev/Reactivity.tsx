import React from 'react'
import { ref, reactive, computed, useReactivity, useComputed } from '../src'
import { useRenderCount } from './utils'

// ref
const pureRef = ref(0)
const fooRef = ref(0)
// reactive
const barReactive = reactive({ bar: 10 })
const doubleBar = computed(() => barReactive.bar * 2)

export const Component: React.FC = () => {
  const renderCount = useRenderCount()

  // to reactivity hook
  const foo = useReactivity(() => fooRef)
  const bar = useReactivity(() => barReactive)
  const doubleFoo = useComputed(() => foo.value * 2)

  return (
    <div>
      <mark>renderCount: {renderCount}</mark>
      <pre>foo.value = {foo.value}</pre>
      <pre>foo * 2 = {doubleFoo.value}</pre>
      <pre>bar = {bar.bar}</pre>
      <pre>bar * 2 = {doubleBar.value}</pre>
      <pre>pure.value = {pureRef.value}</pre>
      <button onClick={() => foo.value++}>increment foo</button>
      <button onClick={() => bar.bar++}>increment bar</button>
      <button onClick={() => pureRef.value++}>increment pure</button>
    </div>
  )
}
