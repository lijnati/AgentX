import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['packages/**/src/**/*.{test,spec}.ts', 'apps/**/src/**/*.{test,spec}.ts'],
    alias: {
      '@agentx/domain': path.resolve(__dirname, './packages/domain/src'),
      '@agentx/validation': path.resolve(__dirname, './packages/validation/src'),
      '@agentx/blockchain': path.resolve(__dirname, './packages/blockchain/src'),
      '@agentx/agents': path.resolve(__dirname, './packages/agents/src'),
      '@agentx/db': path.resolve(__dirname, './packages/db/src'),
      '@agentx/ui': path.resolve(__dirname, './packages/ui/src'),
    },
  },
});
