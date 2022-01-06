import { Argument, Command, Option } from 'commander';

import { workspacesUtils } from '@ccms/node';

import { loadEnvVariables, runCommand } from '../utils';

interface Arguments {
  workspaces: string[];
}

interface Options {
  e2e: boolean;
}

function action(workspaces: Arguments['workspaces'], options: Options) {
  loadEnvVariables();

  const scriptName = options.e2e ? 'test:e2e' : 'test';

  if (workspaces.length === 0) {
    runCommand(`pnpm run --recursive ${scriptName}`);

    return;
  }

  const filters = workspacesUtils
    .findManyOrThrow(workspaces)
    .map((workspace) => `--filter=${workspace.moduleName}`)
    .join(' ');

  runCommand(`pnpm run --recursive ${filters} ${scriptName}`);
}

export const testCommand = (program: Command) => {
  program
    .command('test')
    .description('Runs tests for given workspaces.')
    .addArgument(
      new Argument('[workspaces...]', 'Names of the workspaces to test. Leave empty to test all workspaces.').choices(
        workspacesUtils.getDirectoryNames()
      )
    )
    .addOption(new Option('--e2e', 'Run e2e tests instead of the unit ones'))
    .action(action);
};
