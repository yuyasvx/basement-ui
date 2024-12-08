import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['apps/*/src/**/*.spec.ts', 'apps/*/src/**/*.spec.tsx', 'packages/*/src/**/*.spec.ts', 'packages/*/src/**/*.spec.tsx'],
    coverage: {
      enabled: false,
    },
    environment: 'jsdom',
  },
});
