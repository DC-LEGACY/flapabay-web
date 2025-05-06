import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.scss'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Remove the additionalData import since we're importing in App.tsx
      }
    }
  },
  build: {
    rollupOptions: {
      external: ["chart.js"],
    },
  },
  server: {
    port: 3000,
  },
})
