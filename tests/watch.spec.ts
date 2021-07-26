import { renderHook, act } from '@testing-library/react-hooks'
import {
  ref,
  reactive,
  watch,
  useRef,
  useWatch,
  watchEffect,
  useWatchEffect,
} from '../src'

test('<watchEffect> ref & onInvalidate', () => {
  const logs: any[] = []
  const data = ref(3)
  const stopWatch = watchEffect((onInvalidate) => {
    logs.push(data.value)
    onInvalidate(() => {
      logs.push('onInvalidate')
    })
  })

  expect(logs.length).toBe(1)
  data.value = 4
  expect(logs.length).toBe(3)
  expect(logs[1]).toBe('onInvalidate')
  expect(logs[2]).toBe(4)
  expect(data.value).toBe(4)
  stopWatch()
  expect(logs.length).toBe(4)
  expect(logs[3]).toBe('onInvalidate')
})

test('<watch> ref & onInvalidate', () => {
  const logs: any[] = []
  const data = ref(3)
  const stopWatch = watch(data, (value, _, onInvalidate) => {
    logs.push(value)
    onInvalidate(() => {
      logs.push('onInvalidate')
    })
  })

  expect(logs.length).toBe(0)
  expect(data.value).toBe(3)
  data.value = 4
  expect(data.value).toBe(4)
  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(4)
  stopWatch()
  expect(logs.length).toBe(2)
  expect(logs[1]).toBe('onInvalidate')
})

test('<watch> function ref', () => {
  const logs: any[] = []
  const data = ref(3)
  watch(
    () => data.value,
    (value) => logs.push(value)
  )

  expect(logs.length).toBe(0)
  expect(data.value).toBe(3)
  data.value = 4
  expect(data.value).toBe(4)
  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(4)
})

test('<watch> array function ref', () => {
  const logs: any[] = []
  const data = ref(3)
  watch(
    () => [data.value],
    ([value]) => logs.push(value)
  )

  expect(logs.length).toBe(0)
  expect(data.value).toBe(3)
  data.value = 4
  expect(data.value).toBe(4)
  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(4)
})

test('<watch> array ref', () => {
  const logs: any[] = []
  const data = ref(3)
  watch([data], ([value]) => logs.push(value))

  expect(logs.length).toBe(0)
  expect(data.value).toBe(3)
  data.value = 4
  expect(data.value).toBe(4)
  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(4)
})

test('<watch> reactive & immediate', () => {
  const logs: boolean[] = []
  const data = reactive({ value: false })
  watch(data, (newData) => logs.push(newData.value), { immediate: true })

  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(false)
  expect(data.value).toBe(false)
  data.value = true
  expect(data.value).toBe(true)
  expect(logs.length).toBe(2)
  expect(logs[1]).toBe(true)
})

test('<watch> function reactive cloneDeep', () => {
  let isEqual = false
  const logs: any[] = []
  const data = reactive({ value: false })
  watch(
    () => JSON.stringify(data),
    (newData, oldData) => {
      isEqual = newData === oldData
      logs.push(newData)
    }
  )

  expect(logs.length).toBe(0)
  expect(data.value).toBe(false)
  data.value = true
  expect(isEqual).toBe(false)
  expect(logs.length).toBe(1)
  expect(typeof logs[0]).toBe('string')
})

test('<watch> function reactive deep', () => {
  let isEqual = false
  const logs: any[] = []
  const data = reactive({ value: false })
  watch(
    () => data,
    (newData, oldData) => {
      isEqual = newData === oldData
      logs.push(newData.value)
    },
    {
      deep: true,
    }
  )

  expect(logs.length).toBe(0)
  expect(data.value).toBe(false)
  data.value = true
  expect(isEqual).toBe(true)
  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(true)
})

test('<watch> function array mixin', () => {
  const logs: any[] = []
  const refData = ref(0)
  const reactiveData = reactive({ value: false })
  watch(
    () => [refData.value, reactiveData.value] as const,
    (newData) => logs.push(...newData)
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

test('<watch> array mixin', () => {
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
  const logs: any[] = []
  const hookRender = renderHook(() => {
    const data = useRef(0)
    useWatch(data, (_, __, onInvalidate) => {
      logs.push(data.value)
      onInvalidate(() => {
        logs.push('onInvalidate')
      })
    })
    return data
  })

  expect(hookRender.result.current.value).toBe(0)
  act(() => {
    hookRender.result.current.value++
  })
  expect(hookRender.result.current.value).toBe(1)
  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(1)

  hookRender.unmount()
  expect(logs.length).toBe(2)
  expect(logs[1]).toBe('onInvalidate')
})

test('<useWatchEffect>', () => {
  const logs: any[] = []
  const hookRender = renderHook(() => {
    const data = useRef(0)
    useWatchEffect((onInvalidate) => {
      logs.push(data.value)
      onInvalidate(() => {
        logs.push('onInvalidate')
      })
    })
    return data
  })

  expect(logs.length).toBe(1)
  expect(logs[0]).toBe(0)
  act(() => {
    hookRender.result.current.value++
  })
  expect(hookRender.result.current.value).toBe(1)
  expect(logs.length).toBe(3)
  expect(logs[1]).toBe('onInvalidate')
  expect(logs[2]).toBe(1)

  hookRender.unmount()
  expect(logs.length).toBe(4)
  expect(logs[3]).toBe('onInvalidate')
})
