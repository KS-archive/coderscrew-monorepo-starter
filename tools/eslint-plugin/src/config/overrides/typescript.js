/**
 * @type {import('eslint').Linter.ConfigOverride}
 */
module.exports = {
  files: ['**/*.ts', '**/*.tsx'],
  extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
};
