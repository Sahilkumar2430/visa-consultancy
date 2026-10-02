import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/restcountries': {
        target: 'https://restcountries.com/v3.1',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/restcountries/, ''),
        secure: true,
      },
    },
  },
});