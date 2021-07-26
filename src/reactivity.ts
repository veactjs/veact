/**
 * @module veact.reactivity
 * @description redirect all APIs from @vue/reactivity
 * @author Surmon <https://github.com/surmon-china>
 */

import type { Ref, UnwrapRef } from '@vue/reactivity'

export * from '@vue/reactivity'
export type ToRef<T> = [T] extends [Ref] ? T : Ref<UnwrapRef<T>>
