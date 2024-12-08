import typescriptEslint from 'typescript-eslint';
import configPrettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';

export default [
  pluginImport.flatConfigs.recommended,
  ...typescriptEslint.configs.recommended,
  {
    rules: {
      'sort-imports': ['warn', { ignoreCase: true, ignoreDeclarationSort: true }],
      'import/no-unresolved': 'off',
      'import/order': [
        'warn',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  configPrettier,
];
