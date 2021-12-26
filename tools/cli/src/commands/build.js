const { Argument } = require('commander');
const { workspacesUtils } = require('@ccms/config');
const { runCommand, loadEnvVariables } = require('../utils');

function action(workspaces) {
  loadEnvVariables();

  if (workspaces.length === 0) {
    runCommand('turbo run build');

    return;
  }

  const scopes = workspacesUtils
    .findManyOrThrow(workspaces)
    .map((workspace) => `--scope=${workspace.moduleName}`)
    .join(' ');

  runCommand(`turbo run build ${scopes} --include-dependencies`);
}

module.exports = (program) => {
  program
    .command('build')
    .description('Builds specified workspaces and their dependencies.')
    .addArgument(
      new Argument(
        '[workspaces...]',
        'Names of the workspaces to build. Leave empty to build all dependencies.'
      ).choices(
        [...workspacesUtils.getApps(), ...workspacesUtils.getPackages()].map((workspace) => workspace.directoryName)
      )
    )
    .action(action);
};
