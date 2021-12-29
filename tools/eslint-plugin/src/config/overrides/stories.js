/**
 * @type {import('eslint').Linter.ConfigOverride}
 */
module.exports = {
  files: ['*.stories.tsx'],
  extends: ['plugin:storybook/recommended'],
  rules: {
    'import/no-default-export': 0,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
  },
};
