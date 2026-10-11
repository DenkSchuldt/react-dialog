import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Keep library-only CSS injection and externalization out of the playground.
export default defineConfig({ plugins: [react()] });
