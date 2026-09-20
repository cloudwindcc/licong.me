import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  publicDir: isSsrBuild ? false : 'public',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
}));
