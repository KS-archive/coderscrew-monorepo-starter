const path = require('path');
const { workspacesUtils } = require('@ccms/config');

const tsConfigProjects = [path.resolve(process.cwd(), 'tsconfig.eslint.json'), ...workspacesUtils.getTsConfigPaths()];

/**
 * @param {import('eslint').Linter.Config} eslintConfig
 * @returns {import('eslint').Linter.Config}
 */
const withTypeScriptParser = (eslintConfig) => ({
  ...eslintConfig,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: tsConfigProjects,
    tsconfigRootDir: process.cwd(),
  },
  settings: {
    ...(eslintConfig.settings ?? {}),
    'import/resolver': {
      typescript: { project: tsConfigProjects },
    },
  },
});

module.exports = withTypeScriptParser;
