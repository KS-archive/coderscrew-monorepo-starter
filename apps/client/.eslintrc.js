const { createPackageEslintConfig } = require('@ccms/node');

module.exports = createPackageEslintConfig({ dir: __dirname })({
  env: { browser: true },
  overrides: [
    {
      files: ['vite.config.ts'],
      rules: {
        'import/no-default-export': 0,
      },
    },
  ],
  ignorePatterns: ['public/mockServiceWorker.js'],
});
