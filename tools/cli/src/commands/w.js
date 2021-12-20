const { spawnSync } = require('child_process');
const { Argument } = require('commander');

const { packagePrefix } = require('../../../../package.json');
const { getWorkspacesPaths } = require('../utils');

const validateWorkspaces = (workspaces) => {
  const availableWorkspaces = getWorkspacesPaths().map((workspaceDir) => workspaceDir.split('/')[1]);

  const workspaceErrors = workspaces.flatMap((workspaceName) =>
    availableWorkspaces.includes(workspaceName)
      ? []
      : [`Workspace ${workspaceName} doesn't exist. Available workspaces are ${availableWorkspaces.join(',')}`]
  );

  if (workspaceErrors.length > 0) {
    // eslint-disable-next-line no-console
    workspaceErrors.forEach(console.error);
    throw new Error("You provide at least one name of a workspace that doesn't exist");
  }
};

function action(workspaces, script) {
  validateWorkspaces(workspaces);

  const scopes = workspaces.map((workspace) => `--scope=${packagePrefix}/${workspace}`);
  const command = `turbo run ${script} ${scopes.join(' ')} --include-dependencies`;

  spawnSync(command, { stdio: 'inherit', shell: true, encoding: 'utf-8' });
}

module.exports = (program) => {
  program
    .command('w')
    .description('Runs script for a particular workspace')
    .addArgument(
      new Argument('<workspaces>', 'Names of the workspaces to run script in (separated by comma).').argParser((arg) =>
        arg.split(',')
      )
    )
    .addArgument(new Argument('<script>', 'Script to run in the provided workspace'))
    .allowUnknownOption()
    .action(action);
};
