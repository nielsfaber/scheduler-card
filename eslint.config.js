// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    rules: {
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      'no-unsafe-optional-chaining': 'off',
      'no-prototype-builtins': 'off',
      'no-case-declarations': 'off',
      'no-useless-escape': 'off',
      'no-empty': 'off',
      'no-duplicate-case': 'off',
      'lit/no-native-attributes': 'off',
      'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': false }],
      // Disable prettier conflicts
      'prettier/prettier': 'off',
      // Prevent unnecessary import path modifications
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      // Disable rules that might auto-fix import paths
      'node/file-extension-in-import': 'off',
      'import/prefer-default-export': 'off',
      // Preserve original import extensions - don't auto-remove .js
      'import/no-useless-path-segments': 'off',
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        experimentalDecorators: true,
      },
    },
  }
);
