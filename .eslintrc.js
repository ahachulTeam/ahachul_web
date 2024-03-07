module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'unused-imports', 'prettier'],
  rules: {
    'no-undef': 'off',
    'react/no-unknown-property': 0,
    '@typescript-eslint/no-var-requires': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'react/prop-types':'off',
    semi: ['error', 'always'],
  },
};
