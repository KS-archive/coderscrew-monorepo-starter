const { workspacesUtils } = require('@ccms/node');

const workspacePrefix = workspacesUtils.getWorkspacePrefix();
const packageDirectory = [process.cwd(), ...workspacesUtils.getFullPaths()];

module.exports = {
  // Tracks progress of linting.
  '@ccms/progress': 1,

  // Prevents from writing functions that are too complex (in terms of cyclomatic complexity).
  complexity: [2, 10],

  // Disallow some JS syntax features that are considered anti-patterns.
  'no-restricted-syntax': [2, 'WithStatement', 'LabeledStatement'],

  // We use underscore to indicate private class properties and unused function params.
  'no-underscore-dangle': 0,

  // Automatically sorts exports to ensure their consistency.
  'simple-import-sort/exports': 2,

  // Automatically sorts imports to ensure their consistency.
  'simple-import-sort/imports': [
    2,
    {
      groups: [
        ['^\\u0000'], // Side effects.
        ['^react', `^(?!${workspacePrefix}.*$)@?\\w`], // Packages from node_modules. React-related packages first.
        [`^${workspacePrefix}.`], // Monorepo packages.
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
  'import/no-extraneous-dependencies': [2, { packageDir: packageDirectory }],

  // Workspaces transpiled to CommonJS have problems with node protocol in require statements.
  'unicorn/prefer-node-protocol': [0],

  // Customizes abbreviations allowed for variables.
  'unicorn/prevent-abbreviations': [
    2,
    {
      replacements: {
        res: false,
        req: false,
        env: false,
        dev: false,
        obj: false,
        str: false,
        prop: false,
        props: false,
        args: false,
        vars: false,
      },
    },
  ],
};
