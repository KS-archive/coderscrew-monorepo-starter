/**
 * @type {import('eslint').Linter.ConfigOverride}
 */
module.exports = {
  files: ['**/*.ts', '**/*.tsx'],
  extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
  rules: {
    // No need for this rule in type-safe environment.
    'unicorn/no-array-callback-reference': 0,
  },
};
