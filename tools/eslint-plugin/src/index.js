/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  rules: require('./plugin'),
  configs: {
    recommended: require('./config'),
  },
};
