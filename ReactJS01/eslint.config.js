import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      react.configs.recommended,        // giống plugin:react/recommended
      react.configs['jsx-runtime'],     // giống plugin:react/jsx-runtime
      reactHooks.configs.recommended,   // giống plugin:react-hooks/recommended
      reactRefresh.configs.vite,        // giống plugin:react-refresh
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: '18.2' }, // thay cho settings trong .eslintrc
    },
    rules: {
      'react/jsx-no-target-blank': 'off',
      'no-unused-vars': 'off',
      'no-debugger': 'off',
      'react/prop-types': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
])