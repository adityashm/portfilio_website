import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfilio_website/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
