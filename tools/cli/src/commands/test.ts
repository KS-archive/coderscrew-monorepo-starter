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

  const scriptName = options.e2e ? 'test:e2e' : 'test';

  const workspaceName = workspacesUtils.findOneOrThrow(workspace).moduleName;

  runCommand(`pnpm run --filter=${workspaceName} ${scriptName} -- ${getRemainingArguments(this)}`);
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
