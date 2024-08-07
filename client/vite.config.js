import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Remove or comment out the proxy configuration for production
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5100/api',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});
