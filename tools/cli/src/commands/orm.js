const { workspacesUtils } = require('@ccms/config');
const { runCommand, loadEnvVariables, getRemainingArguments } = require('../utils');

function action() {
  loadEnvVariables();

  const serverModuleName = workspacesUtils.findOneOrThrow('server').moduleName;

  runCommand(`pnpm run --filter=${serverModuleName} mikro-orm -- ${getRemainingArguments(this)}`);
}

module.exports = (program) => {
  program
    .command('orm')
    .description('Runs orm-related scripts inside the server workspace.')
    .allowExcessArguments()
    .allowUnknownOption()
    .action(action);
};
