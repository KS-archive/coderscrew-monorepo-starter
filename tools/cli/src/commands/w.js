const { spawnSync } = require('child_process');
const { Argument } = require('commander');
const { workspacesUtils } = require('@ccms/config');

function action(workspaces, script) {
  const scopes = workspacesUtils
    .findManyOrThrow(workspaces)
    .map((workspace) => `--scope=${workspace.moduleName}`)
    .join(' ');
  const command = `turbo run ${script} ${scopes} --include-dependencies`;

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
