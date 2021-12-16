const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const { packagePrefix } = require('../../../package.json');

const getDependencies = (packageJsonPath) => {
  const packageJsonContent = fs.readFileSync(packageJsonPath, { encoding: 'utf-8' });
  const { dependencies, devDependencies } = JSON.parse(packageJsonContent);

  return { dependencies, devDependencies };
};

const getRelatedWorkspaces = (dependencies) =>
  Object.keys(dependencies).filter((dependencyName) => dependencyName.startsWith(packagePrefix));

const getWorkspacePath = (workspaceName) =>
  path.join('..', '..', 'packages', workspaceName.replace(packagePrefix, ''), 'dist');

const pathToNodemonWatchArg = (pathToWatch) => `--watch "${pathToWatch}"`;

const main = () => {
  const { dependencies, devDependencies } = getDependencies(path.resolve(process.cwd(), 'package.json'));
  const relatedWorkspaces = getRelatedWorkspaces({ ...dependencies, ...devDependencies });
  const relatedWorkspacesPaths = relatedWorkspaces.map(getWorkspacePath);
  const nodemonArgs = relatedWorkspacesPaths.map(pathToNodemonWatchArg).join(' ');

  const command = `tsup src/index.ts --format cjs --watch & nodemon --exec "node dist/index.js" --watch dist ${nodemonArgs}`;

  spawnSync(command, { stdio: 'inherit', shell: true, encoding: 'utf-8' });
};

main();
