import { test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ref, reactive, watch, useRef, useWatch, onUpdated } from '../src'

test('<watch> onCleanup / watchHandle', () => {
  const logs: any[] = []
  const count = ref(0)

  const watchHandle = watch(count, (value, _, onCleanup) => {
    logs.push(value)
    onCleanup(() => logs.push('onCleanup'))
  })

  expect(logs.length).toBe(0)
  expect(count.value).toBe(0)
  expect(watchHandle).toBeTypeOf('function')
  expect(watchHandle).toBeTypeOf('function')
  expect(watchHandle.pause).toBeTypeOf('function')
  expect(watchHandle.resume).toBeTypeOf('function')
  expect(watchHandle.stop).toBeTypeOf('function')

  count.value = 1
  expect(count.value).toBe(1)
  expect(logs[0]).toBe(1)

  watchHandle.pause()
  count.value = 2
  expect(logs.length).toBe(1)

  watchHandle.resume()
  count.value = 3
  expect(logs.at(-1)).toBe(3)

  watchHandle()
  expect(logs.at(-2)).toBe(3)
  expect(logs.at(-1)).toBe('onCleanup')

  count.value = 4
  expect(count.value).toBe(4)
  expect(logs.at(-1)).toBe('onCleanup')
})

test('<watch> { immediate: true }', () => {
  const logs: any[] = []
  const count = ref(0)

  watch(count, (value) => logs.push(value), { immediate: true })

  expect(count.value).toBe(0)
  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(0)

  count.value = 1
  expect(logs.at(-1)).toBe(1)
})

test('<watch> { once: true }', () => {
  const logs: any[] = []
  const count = ref(0)

  watch(count, (value) => logs.push(value), { once: true })

  expect(count.value).toBe(0)
  expect(logs.length).toBe(0)

  count.value = 1
  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(1)

  count.value = 2
  count.value = 3
  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(1)
})

test('<watch> { deep }', () => {
  const watchTriggerCounts = {
    root: 0,
    default: 0,
    deepTrue: 0,
    deepFalse: 0,
    deep2: 0,
    deep4: 0,
  }

  const data = reactive({
    root: 0,
    level1: {
      level2: {
        level3: {
          level4: 100,
        },
      },
    },
  })

  watch(
    () => data.root,
    () => watchTriggerCounts.root++,
  )
  watch(data, () => watchTriggerCounts.default++)
  watch(data, () => watchTriggerCounts.deepTrue++, { deep: true })
  watch(data, () => watchTriggerCounts.deepFalse++, { deep: false })
  watch(data, () => watchTriggerCounts.deep2++, { deep: 2 })
  watch(data, () => watchTriggerCounts.deep4++, { deep: 4 })

  data.root++
  data.root++
  data.root++
  data.level1.level2.level3.level4++
  data.level1.level2.level3.level4++
  data.level1.level2.level3.level4++

  expect(watchTriggerCounts.root).toBe(3)
  expect(watchTriggerCounts.default).toBe(6)
  expect(watchTriggerCounts.deepTrue).toBe(6)
  expect(watchTriggerCounts.deepFalse).toBe(3)
  expect(watchTriggerCounts.deep2).toBe(3)
  expect(watchTriggerCounts.deep4).toBe(6)
})

test('<watch> ref', () => {
  const logs: any[] = []
  const data = ref(0)
  watch(data, (value) => logs.push(value))

  expect(logs.length).toBe(0)
  expect(data.value).toBe(0)

  data.value = 1
  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(1)
})

test('<watch> [ref]', () => {
  const logs: any[] = []
  const data = ref(0)
  watch([data], ([value]) => logs.push(value))

  expect(logs.length).toBe(0)
  expect(data.value).toBe(0)

  data.value = 1
  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(1)
})

test('<watch> () => ref.value', () => {
  const logs: any[] = []
  const data = ref(0)
  watch(
    () => data.value,
    (value) => logs.push(value),
  )

  expect(logs.length).toBe(0)
  expect(data.value).toBe(0)

  data.value = 1
  expect(data.value).toBe(1)
  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(1)
})

test('<watch> () => [ref.value]', () => {
  const logs: any[] = []
  const data = ref(0)
  watch(
    () => [data.value],
    ([value]) => logs.push(value),
  )

  expect(logs.length).toBe(0)
  expect(data.value).toBe(0)

  data.value = 1
  expect(data.value).toBe(1)
  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(1)
})

test('<watch> reactive', () => {
  const logs: boolean[] = []
  const data = reactive({ visible: false })
  watch(data, (newData) => logs.push(newData.visible))

  expect(logs.length).toBe(0)
  expect(data.visible).toBe(false)

  data.visible = true
  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(true)
})

test('<watch> () => JSON.stringify(reactive)', () => {
  let isEqual = false
  const logs: any[] = []
  const data = reactive({ value: false })
  watch(
    () => JSON.stringify(data),
    (newData, oldData) => {
      isEqual = newData === oldData
      logs.push(newData)
    },
  )

  expect(logs.length).toBe(0)
  expect(data.value).toBe(false)

  data.value = true
  expect(isEqual).toBe(false)
  expect(logs.length).toBe(1)
  expect(typeof logs[0]).toBe('string')
})

test('<watch> () => reactive[key]', () => {
  let count = 0
  const data = reactive({ value: false })
  watch(
    () => data.value,
    () => count++,
  )

  expect(count).toBe(0)
  data.value = true
  data.value = false
  data.value = true
  expect(count).toBe(3)
})

test('<watch> () => [ref.value, reactive[key]]', () => {
  const logs: any[] = []
  const refData = ref(0)
  const reactiveData = reactive({ value: false })
  watch(
    () => [refData.value, reactiveData.value] as const,
    (newData) => logs.push(...newData),
  )

  expect(logs.length).toBe(0)

  refData.value++
  expect(logs.length).toBe(2)
  expect(logs[0]).toBe(1)
  expect(logs[1]).toBe(false)

  reactiveData.value = true
  expect(logs.length).toBe(4)
  expect(logs[2]).toBe(1)
  expect(logs[3]).toBe(true)
})

test('<watch> [ref, reactive]', () => {
  const logs: any[] = []
  const refData = ref(0)
  const reactiveData = reactive({ value: false })
  watch([refData, reactiveData], (newData) => {
    logs.push(newData[0], newData[1].value)
  })

  expect(logs.length).toBe(0)

  refData.value++
  expect(logs.length).toBe(2)
  expect(logs[0]).toBe(1)
  expect(logs[1]).toBe(false)

  reactiveData.value = true
  expect(logs.length).toBe(4)
  expect(logs[2]).toBe(1)
  expect(logs[3]).toBe(true)
})

test('<useWatch>', () => {
  let renderCount = 0
  const logs: any[] = []
  const hookRender = renderHook(() => {
    const data = useRef(0)
    onUpdated(() => renderCount++)
    useWatch(data, (newValue, __, onCleanup) => {
      logs.push(newValue)
      onCleanup(() => logs.push('onCleanup'))
    })
    return data
  })

  expect(renderCount).toBe(0)
  expect(hookRender.result.current.value).toBe(0)

  act(() => hookRender.result.current.value++)
  expect(renderCount).toBe(1)
  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(1)

  act(() => hookRender.result.current.value++)
  act(() => hookRender.result.current.value++)
  act(() => hookRender.result.current.value++)
  expect(renderCount).toBe(4)
  expect(logs.at(-1)).toBe(4)

  hookRender.unmount()
  expect(renderCount).toBe(4)
  expect(logs.at(-1)).toBe('onCleanup')
})
