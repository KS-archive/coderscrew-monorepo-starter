import { Argument, Command, Option } from 'commander';

import { workspacesUtils } from '@ccms/node';

import { getRemainingArguments, loadEnvVariables, runCommand } from '../utils';

interface Arguments {
  workspace: string;
}

interface Options {
  e2e: boolean;
}

function action(this: Command, workspace: Arguments['workspace'], options: Options) {
  loadEnvVariables();

  const filter = `--filter=${workspacesUtils.findOneOrThrow(workspace).moduleName}`;
  const remainingArgs = getRemainingArguments(this);
  const innerArgs = remainingArgs.trim() ? `-- ${remainingArgs}` : '';

  const commandBase = options.e2e ? 'pnpm run test-e2e' : 'pnpm run test';

  runCommand([commandBase, filter, innerArgs].filter(Boolean).join(' '));
}

export const testCommand = (program: Command) => {
  program
    .command('test')
    .description('Runs tests for given workspace.')
    .addArgument(
      new Argument('<workspace>', 'Name of the workspace to test.').choices(workspacesUtils.getDirectoryNames())
    )
    .addOption(new Option('--e2e', 'Run tests with the real database.').default(false))
    .allowExcessArguments()
    .allowUnknownOption()
    .action(action);
};
