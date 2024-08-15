import { test, expect, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { reactive, isReactive, isReadonly, onUpdated, useReadonly, useShallowReadonly } from '../src'

// for: [Vue warn] Set operation on key "xxx" failed: target is readonly.
const consoleMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
afterEach(() => {
  consoleMock.mockReset()
})

const dataObject = reactive({
  data: 10,
  nested: { data: 1 },
})

test('<useReadonly>', () => {
  let renderCount = 0
  const { result } = renderHook(() => {
    onUpdated(() => renderCount++)
    return useReadonly(dataObject)
  })

  expect(result.current.data).toBe(10)
  expect(result.current.nested.data).toBe(1)
  expect(isReactive(result.current)).toBeTruthy()
  expect(isReactive(result.current.nested)).toBeTruthy()
  expect(isReadonly(result.current)).toBeTruthy()
  expect(isReadonly(result.current.nested)).toBeTruthy()

  // @ts-ignore
  act(() => result.current.data++)
  expect(result.current.data).toBe(10)
  expect(renderCount).toBe(0)

  // @ts-ignore
  act(() => result.current.nested.data++)
  expect(result.current.nested.data).toBe(1)
  expect(renderCount).toBe(0)

  expect(consoleMock).toHaveBeenCalledTimes(2)
  expect(consoleMock).toHaveBeenNthCalledWith(
    1,
    `[Vue warn] Set operation on key "data" failed: target is readonly.`,
    result.current,
  )
  expect(consoleMock).toHaveBeenNthCalledWith(
    2,
    `[Vue warn] Set operation on key "data" failed: target is readonly.`,
    result.current.nested,
  )
})

test('<useShallowReadonly>', () => {
  let renderCount = 0
  const { result } = renderHook(() => {
    onUpdated(() => renderCount++)
    return useShallowReadonly(dataObject)
  })

  expect(result.current.data).toBe(10)
  expect(result.current.nested.data).toBe(1)
  expect(isReactive(result.current)).toBeTruthy()
  expect(isReactive(result.current.nested)).toBeTruthy()
  expect(isReadonly(result.current)).toBeTruthy()
  expect(isReadonly(result.current.nested)).toBeFalsy()

  // @ts-ignore
  act(() => result.current.data++)
  expect(result.current.data).toBe(10)
  expect(renderCount).toBe(0)

  act(() => result.current.nested.data++)
  expect(result.current.nested.data).toBe(2)
  expect(renderCount).toBe(0)

  expect(consoleMock).toHaveBeenCalledOnce()
  expect(consoleMock).toHaveBeenLastCalledWith(
    `[Vue warn] Set operation on key "data" failed: target is readonly.`,
    result.current,
  )
})
