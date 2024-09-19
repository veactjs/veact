<br />

<p align="center">
  <img src="/logo.svg" height="120" alt="veact" />
</p>

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

A mutable state enhancer library for [`React`](https://github.com/facebook/react), built on top of [`@vue/reactivity`](https://github.com/vuejs/core/tree/main/packages/reactivity).

#### Why Veact?

If you’re frustrated with the repetitive task of defining `props`, `emits`, `slots` and `attrs` in Vue, sometimes struggling to keep track of types, and you value the simplicity of managing everything with interfaces in React, then Veact is for you. Veact effortlessly merges the low cognitive overhead of Vue’s mutable state with the robust type support and flexibility of React’s JSX. It strikes a perfect balance between the strengths of both frameworks, providing a near-flawless development experience—without the complexity and potential pitfalls of useEffect in React.

Veact embodies what I believe is the **“best of both worlds”**—a powerful, yet intuitive library crafted to simplify and enhance your front-end development experience and efficiency.

#### Who is using this library 🔥

- [**veact-use**](https://github.com/veactjs/veact-use) Veact hooks.
- [**surmon.admin**](https://github.com/surmon-china/surmon.admin) A CMS admin client for [surmon.me](https://github.com/surmon-china/surmon.me) blog.
- ...

#### API & examples

- [Veact](#veact)
      - [Why Veact?](#why-veact)
      - [Who is using this library 🔥](#who-is-using-this-library-)
      - [API \& examples](#api--examples)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Lifecycle](#lifecycle)
    - [Ref](#ref)
    - [ShallowRef](#shallowref)
    - [Reactive](#reactive)
    - [Computed](#computed)
    - [Watch](#watch)
    - [EffectScope](#effectscope)
    - [Reactivity](#reactivity)
  - [S](#s)
  - [API](#api)
  - [Development](#development)
  - [Changelog](#changelog)
  - [License](#license)

## Installation

```bash
# using npm
npm install veact --save

# using yarn
yarn add veact

# using pnpm
pnpm add veact
```

## Usage

### Lifecycle

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

### Ref

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
      <p>{count.value}</p>
      <button onClick={increment}>increment</button>
    </div>
  )
}
```

### ShallowRef

```tsx
import React from 'react'
import { useShallowRef } from 'veact'

export const Component: React.FC = () => {
  const numbers = useShallowRef([1, 2, 3])
  const resetNumbers = () => {
    numbers.value = []
  }

  return (
    <div>
      <p>{numbers.value.length}</p>
      <button onClick={resetNumbers}>resetNumbers</button>
    </div>
  )
}
```

### Reactive

```tsx
import React from 'react'
import { useReactive } from 'veact'

export const Component: React.FC = () => {
  const data = useReactive({
    count: 10,
    nested: { count: 1 },
  })

  const incrementCount = () => {
    data.count++
  }

  const incrementNestedCount = () => {
    data.nested.count++
  }

  return (
    <div>
      <p>{data.count}</p>
      <p>{data.nested.count}</p>
      <button onClick={incrementCount}>incrementCount</button>
      <button onClick={incrementNestedCount}>incrementNestedCount</button>
    </div>
  )
}
```

### Computed

```tsx
import React from 'react'
import { useReactive, useComputed } from 'veact'

export const Component: React.FC = () => {
  const data = useReactive({
    year: 3,
    count: 4,
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

### Watch

```tsx
import React from 'react'
import { useReactive, useWatch } from 'veact'

export const Component: React.FC = () => {
  const data = useReactive({
    count: 0,
  })

  const incrementCount = () => {
    data.count++
  }

  useWatch(data, (newData) => {
    console.log('data changed', newData)
  })

  useWatch(
    () => data.count,
    (newCount) => {
      console.log('count changed', newCount)
    },
  )

  return (
    <div>
      <span>{data.count}</span>
      <button onClick={incrementCount}>incrementCount</button>
    </div>
  )
}
```

### EffectScope

```tsx
import React from 'react'
import { watch, useRef, useEffectScope, onScopeDispose } from 'veact'

export const Component: React.FC = () => {
  const scope = useEffectScope()
  const counter = useRef(0)

  const incrementCounter = () => {
    counter.value++
  }

  scope.run(() => {
    const doubled = computed(() => counter.value * 2)
    watch(doubled, (newValue) => console.log(newValue))
    watchEffect(() => console.log('doubled: ', doubled.value))
    onScopeDispose(() => console.log('effect scope is stopped'))
  })

  return (
    <div>
      <span>{counter.value}</span>
      <button onClick={incrementCounter}>incrementCounter</button>
      <button onClick={() => scope.pause()}>pause Scope</button>
      <button onClick={() => scope.resume()}>resume Scope</button>
      <button onClick={() => scope.stop()}>stop Scope</button>
    </div>
  )
}
```

### Reactivity

Converts some of the 'raw Vue' data, which is not already wrapped in a hook, into reactive hook data to ensure proper reactivity within the component.

```tsx
import React from 'react'
import { ref, useReactivity } from 'veact'

// ref data without hooks
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
## SetupComponents
```tsx

//define a setupComponent
const Temp = defineSetupComponent({
  setup(p: { prop1: string }) {
    const a = ref(1);
    const data = reactive({
      count: 1,
      add() {
        this.count++;
      },
    });
    return {
      a,
      data,
      p: p.prop1,
    };
  },
  render(ctx) {
    return (
      <div>
        <h1>{ctx.p}</h1>
        <h1>{ctx.data.count}</h1>
        <h2>{ctx.a.value}</h2>
        <Button onClick={() => ctx.a.value++}>测试Ref</Button>
        <Button type="primary" onClick={() => ctx.data.add()}>
          测试按钮
        </Button>
      </div>
    );
  },
});
```
## API

All APIs listed here are implemented and provided by Veact. For additional exported types, please refer to [`index.ts`](/src/index.ts).

Veact also re-exports all APIs from [`@vue/reactivity`](https://github.com/vuejs/core/blob/main/packages/reactivity/src/index.ts).

| Veact API            | Corresponding Capability                                                                           | Description                                                                                                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onMounted`          | React [`componentDidMount()`](https://react.dev/reference/react/Component#componentdidmount)       | The function is called right after the component is mounted.                                                                                                                                      |
| `onUpdated`          | React [`componentDidUpdate()`](https://react.dev/reference/react/Component#componentdidupdate)     | The function is called immediately after the component is re-rendered with updated props or state. (This method is not invoked during the initial render.)                                        |
| `onBeforeUnmount`    | React [`componentWillUnmount()`](https://react.dev/reference/react/Component#componentwillunmount) | The function is called right before the component is unmounted.                                                                                                                                   |
| `useRef`             | Vue [`ref()`](https://vuejs.org/api/reactivity-core.html#ref)                                      | Takes an inner value and returns a reactive and mutable ref object, which has a single property `.value` that points to the inner value.                                                          |
| `useShallowRef`      | Vue [`shallowRef()`](https://vuejs.org/api/reactivity-advanced.html#shallowref)                    | Shallow version of `useRef()`.                                                                                                                                                                    |
| `useCustomRef`       | Vue [`customRef()`](https://vuejs.org/api/reactivity-advanced.html#customref)                      | Creates a customized ref with explicit control over its dependency tracking and updates triggering.                                                                                               |
| `useReactive`        | Vue [`reactive()`](https://vuejs.org/api/reactivity-core.html#reactive)                            | Returns a reactive proxy of the object.                                                                                                                                                           |
| `useShallowReactive` | Vue [`shallowReactive()`](https://vuejs.org/api/reactivity-advanced.html#shallowreactive)          | Shallow version of `useReactive()`.                                                                                                                                                               |
| `useReadonly`        | Vue [`readonly()`](https://vuejs.org/api/reactivity-core.html#readonly)                            | Takes an object (reactive or plain) or a ref and returns a readonly proxy to the original.                                                                                                        |
| `useShallowReadonly` | Vue [`shallowReadonly()`](https://vuejs.org/api/reactivity-advanced.html#shallowreadonly)          | Shallow version of `useReadonly()`.                                                                                                                                                               |
| `useComputed`        | Vue [`computed()`](https://vuejs.org/api/reactivity-core.html#computed)                            | Takes a getter function and returns a readonly reactive ref object for the returned value from the getter. It can also take an object with get and set functions to create a writable ref object. |
| `watch`              | Vue [`watch()`](https://vuejs.org/api/reactivity-core.html#watch)                                  | Watches one or more reactive data sources and invokes a callback function when the sources change. Unlike Vue (3.5.0), it does not support the `option.flush`.                                    |
| `useWatch`           | Vue [`watch()`](https://vuejs.org/api/reactivity-core.html#watch)                                  | Same as above, this is the hook implementation of `watch()`.                                                                                                                                      |
| `watchEffect`        | Vue [`watchEffect()`](https://vuejs.org/api/reactivity-core.html#watcheffect)                      | Runs a function immediately while reactively tracking its dependencies and re-runs it whenever the dependencies are changed. Unlike Vue (3.5.0), it does not support the `option.flush`.          |
| `useWatchEffect`     | Vue [`watchEffect()`](https://vuejs.org/api/reactivity-core.html#watcheffect)                      | Same as above, this is the hook implementation of `watchEffect()`.                                                                                                                                |
| `useEffectScope`     | Vue [`effectScope()`](https://vuejs.org/api/reactivity-advanced.html#effectscope)                  | Unlike `effectScope` in Vue, `useEffectScope().run()` will only execute once within the component and cannot contain any other hooks.                                                             |
| `useReactivity`      | Internal implementation in Veact                                                                   | Converts some of the 'raw Vue' data, which is not already wrapped in a hook, into reactive hook data to ensure proper reactivity within the component.                                            |

## Development

```bash
# install dependencies
pnpm install

# dev
pnpm run dev

# lint
pnpm run lint

# test
pnpm run test

# build
pnpm run build
```

## Changelog

Detailed changes for each release are documented in the [release notes](/CHANGELOG.md).

## License

Licensed under the [MIT](/LICENSE) License.
