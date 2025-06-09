import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { ignores: ['dist/**', 'node_modules/**'] },

  // JavaScript files
  {
    files: ['**/*.{js,jsx}'],
    ...js.configs.recommended,
    ...js.configs.recommended,
  },

  // TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/external-module-folders': ['node_modules', 'node_modules/@types'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: [
            './tsconfig.app.json',
            './tsconfig.node.json',
            './tsconfig.aliases.json',
          ],
        },
      },
    },
    rules: {
      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'off',

      // General rules
      'no-console': 'warn', // Import rules
      'import/order': 'off', // Using Prettier import sort instead
      'import/newline-after-import': 'off', // Using Prettier instead
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            'vite.config.ts',
            'vitest.config.ts',
            'jest.config.ts',
            'test/**/*',
            'tests/**/*',
            '**/*.test.ts',
            '**/*.test.tsx',
            '**/*.spec.ts',
            '**/*.spec.tsx',
            '**/*.config.js',
            '**/*.config.ts',
            'src/config/tests/testSetup.ts',
            'src/config/tests/**/*Mock*',
          ],
          includeTypes: true,
          peerDependencies: true,
        },
      ],

      // TypeScript rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/array-type': 'off',

      // Object property rules
      'object-property-newline': [
        'error',
        { allowAllPropertiesOnSameLine: false },
      ],
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true, minProperties: 3 },
          ObjectPattern: { multiline: true },
          ImportDeclaration: 'never',
          ExportDeclaration: { multiline: true, minProperties: 3 },
        },
      ],
    },
  },

  prettier,
]);
