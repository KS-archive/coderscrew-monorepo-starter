/**
 * @type {import('eslint').Linter.ConfigOverride}
 */
module.exports = {
  files: ['*.js'],
  env: { node: true },
  rules: {
    // ESM-related lint rules should be disabled for CommonJS files.
    'global-require': 0,
    '@typescript-eslint/no-var-requires': 0,
  },
};
