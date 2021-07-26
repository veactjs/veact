import { renderHook, act } from '@testing-library/react-hooks'
import {
  ref,
  reactive,
  onUpdated,
  useReactive,
  useRef,
  useShallowRef,
  useShallowReactive,
  useComputed,
  useReactivity,
} from '../src'

test('<useRef>', () => {
  let renderCount = 0
  const { result } = renderHook(() => {
    onUpdated(() => {
      renderCount++
    })
    return useRef(0)
  })
  expect(result.current.value).toBe(0)
  act(() => {
    result.current.value++
  })
  expect(result.current.value).toBe(1)
  expect(renderCount).toBe(1)
})

test('<useShallowRef>', () => {
  let renderCount = 0
  const { result } = renderHook(() => {
    onUpdated(() => {
      renderCount++
    })
    return useShallowRef({ test: 0 })
  })
  expect(result.current.value.test).toBe(0)
  act(() => {
    result.current.value.test++
  })
  expect(result.current.value.test).toBe(1)
  expect(renderCount).toBe(0)
  act(() => {
    result.current.value = { test: 2 }
  })
  expect(result.current.value.test).toBe(2)
  expect(renderCount).toBe(1)
})

test('<useReactive>', () => {
  let renderCount = 0
  const { result } = renderHook(() => {
    onUpdated(() => {
      renderCount++
    })
    return useReactive({ test: 0 })
  })
  expect(result.current.test).toBe(0)
  act(() => {
    result.current.test++
  })
  expect(result.current.test).toBe(1)
  expect(renderCount).toBe(1)
})

test('<useShallowReactive>', () => {
  let renderCount = 0
  const { result } = renderHook(() => {
    onUpdated(() => {
      renderCount++
    })
    return useShallowReactive({ test: { key: 'value' } })
  })
  expect(result.current.test.key).toBe('value')
  act(() => {
    result.current.test.key = 'value2'
  })
  expect(result.current.test.key).toBe('value2')
  expect(renderCount).toBe(0)
  act(() => {
    result.current.test = { key: 'xxx' }
  })
  expect(result.current.test.key).toBe('xxx')
  expect(renderCount).toBe(1)
})

test('<useComputed> getter', () => {
  let renderCount = 0
  const { result } = renderHook(() => {
    const data = useRef(3)
    const computer = useComputed(() => data.value * 10)
    onUpdated(() => {
      renderCount++
    })
    return { data, computer }
  })
  expect(renderCount).toBe(0)
  expect(result.current.computer.value).toBe(30)
  act(() => {
    result.current.data.value++
  })
  expect(renderCount).toBe(1)
  expect(result.current.data.value).toBe(4)
  expect(result.current.computer.value).toBe(40)
})

test('<useComputed> options', () => {
  const { result } = renderHook(() => {
    const data = useRef(0)
    const computer = useComputed<number>({
      set(value) {
        data.value = value
      },
      get() {
        return data.value
      },
    })
    return { data, computer }
  })
  expect(result.current.computer.value).toBe(result.current.data.value)
  expect(result.current.computer.value).toBe(0)
  act(() => {
    result.current.computer.value++
  })
  expect(result.current.data.value).toBe(1)
  expect(result.current.computer.value).toBe(1)
})

test('<useReactivity> ', () => {
  let renderCount = 0
  const refData = ref(0)
  const reactiveData = reactive({ count: 0 })
  const { result } = renderHook(() => {
    onUpdated(() => {
      renderCount++
    })
    return useReactivity(() => ({
      refData,
      reactiveData,
    }))
  })
  expect(result.current.refData.value).toBe(refData.value)
  expect(result.current.refData.value).toBe(0)
  act(() => {
    refData.value++
  })
  expect(result.current.refData.value).toBe(1)
  expect(renderCount).toBe(1)
  act(() => {
    reactiveData.count++
  })
  expect(renderCount).toBe(2)
})
