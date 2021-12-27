import { Argument, Command, Option } from 'commander';

import { workspacesUtils } from '@ccms/config';

import { runCommand } from '../utils';

interface Arguments {
  workspace: string;
  dependencies: string[];
}

interface Options {
  dev: boolean;
}

const PROJECT_ROOT_KEY = 'root';

const getRootCommand = (dependencies: Arguments['dependencies']) => `pnpm add -w ${dependencies.join(' ')}`;

const getWorkspaceCommand = (dependencies: Arguments['dependencies'], workspace: Arguments['workspace']) => {
  const workspaceName = workspacesUtils.findOneOrThrow(workspace).moduleName;

  return `pnpm add ${dependencies.join(' ')} --filter=${workspaceName}`;
};

function action(workspace: Arguments['workspace'], dependencies: Arguments['dependencies'], options: Options) {
  let command =
    workspace === PROJECT_ROOT_KEY ? getRootCommand(dependencies) : getWorkspaceCommand(dependencies, workspace);

  if (options.dev) {
    command = `${command} --save-dev`;
  }

  runCommand(command);
}

export const addCommand = (program: Command) => {
  program
    .command('add')
    .description('Adds dependencies to a specified workspace.')
    .addArgument(
      new Argument(
        '<workspace>',
        'Name of the workspace to add dependencies to. Pass "root" to add to the root of the project.'
      ).choices([...workspacesUtils.getDirectoryNames(), PROJECT_ROOT_KEY])
    )
    .addArgument(new Argument('<dependencies...>', 'Names of the dependencies to be added.'))
    .addOption(new Option('-D, --dev, --save-dev', 'Save to dev dependencies.').default(false))
    .allowUnknownOption()
    .action(action);
};
