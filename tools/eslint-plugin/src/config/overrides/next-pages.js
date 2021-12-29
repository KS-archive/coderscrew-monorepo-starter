/**
 * @type {import('eslint').Linter.ConfigOverride}
 */
module.exports = {
  files: ['apps/website/pages/**'],
  rules: {
    'import/no-default-export': 0,
  },
};
