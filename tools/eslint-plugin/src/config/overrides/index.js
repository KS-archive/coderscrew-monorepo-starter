const defaultExport = ['**/vite.config.ts'];

/**
 * @type {import('eslint').Linter.ConfigOverride[]}
 */
module.exports = [
  require('./tests'),
  require('./browser'),
  require('./server'),
  require('./components'),
  require('./commonjs'),
  {
    files: defaultExport,
    rules: {
      'import/no-default-export': 0,
    },
  },
];
