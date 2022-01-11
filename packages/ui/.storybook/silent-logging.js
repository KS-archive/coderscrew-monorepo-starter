/**
 * Silences webpack logging so it logs only core messages and errors.
 * @param {import('webpack').Configuration} config
 */
const silentLogging = (config) => {
  // eslint-disable-next-line no-param-reassign
  config.plugins = (config.plugins ?? []).filter(({ constructor }) => constructor.name !== 'ProgressPlugin');
};

module.exports = { silentLogging };
