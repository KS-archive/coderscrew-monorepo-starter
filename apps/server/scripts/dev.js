const { workspacesUtils, exec } = require('@ccms/config');
const path = require('path');

const pathToNodemonWatchArgument = (pathToWatch) => `--watch "${pathToWatch}"`;

const main = () => {
  const nodemonWatchArguments = workspacesUtils
    .getRelatedWorkspacesRelativePaths(path.resolve(__dirname, '..', 'package.json'))
    .map((workspace) => pathToNodemonWatchArgument(workspace))
    .join(' ');

  const command = `tsup --watch & nodemon --exec "node dist/index.js" --watch dist ${nodemonWatchArguments}`.trim();

  exec.command(command);
};

main();
