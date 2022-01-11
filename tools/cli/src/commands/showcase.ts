import { Command } from 'commander';
import concurrently, { ConcurrentlyCommandInput } from 'concurrently';

import { workspacesUtils } from '@ccms/node';

import { loadEnvVariables, runCommand } from '../utils';
import { STORYBOOK_WORKSPACE, storybookCommands } from './storybook';

function action() {
  loadEnvVariables();

  runCommand(`docker compose up -d`);
  runCommand(`turbo run build`);

  const apps = workspacesUtils.getApps().map(
    (app): ConcurrentlyCommandInput => ({
      command: `pnpm run dev --filter=${app.moduleName}`,
      name: app.moduleName,
    })
  );

  concurrently(
    [
      ...apps,
      { command: `pnpm run ${storybookCommands.dev} --filter=${STORYBOOK_WORKSPACE}`, name: STORYBOOK_WORKSPACE },
    ],
    {
      prefixColors: ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'],
    }
  );
}

export const showcaseCommand = (program: Command) => {
  program.command('showcase').description('Runs all projects in development mode.').action(action);
};
