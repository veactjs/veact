import { defineConfig } from '@surmon-china/libundler'

export default defineConfig({
  libName: 'veact',
  outFileName: 'veact',
  entry: './src/index.ts',
  outDir: './dist',
  external: ['react', 'react-dom', '@vue/reactivity'],
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    '@vue/reactivity': 'VueReactivity',
  },
})
