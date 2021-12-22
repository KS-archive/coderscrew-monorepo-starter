const { spawnSync } = require('child_process');
const { workspacesUtils } = require('@ccms/config');
const path = require('path');

const pathToNodemonWatchArg = (pathToWatch) => `--watch "${pathToWatch}"`;

const main = () => {
  const nodemonWatchArgs = workspacesUtils
    .getRelatedWorkspacesRelativePaths(path.resolve(__dirname, '..', 'package.json'))
    .map(pathToNodemonWatchArg)
    .join(' ');

  const command = `tsup --watch & nodemon --exec "node dist/index.js" --watch dist ${nodemonWatchArgs}`.trim();

  spawnSync(command, { stdio: 'inherit', shell: true, encoding: 'utf-8' });
};

main();
