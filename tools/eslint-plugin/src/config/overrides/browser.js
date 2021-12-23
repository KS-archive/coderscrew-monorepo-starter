/**
 * @type {import('eslint').Linter.ConfigOverride}
 */
module.exports = {
  files: ['apps/client/**', 'apps/website/**'],
  env: { browser: true },
};
