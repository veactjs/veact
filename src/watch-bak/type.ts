/**
 * @module veact.watch.type
 * @author Surmon <https://github.com/surmon-china>
 */

import type { ReactiveEffect, EffectScope as _EffectScope } from '@vue/reactivity'

export type OnCleanup = (cleanupFn: () => void) => void

export type WatchStopHandle = () => void
export interface WatchHandle extends WatchStopHandle {
  pause: () => void
  resume: () => void
  stop: () => void
}

export interface EffectScope extends _EffectScope {
  parent: any
  cleanups: any[]
  effects: ReactiveEffect[]
}
