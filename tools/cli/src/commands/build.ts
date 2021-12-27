import { Argument, Command } from 'commander';

import { workspacesUtils } from '@ccms/config';

import { loadEnvVariables, runCommand } from '../utils';

interface Arguments {
  workspaces: string[];
}

function action(workspaces: Arguments['workspaces']) {
  loadEnvVariables();

  if (workspaces.length === 0) {
    runCommand('turbo run build');

    return;
  }

  const scopes = workspacesUtils
    .findManyOrThrow(workspaces)
    .map((workspace) => `--scope=${workspace.moduleName}`)
    .join(' ');

  runCommand(`turbo run build ${scopes} --include-dependencies`);
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
