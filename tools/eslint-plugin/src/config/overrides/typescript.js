const tests = require('./tests');

/**
 * @type {import('eslint').Linter.ConfigOverride}
 */
module.exports = {
  files: ['**/*.ts', '**/*.tsx'],
  extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
  rules: {
    // No need for this rule in type-safe environment.
    'unicorn/no-array-callback-reference': 0,

    // We want to mark all functions that returns promise as async.
    '@typescript-eslint/require-await': 0,
  },
  overrides: [
    {
      files: tests.files,
      rules: {
        '@typescript-eslint/no-unsafe-member-access': 0,
      },
    },
  ],
};
