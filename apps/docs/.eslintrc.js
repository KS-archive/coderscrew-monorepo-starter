const { createPackageEslintConfig } = require('@ccms/node');

module.exports = createPackageEslintConfig({ dir: __dirname })({
  env: { browser: true },
});
