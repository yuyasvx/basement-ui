import typescriptEslint from 'typescript-eslint';
import configPrettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginSort from 'eslint-plugin-sort';

export default [
  pluginImport.flatConfigs.recommended,
  ...typescriptEslint.configs.recommended,
  pluginSort.configs['flat/recommended'],
  {
    rules: {
      'import/no-unresolved': 'off',
      'import/order': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prefer-template': 'warn',
      'sort/object-properties': 'off',
    },
  },
  configPrettier,
];
