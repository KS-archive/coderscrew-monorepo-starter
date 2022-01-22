const path = require('path');

const project = path.resolve(__dirname, 'tsconfig.eslint.json');

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: { browser: true },
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: { project },
    },
  },
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
