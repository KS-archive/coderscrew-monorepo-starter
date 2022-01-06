import { Command } from 'commander';

import { workspacesUtils } from '@ccms/node';

import { getRemainingArguments, loadEnvVariables, runCommand } from '../utils';

function action(this: Command) {
  loadEnvVariables();

  const serverModuleName = workspacesUtils.findOneOrThrow('server').moduleName;

  runCommand(`pnpm run --filter=${serverModuleName} mikro-orm -- ${getRemainingArguments(this)}`);
}

export const ormCommand = (program: Command) => {
  program
    .command('orm')
    .description('Runs orm-related scripts inside the server workspace.')
    .allowExcessArguments()
    .allowUnknownOption()
    .action(action);
};
