const { spawnSync } = require('child_process');

async function action() {
  const command = `rm -rf .turbo && rm -rf node_modules && rm -rf dist`;

  spawnSync(command, { stdio: 'inherit', shell: true, encoding: 'utf-8' });
}

module.exports = (program) => {
  program.command('clean').description('Removes all artifacts generated by build tools').action(action);
};