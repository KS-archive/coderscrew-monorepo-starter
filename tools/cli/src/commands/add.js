const { Argument, Option } = require('commander');
const { workspacesUtils } = require('@ccms/config');
const { runCommand } = require('../utils');

const PROJECT_ROOT_KEY = 'root';

const getRootCommand = (dependencies) => `pnpm add -w ${dependencies}`;

const getWorkspaceCommand = (dependencies, workspace) => {
  const workspaceName = workspacesUtils.findOneOrThrow(workspace).moduleName;

  return `pnpm add ${dependencies.join(' ')} --filter=${workspaceName}`;
};

function action(workspace, dependencies, options) {
  let command =
    workspace === PROJECT_ROOT_KEY ? getRootCommand(dependencies) : getWorkspaceCommand(dependencies, workspace);

  if (options.dev) {
    command = `${command} --save-dev`;
  }

  runCommand(command);
}

module.exports = (program) => {
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
