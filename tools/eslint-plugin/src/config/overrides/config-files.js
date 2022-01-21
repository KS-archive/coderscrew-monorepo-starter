/**
 * @type {import('eslint').Linter.ConfigOverride}
 */
module.exports = {
  files: ['**/tsup.config.ts', '**/jest.config.ts'],
  rules: {
    'import/no-default-export': 0,
    'import/prefer-default-export': 2,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
  },
};
