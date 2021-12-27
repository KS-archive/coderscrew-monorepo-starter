import { Argument, Command } from 'commander';

import { workspacesUtils } from '@ccms/config';

import { loadEnvVariables, runCommand } from '../utils';

interface Arguments {
  workspaces: string[];
}

function action(workspaces: Arguments['workspaces']) {
  loadEnvVariables();

  if (workspaces.length === 0) {
    runCommand('pnpm run --recursive start');

    return;
  }

  const filters = workspacesUtils
    .findManyOrThrow(workspaces)
    .map((workspace) => `--filter=${workspace.moduleName}`)
    .join(' ');

  runCommand(`pnpm run --recursive ${filters} start`);
}

export const startCommand = (program: Command) => {
  program
    .command('start')
    .description('Runs created build locally for specified workspaces.')
    .addArgument(
      new Argument('[workspaces...]', 'Names of the workspaces to run. Leave empty to start all workspaces.').choices(
        workspacesUtils.getApps().map((workspace) => workspace.directoryName)
      )
    )
    .action(action);
};
