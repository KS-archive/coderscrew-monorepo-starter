const { Argument } = require('commander');
const { workspacesUtils } = require('@ccms/config');
const { runCommand } = require('../utils');

const PROJECT_ROOT_KEY = 'root';

function action(workspace, dependencies) {
  if (workspace === PROJECT_ROOT_KEY) {
    runCommand(`pnpm remove -w ${dependencies}`);
  }

  const workspaceName = workspacesUtils.findOneOrThrow(workspace).moduleName;

  runCommand(`pnpm remove ${dependencies.join(' ')} --filter=${workspaceName}`);
}

module.exports = (program) => {
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
