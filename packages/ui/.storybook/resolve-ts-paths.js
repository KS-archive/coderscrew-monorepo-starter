const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

/**
 * Resolves paths specified in tsconfig.json.
 * @param {import('webpack').Configuration} config
 */
const resolveTsPaths = (config) => {
  // eslint-disable-next-line no-param-reassign
  config.resolve.plugins = config.resolve.plugins ?? [];
  config.resolve.plugins.push(
    new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../tsconfig.json'),
    })
  );
};

module.exports = { resolveTsPaths };
