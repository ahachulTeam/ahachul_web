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
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
  ignorePatterns: ['node_modules', 'dist', 'build', 'out', 'coverage'],
};
