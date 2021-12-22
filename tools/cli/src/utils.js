const { spawnSync } = require('child_process');

/**
 * @param {string} command
 */
const runCommand = (command) => {
  // eslint-disable-next-line no-console
  console.info('Running command:', command);
  spawnSync(command, { stdio: 'inherit', shell: true, encoding: 'utf-8' });
};

/**
 * @param {import('commander').Command} program
 */
const getRemainingArgs = (program) => program.args.slice(program.processedArgs.length);

module.exports = { runCommand, getRemainingArgs };
