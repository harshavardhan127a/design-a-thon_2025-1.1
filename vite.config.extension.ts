import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './public/manifest.json';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/extension/popup.tsx'),
        background: resolve(__dirname, 'src/extension/background.ts'),
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
    outDir: 'dist-extension',
  },
});