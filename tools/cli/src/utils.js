const { spawnSync } = require('child_process');
const path = require('path');

const loadEnvVariables = () => {
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
};

/**
 * @param {string} command
 */
const runCommand = (command) => {
  // eslint-disable-next-line no-console
  console.info('Running command:', command);
  spawnSync(command, { stdio: 'inherit', shell: true, encoding: 'utf-8' });
};

module.exports = { runCommand, loadEnvVariables };
