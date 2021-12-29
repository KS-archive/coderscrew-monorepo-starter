/**
 * @type {import('eslint').Linter.ConfigOverride}
 */
module.exports = {
  files: ['apps/website/**'],
  extends: ['plugin:@next/next/core-web-vitals'],
  settings: {
    next: {
      rootDir: 'apps/website/',
    },
  },
  overrides: [
    {
      files: ['apps/website/pages/**'],
      rules: {
        'import/no-default-export': 0,
        'import/prefer-default-export': 2,
      },
    },
  ],
};
