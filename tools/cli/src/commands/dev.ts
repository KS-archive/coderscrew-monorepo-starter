import { Argument, Command } from 'commander';

import { workspacesUtils } from '@ccms/node';

import { loadEnvVariables, runCommand } from '../utils';

interface Arguments {
  workspaces: string[];
}

function action(workspaces: Arguments['workspaces']) {
  loadEnvVariables();

  const baseCommand = 'nx run-many --target=dev --parallel';

  if (workspaces.length === 0) {
    runCommand(`${baseCommand} --all`);

    return;
  }

  runCommand(`${baseCommand} --projects=${workspaces.join(',')}`);
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
    .action(action);
};
