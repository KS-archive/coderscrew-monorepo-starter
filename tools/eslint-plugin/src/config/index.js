const path = require('path');
const { workspacesUtils } = require('@ccms/node');

const tsConfigProjects = [
  ...workspacesUtils.getEslintTsConfigPaths(),
  path.resolve(process.cwd(), 'tsconfig.eslint.json'),
];

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: tsConfigProjects,
    tsconfigRootDir: process.cwd(),
  },
  plugins: ['simple-import-sort', 'unicorn', '@emotion', '@ccms'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended', // this config should be at the end as it overwrites other ones
  ],
  settings: {
    react: { version: require('../../package.json').devDependencies.react },
    'import/resolver': {
      typescript: { project: tsConfigProjects },
    },
  },
  rules: require('./rules'),
  overrides: require('./overrides'),
  ignorePatterns: require('./ignore-patterns'),
};
