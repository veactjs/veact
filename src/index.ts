/**
 * @module veact
 * @author Surmon <https://github.com/surmon-china>
 */

// redirect all APIs from @vue/reactivity
export * from '@vue/reactivity'

// lifecycle hooks
export { onMounted, onUpdated, onBeforeUnmount } from './lifecycle'

// ref and hooks
export { useRef, useShallowRef, useCustomRef } from './ref'

// reactive and hooks
export { useReactive, useShallowReactive } from './reactive'

// readonly and hooks
export { useReadonly, useShallowReadonly } from './readonly'

// computed and hooks
export { useComputed } from './computed'

// watch and hooks
export { watch, useWatch } from './watch/watch'
export type { WatchOptions, WatchSource, MultiWatchSources, WatchCallback } from './watch/watch'

// watchEffect and hooks
export { watchEffect, useWatchEffect } from './watch/watchEffect'
export type { WatchEffect, WatchEffectOptions } from './watch/watchEffect'

// watch handle
export type { WatchStopHandle, WatchHandle } from './watch/type'

// reactivity enhancer hooks
export { useReactivity } from './reactivity'

// effectScope hooks
export { useEffectScope } from './effectScope'
