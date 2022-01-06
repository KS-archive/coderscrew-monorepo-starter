const path = require('path');
const { workspacesUtils } = require('@ccms/node');

const tsConfigProjects = [...workspacesUtils.getTsConfigPaths(), path.resolve(process.cwd(), 'tsconfig.eslint.json')];

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  rules: require('./rules'),
  configs: {
    recommended: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: tsConfigProjects,
        tsconfigRootDir: process.cwd(),
      },
      plugins: [
        'simple-import-sort',
        'jest',
        'jest-dom',
        'testing-library',
        'jest-formatting',
        'storybook',
        'unicorn',
        '@next/next',
        '@ccms',
      ],
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
        jest: { version: require('../package.json').devDependencies.jest },
        react: { version: require('../package.json').devDependencies.react },
        'import/resolver': {
          typescript: { project: tsConfigProjects },
        },
      },
      rules: require('./config/rules'),
      overrides: require('./config/overrides'),
    },
  },
};
