const { blue, cyan } = require('colorette');
const { logger } = require('@ccms/node');

const ROOT_PATH = `${process.cwd()}/`;

process.on('exit', (exitCode) => {
  if (exitCode === 0) {
    logger.info(blue('Linting finished!'));
  }
});

/**
 * @param {import('eslint').Rule.RuleContext} context
 * @returns {import('eslint').Rule.RuleListener}
 */
const create = (context) => {
  const filename = context.getFilename();
  const relativeFilePath = filename.replace(ROOT_PATH, '');

  logger.info(cyan(`Linting: ${relativeFilePath}`));

  return {};
};

module.exports = { name: __filename, create };
