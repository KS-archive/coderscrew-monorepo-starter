/**
 * @type {import('eslint').Linter.ConfigOverride}
 */
module.exports = {
  files: ['apps/server/**'],
  env: { node: true },
  rules: {
    'class-methods-use-this': 0,
  },
};
