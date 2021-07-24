# Veact

![vue](https://img.shields.io/badge/MADE%20WITH-VEACT-42a97a?style=for-the-badge&labelColor=35495d)
[![GitHub stars](https://img.shields.io/github/stars/veactjs/veact.svg?style=for-the-badge)](https://github.com/veactjs/veact/stargazers)
[![GitHub issues](https://img.shields.io/github/issues-raw/veactjs/veact.svg?style=for-the-badge)](https://github.com/veactjs/veact/issues)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/veactjs/veact/Deploy?label=deploy&style=for-the-badge)](https://github.com/veactjs/veact/actions?query=workflow:%22Deploy%22)
[![GitHub license](https://img.shields.io/github/license/veactjs/veact.svg?style=for-the-badge)](https://github.com/veactjs/veact/blob/master/LICENSE)

> Mutable state enhancer library for [React](https://github.com/facebook/react) by [`@vuejs/reactivity`](https://github.com/vuejs/vue-next).

> 适用于 [React](https://github.com/facebook/react) 的可变式状态管理库，基于 [`@vuejs/reactivity`](https://github.com/vuejs/vue-next) 进行开发。

**🔥 Who is using this library**

Already used in production for these project :

- **[veact-admin](https://github.com/surmon-china/veact-admin)** Blog admin | 博客管理后台
- ...

---

### Installation

```bash
npm install veact react react-dom --save

# or
yarn add veact react react-dom
```

### Usage

**Lifecycle**

```tsx
import { onMounted, onBeforeUnmount, onUpdated } from "veact";

export const component = () => {
  onMounted(() => {
    console.log("component mounted");
  });

  onUpdated(() => {
    console.log("component updated");
  });

  onBeforeUnmount(() => {
    console.log("component will unmount");
  });

  return <div>component</div>;
};
```

**Base**

```tsx
import { useRef } from "veact";

export const component = () => {
  const count = useRef(0);
  const increment = () => {
    count.value++;
  };

  return (
    <div>
      <span>{count.value}</span>
      <Button onClick={increment}>increment</Button>
    </div>
  );
};
```

**Reactivity**

transform any object to reactivity.

```tsx
import { ref, useReactivity } from "veact";

const _count = useRef(0);

export const component = () => {
  const count = useReactivity(() => _count);
  const increment = () => {
    data.value++;
  };

  return (
    <div>
      <span>{count.value}</span>
      <Button onClick={increment}>increment</Button>
    </div>
  );
};
```

**Watch**

```tsx
import { useReactive, useWatch } from "veact";

export const component = () => {
  const data = useReactive({
    count: 0,
  });
  const increment = () => {
    data.count++;
  };

  useWatch(data, (newData) => {
    console.log("data changed", newData);
  });

  useWatch(
    () => data.count,
    (newCount) => {
      console.log("count changed", newCount);
    }
  );

  return (
    <div>
      <span>{data.count}</span>
      <Button onClick={increment}>increment</Button>
    </div>
  );
};
```

**Computed**

```tsx
import { useReactive, useComputed } from "veact";

export const component = () => {
  const data = useReactive({
    count: 4,
    year: 3,
  });
  const total = useComputed(() => {
    return data.count * data.year;
  });

  const incrementCount = () => {
    data.count++;
  };

  return (
    <div>
      <span>{total.value}</span>
      <Button onClick={incrementCount}>incrementCount</Button>
    </div>
  );
};
```

**Enhancer**

```tsx
import { useReactive, onMounted, batchedUpdates } from "veact";

export const component = () => {
  const data = useReactive({
    count: 0,
    list: [],
  });
  const fetch = () => {
    fetchData().then((result) => {
      batchedUpdates(() => {
        data.count = result.count;
        data.list = result.list;
      });
    });
  };

  onMounted(() => {
    fetch();
  });

  return <div>{data.count}</div>;
};
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

  // @vue/reactivity API
  // ...
} from "veact";
```

## Development

```bash
# install dependencies
yarn

# serve with hot reload at localhost:4200
yarn dev

# lint
yarn lint

# build
yarn build

# preview
yarn serve
```

### Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/veactjs/veact/blob/master/CHANGELOG.md).

### License

[MIT](https://github.com/veactjs/veact/blob/master/LICENSE)
