/// <reference types='vitest'/>
/// <reference types='vite/client'/>
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setupTests.ts'],
    coverage: {
      provider: 'v8',
      all: true,
      reporter: 'text',
    },
  },
});
