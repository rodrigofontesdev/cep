import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      camelcase: 'error',
      'default-case': 'error',
      'default-case-last': 'error',
      'default-param-last': 'warn',
      'dot-notation': 'error',
      eqeqeq: 'error',
      'max-classes-per-file': ['error', 1],
      'new-cap': 'error',
      'no-duplicate-imports': [
        'error',
        {
          includeExports: true,
        },
      ],
      'no-else-return': 'error',
      'no-empty-function': 'warn',
      'no-eq-null': 'error',
      'no-lonely-if': 'error',
      'no-throw-literal': 'error',
      'prefer-const': 'error',
      'prefer-template': 'warn',
      'require-await': 'error',
      'sort-vars': 'warn',
      yoda: 'warn',
    },
  },
)
