const path = require('path');

const { createPackageEslintConfig } = require('@ccms/node');

module.exports = createPackageEslintConfig({ dir: __dirname })({
  env: { browser: true },
  plugins: ['@next/next'],
  extends: ['plugin:@next/next/core-web-vitals'],
  rules: {
    '@next/next/no-html-link-for-pages': [2, path.join(__dirname, 'pages')],
  },
  overrides: [
    {
      files: ['pages/**'],
      rules: {
        'import/no-default-export': 0,
        'import/prefer-default-export': 2,
      },
    },
  ],
});
