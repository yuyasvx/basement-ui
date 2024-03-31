module.exports = {
  env: {
    'jest/globals': true
  },
  plugins: ['jest'],
  extends: ['standard', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:jest/recommended', 'plugin:jest/style', 'prettier', 'plugin:storybook/recommended'],
  overrides: [
    {
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'import/no-duplicates': 'off'
      }
    }
    // {
    //   files: ['**/*.stories.tsx'],
    //   extends: ['plugin:storybook/recommended']
    // }
  ],
  ignorePatterns: ['build/*.js'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
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
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-var': 'error',
    'prefer-const': 'warn',
    'prefer-template': 'warn',
    curly: 'warn',
    'node/no-unsupported-features/es-syntax': 'off',
    // ↓これはTypeScriptコンパイラに任せていいと思うけど
    'no-use-before-define': 'off',
    // ↓不要なルール
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    'jest/consistent-test-it': ['warn', { fn: 'it' }]
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};
