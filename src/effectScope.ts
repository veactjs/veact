/**
 * @module veact.effectScope
 * @author Surmon <https://github.com/surmon-china>
 */

import { useState as useReactState, useRef as useReactRef, useCallback as useReactCallback } from 'react'
import { effectScope, EffectScope } from '@vue/reactivity'
import { ArgumentTypes } from './_utils'

/**
 * Creates an effect scope object which can capture the reactive effects (i.e.
 * computed and watchers) created within it so that these effects can be
 * disposed together. For detailed use cases of this API, please consult its
 * corresponding {@link https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md | RFC}.
 *
 * @param detached - Can be used to create a "detached" effect scope.
 * @see {@link https://vuejs.org/api/reactivity-advanced.html#effectscope Vue `effectScope()`}
 */
export function useEffectScope(...args: ArgumentTypes<typeof effectScope>) {
  const hasRun = useReactRef(false)
  const [scope] = useReactState(() => effectScope(...args))
  const runFn = useReactCallback(
    <T>(fn: () => T) => {
      if (!hasRun.current) {
        hasRun.current = true
        return scope.run(fn)
      } else {
        return undefined
      }
    },
    [scope],
  )

  return {
    ...scope,
    run: runFn,
    pause: scope.pause.bind(scope),
    resume: scope.resume.bind(scope),
    stop: scope.stop.bind(scope),
  } as EffectScope
}