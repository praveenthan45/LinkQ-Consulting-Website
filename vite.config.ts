import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: 5173,
      strictPort: true,
      proxy: { '/api': `http://127.0.0.1:${process.env.PORT || env.PORT || 3001}` },
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('motion')) return 'motion';
              if (id.includes('zod') || id.includes('react-hook-form') || id.includes('@hookform')) return 'forms';
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
