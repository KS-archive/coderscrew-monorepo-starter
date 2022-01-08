import { Argument, Command } from 'commander';

import { workspacesUtils } from '@ccms/node';

import { loadEnvVariables, runCommand } from '../utils';

interface Arguments {
  workspaces: string[];
}

function action(workspaces: Arguments['workspaces']) {
  loadEnvVariables();

  if (workspaces.length === 0) {
    runCommand('pnpm run build');

    return;
  }

  const filters = workspacesUtils
    .findManyOrThrow(workspaces)
    .map((workspace) => `--filter=${workspace.moduleName}`)
    .join(' ');

  runCommand(`pnpm run build ${filters}`);
}

export const buildCommand = (program: Command) => {
  program
    .command('build')
    .description('Builds specified workspaces and their dependencies.')
    .addArgument(
      new Argument(
        '[workspaces...]',
        'Names of the workspaces to build. Leave empty to build all dependencies.'
      ).choices(workspacesUtils.getDirectoryNames())
    )
    .action(action);
};
