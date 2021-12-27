import type { Command } from 'commander';
import { Argument } from 'commander';

import { workspacesUtils } from '@ccms/config';

import { runCommand } from '../utils';

interface Arguments {
  workspace: string;
  dependencies: string[];
}

const PROJECT_ROOT_KEY = 'root';

function action(workspace: Arguments['workspace'], dependencies: Arguments['dependencies']) {
  if (workspace === PROJECT_ROOT_KEY) {
    runCommand(`pnpm remove -w ${dependencies.join(' ')}`);
  }

  const workspaceName = workspacesUtils.findOneOrThrow(workspace).moduleName;

  runCommand(`pnpm remove ${dependencies.join(' ')} --filter=${workspaceName}`);
}

export const removeCommand = (program: Command) => {
  program
    .command('remove')
    .description('Removes dependencies from a specified workspace.')
    .addArgument(
      new Argument(
        '<workspace>',
        'Name of the workspace to remove the dependencies from. Pass "root" to remove from the root of the project.'
      ).choices([...workspacesUtils.getDirectoryNames(), PROJECT_ROOT_KEY])
    )
    .addArgument(new Argument('<dependencies...>', 'Names of the dependencies to be removed'))
    .action(action);
};
