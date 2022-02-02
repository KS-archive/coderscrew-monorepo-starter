import { Argument, Command } from 'commander';

import { workspacesUtils } from '@ccms/node';

import { loadEnvVariables, runCommand } from '../utils';

interface Arguments {
  workspaces: string[];
}

function action(workspaces: Arguments['workspaces']) {
  loadEnvVariables();

  const baseCommand = 'nx run-many --target=build --parallel';

  if (workspaces.length === 0) {
    runCommand(`${baseCommand} --all`);

    return;
  }

  runCommand(`${baseCommand} --projects=${workspaces.join(',')}`);
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
