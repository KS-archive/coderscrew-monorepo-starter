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
  overrides: [
    {
      files: ['apps/server/**/*.route.ts'],
      rules: {
        // Routes can define many response types as classes.
        'max-classes-per-file': 0,
      },
    },
  ],
};
