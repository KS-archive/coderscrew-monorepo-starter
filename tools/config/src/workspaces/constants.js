const rootPackageJson = require('../../../../package.json');

const WORKSPACE_FOLDERS = rootPackageJson.workspaces;
const WORKSPACE_PREFIX = rootPackageJson.workspacePrefix;

module.exports = {
  WORKSPACE_FOLDERS,
  WORKSPACE_PREFIX,
};
