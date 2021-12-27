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

/**
 * @param {import('commander').Command} program
 */
const getRemainingArguments = (program) => program.args.slice(program.processedArgs.length).join(' ');

module.exports = { runCommand, loadEnvVariables, getRemainingArguments };
