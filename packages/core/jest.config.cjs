/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': ['babel-jest']
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: ['./test/setup.ts'],
  collectCoverage: false,
  collectCoverageFrom: ["./src/**/*.{ts,tsx}", "!./src/**/*.stories.tsx", "!./src/**/stories/**"],
  coverageReporters: ["clover", "json", "lcov", "text-summary"]
};
