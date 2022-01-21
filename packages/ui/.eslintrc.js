/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: { browser: true },
  overrides: [
    {
      files: ['*.stories.tsx'],
      plugins: ['storybook'],
      extends: ['plugin:storybook/recommended'],
      rules: {
        'import/no-default-export': 0,
        'import/no-extraneous-dependencies': [2, { devDependencies: true }],
      },
    },
  ],
  ignorePatterns: ['storybook-static', '!.storybook'],
};
