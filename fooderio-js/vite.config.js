// vite.config.js
import { defineConfig } from 'vite';
import react       from '@vitejs/plugin-react';

export default defineConfig({
  define: {
    'import.meta.env': {
      VITE_SUPABASE_URL: '"https://roqikwfaenwqipdydhwv.supabase.co:"',
      VITE_SUPABASE_ANON_KEY: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvcWlrd2ZhZW53cWlwZHlkaHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MTYxMzksImV4cCI6MjA2ODE5MjEzOX0.CpUCA3X4bNIjOCtxrdOZ2kciXEHEogukBie9IOlHpno"',
    },
  },
});