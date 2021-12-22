const fs = require('fs');
const path = require('path');

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

  getFullPaths = () => this.#workspaces.map((w) => w.fullPath);

  getDirectoryNames = () => this.#workspaces.map((w) => w.directoryName);

  getTsConfigPaths = () => this.#workspaces.map((w) => w.tsConfigPath).filter(Boolean);

  getApps = () => this.#workspaces.filter((w) => w.isApp);

  getPackages = () => this.#workspaces.filter((w) => w.isPackage);

  /**
   * @param {string} workspaceName
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
   */
  findManyOrThrow = (workspaceNames) => workspaceNames.map(this.findOneOrThrow);

  /**
   * @param {string} packageJsonAbsolutePath
   */
  getRelatedWorkspacesRelativePaths = (packageJsonAbsolutePath) => {
    const packageJsonContent = fs.readFileSync(packageJsonAbsolutePath, { encoding: 'utf-8' });

    const { dependencies, devDependencies } = JSON.parse(packageJsonContent);

    return Object.keys({ ...dependencies, ...devDependencies })
      .filter((dependencyName) => dependencyName.startsWith(WORKSPACE_PREFIX))
      .map(this.findOneOrThrow)
      .filter((workspace) => workspace.isPackage)
      .map((workspace) => path.relative(packageJsonAbsolutePath, workspace.fullPath));
  };
}

module.exports = new WorkspacesUtils();
