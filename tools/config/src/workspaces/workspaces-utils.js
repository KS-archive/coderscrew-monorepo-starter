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

  /**
   * @returns {string[]}
   */
  getFullPaths = () => {
    return this.#workspaces.map((w) => w.fullPath);
  };

  /**
   * @returns {string[]}
   */
  getTsConfigPaths = () => {
    return this.#workspaces.map((w) => w.tsConfigPath).filter(Boolean);
  };

  /**
   * @param {string} workspaceName
   * @returns {Workspace}
   */
  findOneOrThrow = (workspaceName) => {
    const result = this.#workspaces.find((w) => w.match(workspaceName));

    if (!result) {
      throw new Error(`Workspace ${workspaceName} doesn't exist`);
    }

    return result;
  };

  /**
   * @param {string[]} workspaceNames
   * @returns {Workspace[]}
   */
  findManyOrThrow = (workspaceNames) => {
    return workspaceNames.map(this.findOneOrThrow);
  };
}

module.exports = new WorkspacesUtils();
