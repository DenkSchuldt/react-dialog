import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.js', import.meta.url)),
      formats: ['es', 'cjs'],
      fileName: (format) => format === 'es' ? 'index.js' : 'index.cjs',
    },
    rolldownOptions: {
      external: (id) => /^(react|react-dom|react-draggable|prop-types)(\/|$)/.test(id),
      output: { exports: 'named' },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
    include: ['src/**/*.test.{js,jsx}', 'examples/src/**/*.test.{js,jsx}'],
    alias: {
      '@denkschuldt/react-dialog': fileURLToPath(new URL('./src/index.js', import.meta.url)),
    },
  },
});
