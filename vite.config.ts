import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          vkui: ['@vkontakte/vkui'],
          icons: ['@vkontakte/icons'],
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
