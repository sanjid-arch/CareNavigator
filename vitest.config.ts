import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    env: {
      DATABASE_URL: 'file:./dev.db',
      AUTH_SECRET: 'test-only-carenavigator-session-signing-secret-key-2026',
      NEXTAUTH_URL: 'http://localhost:3000',
      LOCAL_VAULT_DIR: '.local-vault',
      NODE_ENV: 'test',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
