/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: { provider: 'v8' },
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true,
    css: true,
  },
  define: {
    'import.meta.env.SSR': false,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: new URL('./src', import.meta.url).pathname,
      },
      {
        find: '@test',
        replacement: new URL('./test', import.meta.url).pathname,
      },
      {
        find: 'astro:transitions/client',
        replacement: new URL('./test/mocks/astro-transitions.ts', import.meta.url).pathname,
      },
    ],
  },
}) 