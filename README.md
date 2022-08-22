# Veact

[![veact](https://img.shields.io/badge/WITH-VEACT-42a97a?style=for-the-badge&labelColor=35495d)](https://github.com/veactjs/veact)
&nbsp;
[![GitHub stars](https://img.shields.io/github/stars/veactjs/veact.svg?style=for-the-badge)](https://github.com/veactjs/veact/stargazers)
&nbsp;
[![npm](https://img.shields.io/npm/v/veact?color=c7343a&label=npm&style=for-the-badge)](https://www.npmjs.com/package/veact)
&nbsp;
[![Test Codecov](https://img.shields.io/codecov/c/github/veactjs/veact?style=for-the-badge)](https://codecov.io/gh/veactjs/veact)
&nbsp;
[![GitHub license](https://img.shields.io/github/license/veactjs/veact.svg?style=for-the-badge)](/LICENSE)

Mutable state enhancer library for [`React`](https://github.com/facebook/react) based on [`@vue/reactivity`](https://github.com/vuejs/core/tree/main/packages/reactivity), with limited interoperability.

**Who is using this library 🔥**

- [**veact-admin**](https://github.com/surmon-china/veact-admin) A CMS admin by react & veact
- [**veact-use**](https://github.com/veactjs/veact-use) Veact hooks.
- ...

---

### Installation

```bash
npm install veact --save
```

```bash
yarn add veact
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
      <button onClick={increment}>increment</button>
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
const countRef = ref(0)

export const Component: React.FC = () => {
  // to reactivity hook
  const count = useReactivity(() => countRef)
  const increment = () => {
    count.value++
  }

  return (
    <div>
      <span>{count.value}</span>
      <button onClick={increment}>increment</button>
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
      <button onClick={increment}>increment</button>
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
      <button onClick={incrementCount}>incrementCount</button>
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
  onMounted,
  onBeforeUnmount,
  onUpdated,

  // data
  useRef,
  useShallowRef,
  useReactive,
  useShallowReactive,
  useComputed,

  // watch
  watch,
  useWatch,
  watchEffect,
  useWatchEffect,

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

### Changelog

Detailed changes for each release are documented in the [release notes](/CHANGELOG.md).

### License

Licensed under the [MIT](/LICENSE) License.
