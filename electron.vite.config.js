import { resolve, join, dirname } from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { createRequire } from 'node:module'
import { viteStaticCopy } from 'vite-plugin-static-copy'
const require = createRequire(import.meta.url)
const cMapsDir = join(dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps')

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: cMapsDir,
            dest: ''
          }
        ]
      })
    ]
  }
})
