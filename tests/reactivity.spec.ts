import { test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ref, reactive, isRef, isReactive, onUpdated, useReactivity } from '../src'

test('<useReactivity> ', () => {
  let renderCount = 0
  const refCount = ref(0)
  const reactiveCount = reactive({ count: 10 })
  const { result } = renderHook(() => {
    onUpdated(() => renderCount++)
    return useReactivity(() => ({
      ref_: refCount,
      reactive_: reactiveCount,
    }))
  })

  expect(isRef(result.current.ref_)).toBeTruthy()
  expect(isReactive(result.current.reactive_)).toBeTruthy()
  expect(result.current.ref_).toBe(refCount)
  expect(result.current.reactive_).toBe(reactiveCount)
  expect(result.current.ref_.value).toBe(0)

  act(() => refCount.value++)
  expect(result.current.ref_.value).toBe(1)
  expect(renderCount).toBe(1)

  act(() => reactiveCount.count++)
  expect(result.current.reactive_.count).toBe(11)
  expect(renderCount).toBe(2)

  act(() => result.current.reactive_.count++)
  expect(reactiveCount.count).toBe(12)
  expect(renderCount).toBe(3)
})
