import fs from 'fs';
import path from 'path';
import url from 'url';

import { APPS_FOLDER, PACKAGES_FOLDER, WORKSPACE_PREFIX } from './constants';

export class Workspace {
  private absolutePath: string;

  constructor(absolutePath: string) {
    this.absolutePath = absolutePath;
  }

  get fullPath() {
    return this.absolutePath;
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

  get eslintTsConfigPath() {
    const eslintTsConfigPath = path.resolve(this.fullPath, 'tsconfig.eslint.json');

    return fs.existsSync(eslintTsConfigPath) ? eslintTsConfigPath : undefined;
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
