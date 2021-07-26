import { renderHook, act } from '@testing-library/react-hooks'
import * as vueReactivity from '@vue/reactivity'
import * as veact from '../src'
import {
  onMounted,
  onBeforeUnmount,
  onUpdated,
  useReactive,
  useRef,
  useShallowRef,
  useShallowReactive,
  useComputed,
  watch,
  useWatch,
  watchEffect,
  useWatchEffect,
  useReactivity,
  batchedUpdates,
} from '../src'

test('<exports> should be export all @vue/reactivity members', () => {
  expect(
    Object.keys(vueReactivity).every((key) => {
      const targetMember = (veact as any)[key]
      return Boolean(targetMember) && (vueReactivity as any)[key] === targetMember
    })
  ).toBeTruthy()
})

test('<type> should be function type', () => {
  const hooksTargetType = 'function'
  expect(typeof onMounted).toBe(hooksTargetType)
  expect(typeof onUpdated).toBe(hooksTargetType)
  expect(typeof onBeforeUnmount).toBe(hooksTargetType)
  expect(typeof useReactive).toBe(hooksTargetType)
  expect(typeof useRef).toBe(hooksTargetType)
  expect(typeof useShallowRef).toBe(hooksTargetType)
  expect(typeof useShallowReactive).toBe(hooksTargetType)
  expect(typeof useComputed).toBe(hooksTargetType)
  expect(typeof watch).toBe(hooksTargetType)
  expect(typeof useWatch).toBe(hooksTargetType)
  expect(typeof watchEffect).toBe(hooksTargetType)
  expect(typeof useWatchEffect).toBe(hooksTargetType)
  expect(typeof useReactivity).toBe(hooksTargetType)
  expect(typeof batchedUpdates).toBe(hooksTargetType)
})

test('<lifecycle>', () => {
  const results: string[] = []
  const hookRenderer = renderHook(() => {
    onMounted(() => {
      results.push('onMounted')
    })
    onUpdated(() => {
      results.push('onUpdated')
    })
    onBeforeUnmount(() => {
      results.push('onBeforeUnmount')
    })
    return useRef(0)
  })

  act(() => {
    hookRenderer.result.current.value++
  })

  hookRenderer.unmount()
  expect(results.length).toBe(3)
  expect(results[0]).toBe('onMounted')
  expect(results[1]).toBe('onUpdated')
  expect(results[2]).toBe('onBeforeUnmount')
})
