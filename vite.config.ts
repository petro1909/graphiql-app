/* eslint-disable */
/// <reference types='vitest'/>
/// <reference types='vite/client'/>
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
/* eslint-enable */

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@app_types': path.resolve(__dirname, './src/types'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@validation': path.resolve(__dirname, './src/validation'),
      '@localization': path.resolve(__dirname, './src/localization'),
      '@lang': path.resolve(__dirname, './lang'),
      '@service': path.resolve(__dirname, './src/service'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@database': path.resolve(__dirname, './src/database'),
      '@icons': path.resolve(__dirname, './src/assets/icons'),
      '@test': path.resolve(__dirname, './test'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setupTests.ts'],
    coverage: {
      provider: 'v8',
      all: true,
      reporter: 'text',
      include: ['src/*'],
      exclude: ['src/types/*', 'src/constants/*', 'src/main.tsx', 'src/vite-env.d.ts'],
    },
  },
});
