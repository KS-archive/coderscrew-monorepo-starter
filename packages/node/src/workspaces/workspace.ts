import fs from 'fs';
import path from 'path';
import url from 'url';

import { APPS_FOLDER, PACKAGES_FOLDER, WORKSPACE_PREFIX } from './constants';

export class Workspace {
  private _absolutePath: string;

  constructor(absolutePath: string) {
    this._absolutePath = absolutePath;
  }

  get fullPath() {
    return this._absolutePath;
  }

  get projectPath() {
    return path.relative(path.dirname(url.fileURLToPath(import.meta.url)), this.fullPath);
  }

  get directoryName() {
    const directory = this.fullPath.split('/').pop();

    if (!directory) {
      throw new Error(`No directory found at the end of path ${this.fullPath}`);
    }

    return directory;
  }

  get moduleName() {
    return `${WORKSPACE_PREFIX}/${this.directoryName}`;
  }

  get tsConfigPath() {
    const tsConfigPath = path.resolve(this.fullPath, 'tsconfig.json');

    return fs.existsSync(tsConfigPath) ? tsConfigPath : undefined;
  }

  get isPackage() {
    return this.fullPath.includes(path.join(PACKAGES_FOLDER, this.directoryName));
  }

  get isApp() {
    return this.fullPath.includes(path.join(APPS_FOLDER, this.directoryName));
  }

  match = (name: string) => {
    return [this.fullPath, this.projectPath, this.directoryName, this.moduleName].includes(name);
  };
}
