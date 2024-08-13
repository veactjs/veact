import viteDts from 'vite-plugin-dts'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

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
        // TODO:!
        // banner: '/* my-library version ' + '@111' + ' */',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@vue/reactivity': 'VueReactivity',
        },
      },
    },
  },
})
