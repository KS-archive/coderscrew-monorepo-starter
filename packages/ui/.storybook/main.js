const { resolveEsmImports } = require('./resolve-esm-imports');
const { resolveTsPaths } = require('./resolve-ts-paths');

/**
 * @type {import('@storybook/core-common').StorybookConfig}
 */
module.exports = {
  stories: ['../src/**/*.stories.@(mdx|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  features: {
    // https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#emotion11-quasi-compatibility
    emotionAlias: false,
  },
  webpackFinal: (config) => {
    resolveEsmImports(config);
    resolveTsPaths(config);

    return config;
  },
};
