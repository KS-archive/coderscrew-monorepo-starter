/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: { browser: true },
  overrides: [
    {
      files: ['vite.config.ts'],
      rules: {
        'import/no-default-export': 0,
      },
    },
  ],
};
