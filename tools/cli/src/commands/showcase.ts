import { Command } from 'commander';
import concurrently, { ConcurrentlyCommandInput } from 'concurrently';

import { workspacesUtils } from '@ccms/node';

import { loadEnvVariables, runCommand } from '../utils';
import { STORYBOOK_WORKSPACE, storybookCommands } from './storybook';

function action() {
  loadEnvVariables();

  runCommand(`docker compose up -d`);
  runCommand(`nx run-many --target=build --parallel --all`);

  const apps = workspacesUtils.getApps().map(
    (app): ConcurrentlyCommandInput => ({
      command: `nx run ${app.directoryName}:dev`,
      name: app.moduleName,
    })
  );

  concurrently(
    [
      ...apps,
      {
        command: `nx run ${STORYBOOK_WORKSPACE.directoryName}:${storybookCommands.dev}`,
        name: STORYBOOK_WORKSPACE.moduleName,
      },
    ],
    {
      prefixColors: ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'],
    }
  );
}

export const showcaseCommand = (program: Command) => {
  program.command('showcase').description('Runs all projects in development mode.').action(action);
};
