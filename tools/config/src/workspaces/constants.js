const path = require('path');
const rootPackageJson = require('../../../../package.json');

const WORKSPACE_FOLDERS = rootPackageJson.workspaces.map((workspaceRegex) =>
  path.join(path.resolve(__dirname, '../../../..'), workspaceRegex)
);
const WORKSPACE_PREFIX = rootPackageJson.workspacePrefix;
const PACKAGES_FOLDER = 'packages';

module.exports = {
  WORKSPACE_FOLDERS,
  WORKSPACE_PREFIX,
  PACKAGES_FOLDER,
};
