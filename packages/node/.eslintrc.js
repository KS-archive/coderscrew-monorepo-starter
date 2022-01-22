const { createPackageEslintConfig } = require('./dist');

module.exports = createPackageEslintConfig({ dir: __dirname })({
  env: { node: true },
});
