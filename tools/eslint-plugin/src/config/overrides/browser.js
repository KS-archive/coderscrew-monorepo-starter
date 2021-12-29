/**
 * @type {import('eslint').Linter.ConfigOverride}
 */
module.exports = {
  files: ['apps/client/**', 'apps/website/**', 'packages/ui/**'],
  env: { browser: true },
};
