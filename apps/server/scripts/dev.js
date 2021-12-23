// eslint-disable-next-line unicorn/prevent-abbreviations
const { spawnSync } = require('child_process');
const { workspacesUtils } = require('@ccms/config');
const path = require('path');

const pathToNodemonWatchArgument = (pathToWatch) => `--watch "${pathToWatch}"`;

const main = () => {
  const nodemonWatchArguments = workspacesUtils
    .getRelatedWorkspacesRelativePaths(path.resolve(__dirname, '..', 'package.json'))
    .map((workspace) => pathToNodemonWatchArgument(workspace))
    .join(' ');

  const command = `tsup --watch & nodemon --exec "node dist/index.js" --watch dist ${nodemonWatchArguments}`.trim();

  spawnSync(command, { stdio: 'inherit', shell: true, encoding: 'utf-8' });
};

main();
