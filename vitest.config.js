import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts', 'src/**/*.spec.tsx', '*/src/**/*.spec.ts', '*/src/**/*.spec.tsx'],
    coverage: {
      enabled: false,
      reporter: ['cobertura'],
    },
    environment: 'jsdom',
  },
});
