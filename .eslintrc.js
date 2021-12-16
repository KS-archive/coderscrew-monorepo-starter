const path = require('path');
const fg = require('fast-glob');

const { packagePrefix, workspaces } = require('./package.json');

const testFiles = ['**/?(*.)+(spec|test).ts?(x)'];
const nodePackages = ['apps/server/**'];
const browserPackages = ['apps/client/**'];
const commonJSFiles = ['*.js', '*.cjs'];
const configFiles = ['.eslintrc.js', '**/vite.config.ts'];
const storybookStories = ['*.stories.tsx'];
const componentFiles = ['*.tsx'];
const devDependencies = [...configFiles, ...storybookStories, 'tools/**'];

const tsConfigProjects = ['tsconfig.eslint.json', ...workspaces.map((workspace) => `${workspace}*/tsconfig.json`)];
const workspacePaths = fg
  .sync(workspaces, { onlyDirectories: true })
  .map((workspace) => path.resolve(__dirname, workspace));
const packageDir = [__dirname, ...workspacePaths];

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: tsConfigProjects,
    tsconfigRootDir: __dirname,
  },
  plugins: ['simple-import-sort', 'jest', 'jest-dom', 'testing-library', 'jest-formatting', '@ccms'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended', // this config should be at the end as it overwrites other ones
  ],
  settings: {
    jest: { version: require('jest/package.json').version },
    react: { version: require('react/package.json').version },
    'import/resolver': {
      typescript: { project: tsConfigProjects },
    },
  },
  rules: {
    // Tracks progress of linting.
    '@ccms/progress': 1,

    // Prevents from writing functions that are too complex (in terms of cyclomatic complexity).
    complexity: [2, 10],

    // Disallow some JS syntax features that are considered anti-patterns.
    'no-restricted-syntax': [2, 'WithStatement', 'LabeledStatement'],

    // Automatically sorts exports to ensure their consistency.
    'simple-import-sort/exports': 2,

    // Automatically sorts imports to ensure their consistency.
    'simple-import-sort/imports': [
      2,
      {
        groups: [
          ['^\\u0000'], // Side effects.
          ['^react', `^(?!${packagePrefix}.*$)@?\\w`], // Packages from node_modules. React-related packages first.
          [`^${packagePrefix}.`], // Monorepo packages.
          ['^[^.]'], // Absolute imports.
          ['^\\.'], // Relative imports.
        ],
      },
    ],

    // Enforces naming conventions across the codebase.
    '@typescript-eslint/naming-convention': [
      2,
      { selector: 'default', leadingUnderscore: 'allow', format: ['camelCase', 'UPPER_CASE', 'PascalCase'] },
      { selector: 'function', format: ['camelCase', 'PascalCase'] },
      { selector: 'parameter', format: ['camelCase', 'PascalCase'], leadingUnderscore: 'allow' },
      { selector: 'typeLike', format: ['PascalCase'] },

      // Interfaces shouldn't be prefixed with `I`.
      { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: false } },

      // Types shouldn't be prefixed with `T`.
      { selector: 'typeAlias', format: ['PascalCase'], custom: { regex: '^T[A-Z]', match: false } },

      // Generics should have meaningful names instead of one-letters.
      { selector: 'typeParameter', format: ['PascalCase'], custom: { regex: '[a-zA-Z]{2,}', match: true } },
    ],

    // Customizes new lines locations across the project.
    'padding-line-between-statements': [
      2,
      // Always require blank lines after directive (like 'use-strict'), except between directives
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'any', prev: 'directive', next: 'directive' },

      // Always require blank lines before and after every sequence of variable declarations and export
      { blankLine: 'always', prev: '*', next: ['const', 'let', 'var', 'export'] },
      { blankLine: 'always', prev: ['const', 'let', 'var', 'export'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var', 'export'], next: ['const', 'let', 'var', 'export'] },

      // Always require blank lines before and after class declaration, if, do/while, switch, try
      { blankLine: 'always', prev: '*', next: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'] },
      { blankLine: 'always', prev: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'], next: '*' },

      // Always require blank lines before return statements
      { blankLine: 'always', prev: '*', next: 'return' },
    ],

    // To make imports better searchable we prefer to use named exports.
    'import/prefer-default-export': 0,
    'import/no-default-export': 2,

    // When possible we want TypeScript to infer return types of functions.
    '@typescript-eslint/explicit-module-boundary-types': 0,

    // Additional config to allow dev dependencies in some files.
    'import/no-extraneous-dependencies': [2, { devDependencies, packageDir }],
  },
  overrides: [
    {
      files: testFiles,
      env: { jest: true, node: true },
      extends: [
        'plugin:jest/recommended',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
        'plugin:jest-formatting/recommended',
      ],
    },
    {
      files: nodePackages,
      env: { node: true },
    },
    {
      files: browserPackages,
      env: { browser: true },
    },
    {
      files: commonJSFiles,
      env: { node: true },
      rules: {
        // ESM-related lint rules should be disabled for CommonJS files.
        'global-require': 0,
        '@typescript-eslint/no-var-requires': 0,
      },
    },
    {
      files: configFiles,
      env: { node: true },
      rules: {
        'import/no-default-export': 0,
      },
    },
    {
      files: storybookStories,
      env: { browser: true },
      rules: {
        // Each story requires to export its metadata as the default export.
        'import/no-default-export': 0,
      },
    },
    {
      files: componentFiles,
      rules: {
        // We see no reason to prevent props spreading in react components.
        'react/jsx-props-no-spreading': 0,

        // To be consistent we want to always use arrow function when creating components.
        'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
      },
    },
  ],
};
