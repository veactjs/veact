import { test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { isRef, onUpdated, useRef, useComputed } from '../src'

test('<useComputed> readonly', () => {
  let renderCount = 0
  const { result } = renderHook(() => {
    onUpdated(() => renderCount++)
    const count = useRef(3)
    const doubled = useComputed(() => count.value * 2)
    return { count, doubled }
  })

  expect(isRef(result.current.count)).toBeTruthy()
  expect(isRef(result.current.doubled)).toBeTruthy()
  expect(result.current.doubled.value).toBe(6)
  expect(renderCount).toBe(0)

  act(() => result.current.count.value++)
  expect(result.current.count.value).toBe(4)
  expect(result.current.doubled.value).toBe(8)
  expect(renderCount).toBe(1)
})

test('<useComputed> writable', () => {
  let renderCount = 0
  const { result } = renderHook(() => {
    onUpdated(() => renderCount++)
    const count = useRef(3)
    const doubled = useComputed<number>({
      set(value) {
        count.value = value / 2
      },
      get() {
        return count.value * 2
      },
    })
    return { count, doubled }
  })

  expect(isRef(result.current.count)).toBeTruthy()
  expect(isRef(result.current.doubled)).toBeTruthy()
  expect(result.current.doubled.value).toBe(6)
  expect(renderCount).toBe(0)

  act(() => result.current.count.value++)
  expect(result.current.count.value).toBe(4)
  expect(result.current.doubled.value).toBe(8)
  expect(renderCount).toBe(1)

  act(() => (result.current.doubled.value = 40))
  expect(result.current.doubled.value).toBe(40)
  expect(result.current.count.value).toBe(20)
  expect(renderCount).toBe(2)
})
