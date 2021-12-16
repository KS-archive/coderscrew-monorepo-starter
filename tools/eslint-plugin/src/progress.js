const { blue, cyan } = require('colorette');
const log = require('loglevel');

const ROOT_PATH = `${process.cwd()}/`;

process.on('exit', (exitCode) => {
  if (exitCode === 0) {
    log.info(blue('Linting finished!'));
  }
});

/**
 * @param {import('eslint').Rule.RuleContext} context
 * @returns {import('eslint').Rule.RuleListener} context
 */
const create = (context) => {
  const filename = context.getFilename();
  const relativeFilePath = filename.replace(ROOT_PATH, '');

  log.info(cyan(`Linting: ${relativeFilePath}`));

  return {};
};

module.exports = { name: __filename, create };
