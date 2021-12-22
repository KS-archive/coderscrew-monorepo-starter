const { Argument } = require('commander');
const { workspacesUtils } = require('@ccms/config');
const { runCommand } = require('../utils');

function action(workspaces) {
  if (workspaces.length === 0) {
    runCommand('turbo run dev');

    return;
  }

  const scopes = workspacesUtils
    .findManyOrThrow(workspaces)
    .map((workspace) => `--scope=${workspace.moduleName}`)
    .join(' ');

  runCommand(`turbo run dev ${scopes} --include-dependencies`);
}

module.exports = (program) => {
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
