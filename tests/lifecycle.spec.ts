import { test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRef, onMounted, onBeforeUnmount, onUpdated } from '../src'

test('<lifecycle>', () => {
  const testLogs: string[] = []
  const hookRenderer = renderHook(() => {
    onMounted(() => {
      testLogs.push('onMounted')
    })
    onUpdated(() => {
      testLogs.push('onUpdated')
    })
    onBeforeUnmount(() => {
      testLogs.push('onBeforeUnmount')
    })
    return useRef(0)
  })

  act(() => hookRenderer.result.current.value++)

  expect(testLogs.length).toBe(2)
  expect(testLogs[0]).toBe('onMounted')
  expect(testLogs[1]).toBe('onUpdated')
  expect(hookRenderer.result.current.value).toBe(1)

  act(() => hookRenderer.result.current.value++)
  act(() => hookRenderer.result.current.value++)

  expect(testLogs.length).toBe(4)
  expect(testLogs[2]).toBe('onUpdated')
  expect(testLogs[3]).toBe('onUpdated')
  expect(hookRenderer.result.current.value).toBe(3)

  hookRenderer.unmount()

  expect(testLogs.length).toBe(5)
  expect(testLogs.at(-1)).toBe('onBeforeUnmount')
})
