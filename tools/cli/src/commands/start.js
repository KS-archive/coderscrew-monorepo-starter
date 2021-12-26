const { Argument } = require('commander');
const { workspacesUtils } = require('@ccms/config');
const { runCommand, loadEnvVariables } = require('../utils');

function action(workspaces) {
  loadEnvVariables();

  if (workspaces.length === 0) {
    runCommand('pnpm run --recursive start');

    return;
  }

  const filters = workspacesUtils
    .findManyOrThrow(workspaces)
    .map((workspace) => `--filter=${workspace.moduleName}`)
    .join(' ');

  runCommand(`pnpm run --recursive ${filters} start`);
}

module.exports = (program) => {
  program
    .command('start')
    .description('Runs created build locally for specified workspaces.')
    .addArgument(
      new Argument('[workspaces...]', 'Names of the workspaces to run. Leave empty to start all workspaces.').choices(
        workspacesUtils.getApps().map((workspace) => workspace.directoryName)
      )
    )
    .action(action);
};
