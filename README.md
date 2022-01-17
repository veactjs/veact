# Veact

[![veact](https://img.shields.io/badge/WITH-VEACT-42a97a?style=for-the-badge&labelColor=35495d)](https://github.com/veactjs/veact)
&nbsp;
[![GitHub stars](https://img.shields.io/github/stars/veactjs/veact.svg?style=for-the-badge)](https://github.com/veactjs/veact/stargazers)
&nbsp;
[![npm](https://img.shields.io/npm/v/veact?color=c7343a&label=npm&style=for-the-badge)](https://www.npmjs.com/package/veact)
&nbsp;
[![Test Codecov](https://img.shields.io/codecov/c/github/veactjs/veact?style=for-the-badge)](https://codecov.io/gh/veactjs/veact)
&nbsp;
[![GitHub license](https://img.shields.io/github/license/veactjs/veact.svg?style=for-the-badge)](https://github.com/veactjs/veact/blob/master/LICENSE)

> Mutable state enhancer library for [`React`](https://github.com/facebook/react) by [`@vue/reactivity`](https://github.com/vuejs/vue-next/tree/master/packages/reactivity).

> 适用于 [`React`](https://github.com/facebook/react) 的可变式状态管理库，基于 [`@vue/reactivity`](https://github.com/vuejs/vue-next/tree/master/packages/reactivity) 进行开发。

**🔥 Who is using this library**

Already used in production for these project :

- **[veact-admin](https://github.com/surmon-china/veact-admin)** Blog admin | 博客管理后台
- ...

---

### Installation

```bash
npm install veact react react-dom --save
```

or

```bash
yarn add veact react react-dom
```

### Usage

**Lifecycle**

```tsx
import React from 'react'
import { onMounted, onBeforeUnmount, onUpdated } from 'veact'

export const Component: React.FC = () => {
  onMounted(() => {
    console.log('component mounted')
  })

  onUpdated(() => {
    console.log('component updated')
  })

  onBeforeUnmount(() => {
    console.log('component will unmount')
  })

  return <div>component</div>
}
```

**Base**

```tsx
import React from 'react'
import { useRef } from 'veact'

export const Component: React.FC = () => {
  const count = useRef(0)
  const increment = () => {
    count.value++
  }

  return (
    <div>
      <span>{count.value}</span>
      <Button onClick={increment}>increment</Button>
    </div>
  )
}
```

**Reactivity**

transform any reactivity object to reactivity hook.

```tsx
import React from 'react'
import { ref, useReactivity } from 'veact'

// reactivity ref
const _count = ref(0)

export const Component: React.FC = () => {
  // to reactivity hook
  const count = useReactivity(() => _count)
  const increment = () => {
    count.value++
  }

  return (
    <div>
      <span>{count.value}</span>
      <Button onClick={increment}>increment</Button>
    </div>
  )
}
```

**Watch**

```tsx
import React from 'react'
import { useReactive, useWatch } from 'veact'

export const Component: React.FC = () => {
  const data = useReactive({
    count: 0,
  })
  const increment = () => {
    data.count++
  }

  useWatch(data, (newData) => {
    console.log('data changed', newData)
  })

  useWatch(
    () => data.count,
    (newCount) => {
      console.log('count changed', newCount)
    }
  )

  return (
    <div>
      <span>{data.count}</span>
      <Button onClick={increment}>increment</Button>
    </div>
  )
}
```

**Computed**

```tsx
import React from 'react'
import { useReactive, useComputed } from 'veact'

export const Component: React.FC = () => {
  const data = useReactive({
    count: 4,
    year: 3,
  })
  const total = useComputed(() => {
    return data.count * data.year
  })

  const incrementCount = () => {
    data.count++
  }

  return (
    <div>
      <span>{total.value}</span>
      <Button onClick={incrementCount}>incrementCount</Button>
    </div>
  )
}
```

**Enhancer**

```tsx
import React from 'react'
import { useReactive, onMounted, batchedUpdates } from 'veact'

export const Component: React.FC = () => {
  const data = useReactive({
    count: 0,
    list: [],
  })
  const fetch = () => {
    fetchData().then((result) => {
      batchedUpdates(() => {
        data.count = result.count
        data.list = result.list
      })
    })
  }

  onMounted(() => {
    fetch()
  })

  return <div>{data.count}</div>
}
```

### API

```ts
import {
  // Veact APIs

  // lifecycle
  onMounted, // lifecycle for react mounted
  onBeforeUnmount, // lifecycle for react will unmount
  onUpdated, // lifecycle for react updated

  // data
  useRef, // ref hook
  useShallowRef, // shallowRef hook
  useReactive, // reactive hook
  useShallowReactive, // shallowReactive hook
  useComputed, // computed hook

  // watch
  watch, // watch for reactivity data
  useWatch, // watch hook
  watchEffect, // watchEffect for reactivity data
  useWatchEffect, // watchEffect hook

  // enhancer
  useReactivity, // any object data to reactivity data
  batchedUpdates, // batchedUpdates === ReactDOM.unstable_batchedUpdates

  // @vue/reactivity APIs
  ref,
  reactive,
  computed,
  // ...
} from 'veact'
```

### Development

```bash
# install dependencies
yarn

# lint
yarn lint

# test
yarn test

# build
yarn build
```

### TODO

- [ ] support `useEffect` deps with reactivity prop value

### Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/veactjs/veact/blob/master/CHANGELOG.md).

### License

[MIT](https://github.com/veactjs/veact/blob/master/LICENSE)
