import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Raise warning threshold — Three.js is inherently large
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          // ── Icons ───────────────────────────────────────────────────────────
          if (id.includes('lucide-react')) return 'vendor-icons';

          // ── Charts ──────────────────────────────────────────────────────────
          if (id.includes('recharts') || id.includes('d3-')) return 'vendor-charts';

          // ── Supabase ────────────────────────────────────────────────────────
          if (id.includes('@supabase')) return 'vendor-supabase';

          // ── Three.js core (largest — isolate for long-term caching) ─────────
          if (id.includes('/three/') || id.includes('\\three\\')) return 'vendor-three';

          // ── React Three Fiber + Drei ─────────────────────────────────────────
          if (
            id.includes('@react-three/fiber') ||
            id.includes('@react-three/drei') ||
            id.includes('troika-') ||
            id.includes('meshline') ||
            id.includes('maath') ||
            id.includes('camera-controls') ||
            id.includes('three-stdlib') ||
            id.includes('@monogrid')
          ) return 'vendor-r3f';

          // ── Postprocessing ───────────────────────────────────────────────────
          if (
            id.includes('@react-three/postprocessing') ||
            id.includes('postprocessing') ||
            id.includes('n8ao')
          ) return 'vendor-postprocessing';

          // ── Framer Motion ────────────────────────────────────────────────────
          if (id.includes('framer-motion')) return 'vendor-motion';

          // ── React core ───────────────────────────────────────────────────────
          if (
            id.includes('react-dom') ||
            id.includes('react-router-dom') ||
            id.includes('react-helmet-async') ||
            id.includes('react-is') ||
            id.includes('/react/') ||
            id.includes('\\react\\')
          ) return 'vendor-react';
        },
      },
    },
  },
});

