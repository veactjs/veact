import { test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { onUpdated, isRef, useRef, useShallowRef, useCustomRef } from '../src'

test('<useRef>', () => {
  let renderCount = 0
  const { result } = renderHook(() => {
    onUpdated(() => renderCount++)
    return useRef<Record<string, any>>({ count: 0 })
  })

  expect(result.current.value.count).toBe(0)
  expect(isRef(result.current)).toBeTruthy()

  act(() => result.current.value.count++)
  expect(result.current.value.count).toBe(1)
  expect(renderCount).toBe(1)

  act(() => result.current.value.count++)
  expect(result.current.value.count).toBe(2)
  expect(renderCount).toBe(2)

  act(() => (result.current.value = { name: 'veact' }))
  expect(result.current.value.name).toBe('veact')
  expect(renderCount).toBe(3)
})

test('<useShallowRef>', () => {
  let renderCount = 0
  const { result } = renderHook(() => {
    onUpdated(() => renderCount++)
    return useShallowRef<Record<string, any>>({ count: 0 })
  })

  expect(result.current.value.count).toBe(0)
  expect(isRef(result.current)).toBeTruthy()

  act(() => result.current.value.count++)
  expect(result.current.value.count).toBe(1)
  expect(renderCount).toBe(0)

  act(() => (result.current.value = { name: 'veact' }))
  expect(result.current.value.name).toBe('veact')
  expect(renderCount).toBe(1)

  act(() => (result.current.value = { author: 'surmon' }))
  expect(result.current.value.name).toBeUndefined()
  expect(result.current.value.author).toBe('surmon')
  expect(renderCount).toBe(2)

  act(() => (result.current.value.author = ''))
  expect(result.current.value.author).toBe('')
  expect(renderCount).toBe(2)
})

test('<useCustomRef>', () => {
  let renderCount = 0
  let refValue = 10
  const { result } = renderHook(() => {
    onUpdated(() => renderCount++)
    return useCustomRef((track, trigger) => ({
      get() {
        track()
        return refValue
      },
      set(newValue) {
        refValue = newValue
        trigger()
      },
    }))
  })

  expect(result.current.value).toBe(10)
  expect(isRef(result.current)).toBeTruthy()

  act(() => result.current.value++)
  expect(result.current.value).toBe(11)
  expect(renderCount).toBe(1)

  act(() => result.current.value++)
  expect(result.current.value).toBe(12)
  expect(renderCount).toBe(2)
})
