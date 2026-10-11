import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/react-dialog/',
  plugins: [react()],
  resolve: {
    alias: {
      '@denkschuldt/react-dialog': fileURLToPath(new URL('../src/index.js', import.meta.url)),
    },
    dedupe: ['react', 'react-dom'],
  },
});
