const { createPackageEslintConfig } = require('@ccms/node');

module.exports = createPackageEslintConfig({ dir: __dirname })({
  rules: {
    // In NestJS many kinds of classes contain methods that doesn't use `this` keyword (e.g. controllers, guards).
    'class-methods-use-this': 0,
  },
  overrides: [
    {
      files: ['*.route.ts'],
      rules: {
        // Routes can define many response types as classes.
        'max-classes-per-file': 0,
      },
    },
    {
      files: ['jest-e2e.config.ts', 'mikro-orm.config.ts'],
      rules: {
        'import/no-default-export': 0,
      },
    },
  ],
  ignorePatterns: ['migrations'],
});
