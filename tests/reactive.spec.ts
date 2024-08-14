import { test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { onUpdated, isReactive, useReactive, useShallowReactive } from '../src'

test('<useReactive>', () => {
  let renderCount = 0
  const { result } = renderHook(() => {
    onUpdated(() => renderCount++)
    return useReactive({
      data: 10,
      nested: { data: 1 },
    })
  })

  expect(result.current.data).toBe(10)
  expect(result.current.nested.data).toBe(1)
  expect(isReactive(result.current)).toBeTruthy()
  expect(isReactive(result.current.nested)).toBeTruthy()

  act(() => result.current.data++)
  expect(result.current.data).toBe(11)
  expect(renderCount).toBe(1)

  act(() => result.current.nested.data++)
  expect(result.current.nested.data).toBe(2)
  expect(renderCount).toBe(2)
})

test('<useShallowReactive>', () => {
  let renderCount = 0
  const { result } = renderHook(() => {
    onUpdated(() => renderCount++)
    return useShallowReactive({
      data: 10,
      nested: { data: 1 },
    })
  })

  expect(result.current.data).toBe(10)
  expect(result.current.nested.data).toBe(1)
  expect(isReactive(result.current)).toBeTruthy()
  expect(isReactive(result.current.nested)).toBeFalsy()

  act(() => result.current.nested.data++)
  expect(result.current.nested.data).toBe(2)
  expect(renderCount).toBe(0)

  act(() => result.current.data++)
  expect(result.current.data).toBe(11)
  expect(renderCount).toBe(1)
})
