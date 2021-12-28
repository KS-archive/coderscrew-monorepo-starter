import { Argument, Command, Option } from 'commander';

import { workspacesUtils } from '@ccms/config';

import { loadEnvVariables, runCommand } from '../utils';

interface Arguments {
  workspaces: string[];
}

interface Options {
  turbo: boolean;
}

function action(workspaces: Arguments['workspaces'], options: Options) {
  loadEnvVariables();

  if (options.turbo) {
    if (workspaces.length === 0) {
      runCommand('turbo run build');

      return;
    }

    const scopes = workspacesUtils
      .findManyOrThrow(workspaces)
      .map((workspace) => `--scope=${workspace.moduleName}`)
      .join(' ');

    runCommand(`turbo run build ${scopes} --include-dependencies`);
  } else {
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
    // Temporary option as for now turbo has issues with displaying errors from Node servers
    .addOption(new Option('--no-turbo', "Don't use turbo to run this workspace"))
    .action(action);
};
