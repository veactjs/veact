import { test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import {
  ref,
  reactive,
  useRef,
  watch,
  EffectScope,
  onUpdated,
  useEffectScope,
  getCurrentScope,
  onScopeDispose,
} from '../src'

test('<useEffectScope>', () => {
  let renderCount = 0
  let scopeRunCount = 0
  let scopeDisposed = false
  const foo = ref(0)
  const bar = reactive({ count: 10 })

  const { result } = renderHook(() => {
    onUpdated(() => renderCount++)

    const scope = useEffectScope()
    const fooWatchChanged = useRef(0)
    const barWatchChanged = useRef(0)

    scope.run(() => {
      scopeRunCount++
      watch(foo, () => {
        fooWatchChanged.value++
      })
      watch(bar, () => {
        barWatchChanged.value++
      })
      onScopeDispose(() => {
        scopeDisposed = true
      })

      const currentScope = getCurrentScope()
      expect(currentScope).toBeDefined()
      expect(getCurrentScope()).toBe(currentScope)
    })

    return {
      scope,
      fooWatchChanged,
      barWatchChanged,
    }
  })

  expect(renderCount).toBe(0)
  expect(scopeRunCount).toBe(1)
  expect(scopeDisposed).toBe(false)
  expect(result.current.scope).toBeInstanceOf(EffectScope)

  act(() => foo.value++)
  expect(foo.value).toBe(1)
  expect(renderCount).toBe(1)
  expect(result.current.fooWatchChanged.value).toBe(1)
  expect(result.current.barWatchChanged.value).toBe(0)

  act(() => bar.count++)
  expect(bar.count).toBe(11)
  expect(renderCount).toBe(2)
  expect(result.current.fooWatchChanged.value).toBe(1)
  expect(result.current.barWatchChanged.value).toBe(1)

  act(() => result.current.scope.pause())
  act(() => foo.value++)
  act(() => bar.count++)
  expect(result.current.fooWatchChanged.value).toBe(1)
  expect(result.current.barWatchChanged.value).toBe(1)
  expect(foo.value).toBe(2)
  expect(bar.count).toBe(12)
  expect(renderCount).toBe(2)
  expect(scopeDisposed).toBe(false)

  act(() => result.current.scope.resume())
  expect(result.current.fooWatchChanged.value).toBe(2)
  expect(result.current.barWatchChanged.value).toBe(2)
  expect(renderCount).toBe(3)
  expect(scopeDisposed).toBe(false)

  act(() => result.current.scope.stop())
  act(() => foo.value++)
  act(() => bar.count++)
  expect(result.current.fooWatchChanged.value).toBe(2)
  expect(result.current.barWatchChanged.value).toBe(2)
  expect(renderCount).toBe(3)
  expect(scopeDisposed).toBe(true)

  act(() => result.current.scope.resume())
  act(() => foo.value++)
  act(() => bar.count++)
  expect(result.current.fooWatchChanged.value).toBe(2)
  expect(result.current.barWatchChanged.value).toBe(2)
  expect(renderCount).toBe(3)

  // Run only once
  expect(scopeRunCount).toBe(1)
})
