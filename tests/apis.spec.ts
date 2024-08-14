import { test, expect } from 'vitest'
import * as vueReactivity from '@vue/reactivity'
import * as veact from '../src'
import {
  onMounted,
  onBeforeUnmount,
  onUpdated,
  useRef,
  useShallowRef,
  useCustomRef,
  useReactive,
  useShallowReactive,
  useReadonly,
  useShallowReadonly,
  useComputed,
  watch,
  useWatch,
  watchEffect,
  useWatchEffect,
  useEffectScope,
  useReactivity,
} from '../src'

test('<exports> should be export all @vue/reactivity members', () => {
  expect(
    Object.keys(vueReactivity).every((key) => {
      const targetMember = veact[key]
      return targetMember && vueReactivity[key] === targetMember
    }),
  ).toBeTruthy()
})

test('<type> should be the respective type', () => {
  const hooksTargetType = 'function'

  expect(typeof onMounted).toBe(hooksTargetType)
  expect(typeof onBeforeUnmount).toBe(hooksTargetType)
  expect(typeof onUpdated).toBe(hooksTargetType)
  expect(typeof useRef).toBe(hooksTargetType)
  expect(typeof useShallowRef).toBe(hooksTargetType)
  expect(typeof useCustomRef).toBe(hooksTargetType)
  expect(typeof useReactive).toBe(hooksTargetType)
  expect(typeof useShallowReactive).toBe(hooksTargetType)
  expect(typeof useReadonly).toBe(hooksTargetType)
  expect(typeof useShallowReadonly).toBe(hooksTargetType)
  expect(typeof useComputed).toBe(hooksTargetType)
  expect(typeof watch).toBe(hooksTargetType)
  expect(typeof useWatch).toBe(hooksTargetType)
  expect(typeof watchEffect).toBe(hooksTargetType)
  expect(typeof useWatchEffect).toBe(hooksTargetType)
  expect(typeof useEffectScope).toBe(hooksTargetType)
  expect(typeof useReactivity).toBe(hooksTargetType)
})
