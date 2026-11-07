import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import security from 'eslint-plugin-security';
import noUnsanitized from 'eslint-plugin-no-unsanitized';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      'coverage',
      'playwright-report/',
      'test-results/',
    ],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      security,
      'no-unsanitized': noUnsanitized,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...security.configs.recommended.rules,

      'no-unsanitized/method': 'error',
      'no-unsanitized/property': 'error',

      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // TypeScript interfaces provide compile-time props validation.
      'react/prop-types': 'off',
    },
  },
  {
    files: ['src/Components/ui/**/*.{ts,tsx}'],
    rules: {
      // These adapter modules intentionally export component primitives,
      // aliases, and hooks from the same file.
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['*.config.{js,mjs,ts}', 'tests/**/*.{ts,tsx}'],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },
  eslintConfigPrettier,
);
