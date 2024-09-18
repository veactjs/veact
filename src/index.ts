/**
 * @module veact
 * @author Surmon <https://github.com/surmon-china>
 */

// redirect all APIs from @vue/reactivity
export * from '@vue/reactivity'
export * from "./setup/setupComponents"
export { watch as baseWatch } from '@vue/reactivity'

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
export { watch, useWatch } from './watch'
export type { WatchOptions, MultiWatchSources } from './watch'

// watchEffect and hooks
export { watchEffect, useWatchEffect } from './watchEffect'
export type { WatchEffectOptions } from './watchEffect'

// effectScope hooks
export { useEffectScope } from './effectScope'

// reactivity enhancer hooks
export { useReactivity } from './reactivity'
