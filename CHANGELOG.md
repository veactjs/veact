# Changelog

All notable changes to this project will be documented in this file.

### v1.0.0-beta.1 (2024-08-12)

#### Added

- Introduced `useEffectScope` API.
- Introduced `useCustomRef` API.
- Introduced `useReadonly` and `useShallowReadonly` APIs.
- Added JSDoc comments for all functions.
- Added API documentation to `README.md`.
- Added development mode.

#### Changed

- Refactored `watch`, `useWatch`, `watchEffect`, and `useWatchEffect` APIs.
- Replaced `yarn` with `pnpm`.
- Replaced `jest` with `vitest`.
- Replaced `libundler` with `vite` as the bundler.
- Upgraded `React` and `react-dom` peerDependencies versions.
- Upgraded ESLint to v9.
- Updated unit test scripts.

#### Removed

- Removed `batchedUpdates` API.

#### Fixed

- Fixed Issue [#6](https://github.com/veactjs/veact/issues/6).
- Fixed Issue [#4](https://github.com/veactjs/veact/issues/4).

### v0.1.4 (2022-01-17)

- upgrade reactivity deps
- upgrade `libundler`

### v0.1.3 (2021-08-02)

- upgrade reactivity deps
- update document links with reactivity

### v0.1.2 (2021-07-27)

- fix `peerDependencies` React version

### v0.1.0 (2021-07-27)

- fix types

### v0.1.0 (2021-07-26)

- lifecycle API
- hooks API
- watch API
- support SSR
