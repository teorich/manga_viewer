// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/books': {
        target: 'http://52.195.171.228:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/books/, '/books'), // Optional: rewrite path if needed
      },
      '/chapters': {
        target: 'http://52.195.171.228:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/chapters/, '/chapters'), // Optional: rewrite path if needed
      },
    },
  },
});
