/**
 * @type {import('eslint').Linter.ConfigOverride}
 */
module.exports = {
  files: [
    '**/vite.config.ts',
    '**/tsup.config.ts',
    '**/jest.config.ts',
    '**/jest-e2e.config.ts',
    '**/.storybook/*',
    '.eslintrc.js',
  ],
  rules: {
    'import/no-default-export': 0,
    'import/prefer-default-export': 2,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
  },
};
