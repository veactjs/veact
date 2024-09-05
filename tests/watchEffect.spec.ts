import { test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ref, watchEffect, useWatchEffect, onEffectCleanup } from '../src'

test('<watchEffect> watchHandle / onCleanup / onEffectCleanup', () => {
  const logs: any[] = []
  const count = ref(0)
  const watchHandle = watchEffect((onCleanup) => {
    logs.push(count.value)
    onCleanup(() => logs.push('onCleanup'))
    onEffectCleanup(() => logs.push('onEffectCleanup'))
  })

  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(0)

  count.value++
  expect(count.value).toBe(1)
  expect(logs.at(-1)).toBe(1)
  expect(logs.at(-2)).toBe('onCleanup')
  expect(logs.at(-3)).toBe('onEffectCleanup')

  count.value++
  expect(count.value).toBe(2)
  expect(logs.at(-1)).toBe(2)
  expect(logs.at(-2)).toBe('onCleanup')

  watchHandle.pause()
  count.value++
  expect(logs.length).toBe(7)

  watchHandle.resume()
  count.value++
  expect(logs.at(-1)).toBe(4)

  watchHandle()
  expect(logs.at(-1)).toBe('onCleanup')
  expect(logs.at(-2)).toBe('onEffectCleanup')
  expect(logs.at(-3)).toBe(4)

  count.value++
  expect(count.value).toBe(5)
  expect(logs.length).toBe(15)
  expect(logs.at(-1)).toBe('onCleanup')
  expect(logs.at(-2)).toBe('onEffectCleanup')
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
