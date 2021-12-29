/**
 * Resolves ESM imports even when they don't have extension.
 * https://github.com/storybookjs/storybook/issues/14938
 * @param {import('webpack').Configuration} config
 */
const resolveEsmImports = (config) => {
  // eslint-disable-next-line no-param-reassign
  config.module.rules = config.module.rules ?? [];
  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: 'pre',
    loader: require.resolve('source-map-loader'),
    resolve: {
      fullySpecified: false,
    },
  });
};

module.exports = { resolveEsmImports };
