const Workspace = require('./workspace');
const { WORKSPACE_FOLDERS, WORKSPACE_PREFIX } = require('./constants');

class WorkspacesUtils {
  #workspaces;

  constructor() {
    this.#workspaces = require('fast-glob')
      .sync(WORKSPACE_FOLDERS, { onlyDirectories: true, absolute: true })
      .map((absolutePath) => new Workspace(absolutePath));
  }

  // eslint-disable-next-line class-methods-use-this
  getWorkspacePrefix = () => WORKSPACE_PREFIX;

  getFullPaths = () => {
    return this.#workspaces.map((w) => w.fullPath);
  };

  getTsConfigPaths = () => {
    return this.#workspaces.map((w) => w.tsConfigPath).filter(Boolean);
  };

  findOneOrThrow = (workspaceName) => {
    const result = this.#workspaces.find((w) => w.match(workspaceName));

    if (!result) {
      throw new Error(`Workspace ${workspaceName} doesn't exist`);
    }

    return result;
  };

  findManyOrThrow = (workspaceNames) => {
    return workspaceNames.map(this.findOneOrThrow);
  };
}

module.exports = new WorkspacesUtils();
