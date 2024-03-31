module.exports = {
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'standard',
    'react-app',
    'prettier',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off'
      }
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'import/no-duplicates': 'off'
      }
    },
    // {
    //   files: ['**/*.stories.tsx'],
    //   extends: ['plugin:storybook/recommended']
    // }
  ],
  ignorePatterns: ['build/*.js'],
  rules: {
    // 'prettier/prettier': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': [
    //   'warn',
    //   {
    //     allowHigherOrderFunctions: true,
    //     allowTypedFunctionExpressions: true
    //   }
    // ],
    '@typescript-eslint/member-delimiter-style': [
      'warn',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true
        }
      }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public', overrides: { constructors: 'off' } }
    ],
    'import/no-unresolved': 'off',
    'no-var': 'error',
    'prefer-const': 'warn',
    'prefer-template': 'warn',
    curly: 'warn',
    'node/no-unsupported-features/es-syntax': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};