const withTypeScriptParser = require('./utils/withTypeScriptParser');

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  rules: require('./rules'),
  configs: {
    recommended: withTypeScriptParser({
      plugins: ['simple-import-sort', 'jest', 'jest-dom', 'testing-library', 'jest-formatting', '@ccms'],
      extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'plugin:eslint-comments/recommended',
        'plugin:promise/recommended',
        'plugin:prettier/recommended', // this config should be at the end as it overwrites other ones
      ],
      settings: {
        jest: { version: require('../package.json').devDependencies.jest },
        react: { version: require('../package.json').devDependencies.react },
      },
      rules: require('./config/rules'),
      overrides: require('./config/overrides'),
    }),
  },
};
