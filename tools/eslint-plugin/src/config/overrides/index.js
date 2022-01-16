/**
 * @type {import('eslint').Linter.ConfigOverride[]}
 */
module.exports = [
  require('./tests'),
  require('./components'),
  require('./commonjs'),
  require('./config-files'),
  require('./typescript'),
];
