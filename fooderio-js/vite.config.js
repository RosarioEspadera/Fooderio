// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Supabase credentials are injected for GitHub Pages build-time usage.
// Ensure these match your actual project keys before deploying.
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env': {
      VITE_SUPABASE_URL: JSON.stringify('https://roqikwfaenwqipdydhwv.supabase.co'),
      VITE_SUPABASE_ANON_KEY: JSON.stringify(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvcWlrd2ZhZW53cWlwZHlkaHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MTYxMzksImV4cCI6MjA2ODE5MjEzOX0.CpUCA3X4bNIjOCtxrdOZ2kciXEHEogukBie9IOlHpno'
      ),
    },
  },
});
