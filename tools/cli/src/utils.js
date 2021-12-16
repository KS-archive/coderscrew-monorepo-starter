const fg = require('fast-glob');

const { workspaces } = require('../../../package.json');

const getWorkspacesPaths = () => fg.sync(workspaces, { onlyDirectories: true });

module.exports = {
  getWorkspacesPaths,
};
