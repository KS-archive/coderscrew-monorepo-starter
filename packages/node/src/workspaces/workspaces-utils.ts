import fastGlob from 'fast-glob';
import fs from 'fs';
import path from 'path';

import { WORKSPACE_FOLDERS, WORKSPACE_PREFIX } from './constants';
import { Workspace } from './workspace';

class WorkspacesUtils {
  private _workspaces: Workspace[];

  constructor() {
    this._workspaces = fastGlob
      .sync(WORKSPACE_FOLDERS, { onlyDirectories: true, absolute: true })
      .map((absolutePath) => new Workspace(absolutePath));
  }

  // eslint-disable-next-line class-methods-use-this
  getWorkspacePrefix = () => WORKSPACE_PREFIX;

  getFullPaths = () => this._workspaces.map((w) => w.fullPath);

  getDirectoryNames = () => this._workspaces.map((w) => w.directoryName);

  getTsConfigPaths = () => this._workspaces.map((w) => w.tsConfigPath).filter(Boolean);

  getApps = () => this._workspaces.filter((w) => w.isApp);

  getPackages = () => this._workspaces.filter((w) => w.isPackage);

  findOneOrThrow = (workspaceName: string) => {
    const result = this._workspaces.find((w) => w.match(workspaceName));

    if (!result) {
      throw new Error(`Workspace ${workspaceName} doesn't exist`);
    }

    return result;
  };

  findManyOrThrow = (workspaceNames: string[]) =>
    workspaceNames.map((workspaceName) => this.findOneOrThrow(workspaceName));

  getRelatedWorkspacesRelativePaths = (packageJsonAbsolutePath: string) => {
    const directoryPath = packageJsonAbsolutePath.replace('/package.json', '');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { dependencies, devDependencies } = JSON.parse(
      fs.readFileSync(path.join(directoryPath, 'package.json')).toString()
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.keys({ ...dependencies, ...devDependencies })
      .filter((dependencyName) => dependencyName.startsWith(WORKSPACE_PREFIX))
      .map((element) => this.findOneOrThrow(element))
      .filter((workspace) => workspace.isPackage)
      .map((workspace) => path.relative(directoryPath, workspace.fullPath));
  };
}

export const workspacesUtils = new WorkspacesUtils();
