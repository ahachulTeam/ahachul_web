module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  plugins: ['unused-imports', 'compat', '@nx'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:compat/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'compat/compat': 'error',
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'prefer-const': 'off',
    'no-async-promise-executor': 'off',
    'no-prototype-builtins': 'off',
    'unused-imports/no-unused-imports': 'error',
    // emotion css props
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  },
  overrides: [
    {
      files: ['services/**/*.{js,jsx,ts,tsx}', 'packages/**/*.{js,jsx,ts,tsx}'],
      rules: {
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: false,
            depConstraints: [
              {
                sourceTag: 'type:app',
                onlyDependOnLibsWithTags: ['type:shared', 'type:tooling'],
              },
              {
                sourceTag: 'type:shared',
                onlyDependOnLibsWithTags: ['type:shared', 'type:tooling'],
              },
              {
                sourceTag: 'type:tooling',
                onlyDependOnLibsWithTags: ['type:tooling'],
              },
            ],
          },
        ],
      },
    },
    {
      files: ['services/**/*.{js,jsx,ts,tsx}', 'packages/**/*.{js,jsx,ts,tsx}'],
      excludedFiles: ['packages/utils/src/date.ts', 'packages/utils/src/number.ts'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'date-fns',
                message:
                  'Use formatDisplayDate from @ahhachul/utils as the single date entrypoint.',
              },
              {
                name: 'date-fns/locale',
                message:
                  'Use formatDisplayDate from @ahhachul/utils as the single date entrypoint.',
              },
            ],
            patterns: [
              {
                group: ['date-fns/*'],
                message:
                  'Use formatDisplayDate from @ahhachul/utils as the single date entrypoint.',
              },
            ],
          },
        ],
        'no-restricted-syntax': [
          'error',
          {
            selector: "CallExpression[callee.property.name='toLocaleDateString']",
            message:
              'Use formatDisplayDate from @ahhachul/utils instead of direct locale formatting.',
          },
          {
            selector: "CallExpression[callee.property.name='toLocaleTimeString']",
            message:
              'Use formatDisplayDate from @ahhachul/utils instead of direct locale formatting.',
          },
          {
            selector: "CallExpression[callee.property.name='toLocaleString']",
            message:
              'Use shared display formatters from @ahhachul/utils (formatDisplayDate / formatDisplayNumber / formatDisplayPrice).',
          },
          {
            selector:
              "NewExpression[callee.object.name='Intl'][callee.property.name='DateTimeFormat']",
            message:
              'Use formatDisplayDate from @ahhachul/utils instead of direct Intl.DateTimeFormat.',
          },
          {
            selector:
              "NewExpression[callee.object.name='Intl'][callee.property.name='NumberFormat']",
            message:
              'Use formatDisplayNumber or formatDisplayPrice from @ahhachul/utils instead of direct Intl.NumberFormat.',
          },
          {
            selector:
              'CallExpression[callee.name=/^(fetch|fetchClient|request)$/] > Literal.arguments:first-child',
            message:
              'Do not hardcode API endpoint literals in network calls. Use shared API contracts (`API_PATHS` / `INTERNAL_API_PATHS`).',
          },
          {
            selector:
              'CallExpression[callee.object.name=/^(axios|axiosInstance)$/][callee.property.name=/^(get|post|put|patch|delete)$/] > Literal.arguments:first-child',
            message:
              'Do not hardcode API endpoint literals in axios calls. Use shared API contracts (`API_PATHS` / `INTERNAL_API_PATHS`).',
          },
          {
            selector:
              "JSXAttribute[name.name='className'] Literal[value=/\\[[^\\]]*#[0-9A-Fa-f]{3,8}[^\\]]*\\]/]",
            message:
              'Use shared semantic tokens from @ahhachul/design-system instead of Tailwind arbitrary hex values.',
          },
        ],
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
  ignorePatterns: ['node_modules', 'dist', 'build', 'out', 'coverage'],
};
