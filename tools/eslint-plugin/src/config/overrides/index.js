/**
 * @type {import('eslint').Linter.ConfigOverride[]}
 */
module.exports = [
  require('./tests'),
  require('./browser'),
  require('./components'),
  require('./commonjs'),
  require('./config-files'),
  require('./typescript'),
  require('./stories'),
  require('./next-pages'),
  require('./nest'),
];
