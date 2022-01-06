import { Argument, Command, Option } from 'commander';

import { workspacesUtils } from '@ccms/node';

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
      runCommand('turbo run dev');

      return;
    }

    const scopes = workspacesUtils
      .findManyOrThrow(workspaces)
      .map((workspace) => `--scope=${workspace.moduleName}`)
      .join(' ');

    runCommand(`turbo run dev ${scopes} --include-dependencies`);
  } else {
    if (workspaces.length === 0) {
      runCommand('pnpm run dev');

      return;
    }

    const filters = workspacesUtils
      .findManyOrThrow(workspaces)
      .map((workspace) => `--filter=${workspace.moduleName}`)
      .join(' ');

    runCommand(`pnpm run dev ${filters}`);
  }
}

export const devCommand = (program: Command) => {
  program
    .command('dev')
    .description('Runs specified workspaces in local development mode.')
    .addArgument(
      new Argument(
        '[workspaces...]',
        'Names of the workspaces to run. Leave empty to run dev for all workspaces.'
      ).choices(workspacesUtils.getApps().map((workspace) => workspace.directoryName))
    )
    // Temporary option as for now turbo has issues with displaying errors from Node servers
    .addOption(new Option('--no-turbo', "Don't use turbo to run this workspace"))
    .action(action);
};
