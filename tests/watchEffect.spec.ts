import { test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ref, watchEffect, useWatchEffect } from '../src'

test('<watchEffect>', () => {
  const logs: any[] = []
  const count = ref(0)
  const watchHandle = watchEffect((onCleanup) => {
    logs.push(count.value)
    onCleanup(() => logs.push('onCleanup'))
  })

  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(0)

  count.value++
  expect(count.value).toBe(1)
  expect(logs.at(-1)).toBe(1)
  expect(logs.at(-2)).toBe('onCleanup')

  count.value++
  expect(count.value).toBe(2)
  expect(logs.at(-1)).toBe(2)
  expect(logs.at(-2)).toBe('onCleanup')

  watchHandle.pause()
  count.value++
  expect(logs.length).toBe(5)

  watchHandle.resume()
  count.value++
  expect(logs.at(-1)).toBe(4)

  watchHandle()
  expect(logs.at(-2)).toBe(4)
  expect(logs.at(-1)).toBe('onCleanup')

  count.value++
  expect(count.value).toBe(5)
  expect(logs.length).toBe(10)
  expect(logs.at(-1)).toBe('onCleanup')
})

test('<useWatchEffect>', () => {
  let weTriggerCount = 0
  const logs: any[] = []
  const count = ref(0)
  const hookRender = renderHook(() => {
    return useWatchEffect((onCleanup) => {
      weTriggerCount++
      logs.push(count.value)
      onCleanup(() => logs.push('onCleanup'))
    })
  })

  expect(weTriggerCount).toBe(1)
  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(0)

  act(() => count.value++)
  expect(weTriggerCount).toBe(2)
  expect(logs.at(-1)).toBe(1)

  hookRender.result.current.pause()
  act(() => count.value++)
  expect(weTriggerCount).toBe(2)

  hookRender.result.current.resume()
  expect(weTriggerCount).toBe(3)
  expect(logs.at(-1)).toBe(2)

  hookRender.unmount()
  expect(logs.at(-2)).toBe(2)
  expect(logs.at(-1)).toBe('onCleanup')
})
