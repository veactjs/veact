import viteDts from 'vite-plugin-dts'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import packageJson from './package.json'

const bannerItems = [
  `${packageJson.name} v${packageJson.version}`,
  `Copyright (c) ${packageJson.author}. All rights reserved.`,
  `Released under the ${packageJson.license} License.`,
  `${packageJson.author} <${packageJson.homepage}>`,
]

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
        banner: [`/*!`, ...bannerItems.map((item) => `* ${item}`), `*/`].join('\n'),
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@vue/reactivity': 'VueReactivity',
        },
      },
    },
  },
})
