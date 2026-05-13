import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: './src/demo',
  base: './',
  build: {
    outDir: '../../dist/demo',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/demo/index.html')
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'vendor-three';
            if (id.includes('video.js')) return 'vendor-videojs';
            return 'vendor';
          }
        }
      }
    }
  },
  server: {
    port: 3001
  }
});
