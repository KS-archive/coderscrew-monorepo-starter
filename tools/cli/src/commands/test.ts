import { Argument, Command, Option } from 'commander';

import { workspacesUtils } from '@ccms/node';

import { getRemainingArguments, loadEnvVariables, runCommand } from '../utils';

interface Arguments {
  workspace: string;
}

function action(this: Command, workspace: Arguments['workspace']) {
  loadEnvVariables();

  const filter = `--filter=${workspacesUtils.findOneOrThrow(workspace).moduleName}`;
  const remainingArgs = getRemainingArguments(this);
  const innerArgs = remainingArgs.trim() ? `-- ${remainingArgs}` : '';

  runCommand(['pnpm run test', filter, innerArgs].filter(Boolean).join(' '));
}

export const testCommand = (program: Command) => {
  program
    .command('test')
    .description('Runs tests for given workspace.')
    .addArgument(
      new Argument('<workspace>', 'Name of the workspace to test.').choices(workspacesUtils.getDirectoryNames())
    )
    .addOption(new Option('--e2e', 'Run e2e tests instead of the unit ones'))
    .allowExcessArguments()
    .allowUnknownOption()
    .action(action);
};
