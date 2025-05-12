import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://rvr-builders.onrender.com',
        changeOrigin: true,
        secure: false
      }
    },
    resolve: {
      alias: {
        '@': '/src', // This ensures that '@' resolves to the /src directory
      },
    },
  }
});
