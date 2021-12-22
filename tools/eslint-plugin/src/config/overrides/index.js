/**
 * @type {import('eslint').Linter.ConfigOverride[]}
 */
module.exports = [
  require('./tests'),
  require('./browser'),
  require('./server'),
  require('./components'),
  require('./commonjs'),
  require('./default-export'),
];
