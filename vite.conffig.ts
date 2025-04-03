import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["chart.js"], // This prevents build failure
    },
    alias: {
      "chart.js": "chart.js/auto"
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
})
