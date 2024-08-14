import viteDts from 'vite-plugin-dts'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import packageJson from './package.json'

const banner = `
/*!
 * ${packageJson.name} v${packageJson.version}
 * ${packageJson.homepage}
 *
 * Includes @vue/reactivity
 * https://github.com/vuejs/core/tree/main/packages/reactivity
 *
 * (c) 2021-present ${packageJson.author} and Veact contributors.
 * Released under the ${packageJson.license} License.
 *
 * Date: ${new Date().toISOString()}
 */
`

export default defineConfig({
  // https://github.com/qmhc/vite-plugin-dts
  plugins: [viteReact(), viteDts({ rollupTypes: true })],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'veact',
      fileName: 'veact',
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@vue/reactivity'],
      output: {
        banner: `\n${banner}\n`,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@vue/reactivity': 'VueReactivity',
        },
      },
    },
  },
})
