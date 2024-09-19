/**
 * @module veact
 * @author Surmon <https://github.com/surmon-china>
 */

import { watcherInstance } from './watch'

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
export { watcherInstance, useWatch } from './watch'
//兼容处理
const watch=watcherInstance.watch.bind(watcherInstance);
export {watch};

export type { WatchOptions, MultiWatchSources } from './watch'

// watchEffect and hooks
export { watchEffect, useWatchEffect } from './watchEffect'
export type { WatchEffectOptions } from './watchEffect'

// effectScope hooks
export { useEffectScope } from './effectScope'

// reactivity enhancer hooks
export { useReactivity } from './reactivity'
