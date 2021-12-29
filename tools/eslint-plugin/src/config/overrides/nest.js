/**
 * @type {import('eslint').Linter.ConfigOverride}
 */
module.exports = {
  files: ['apps/server/**'],
  extends: ['plugin:storybook/recommended'],
  rules: {
    // In NestJS many kinds of classes contain methods that doesn't use `this` keyword (e.g. controllers, guards).
    'class-methods-use-this': 0,
  },
};
