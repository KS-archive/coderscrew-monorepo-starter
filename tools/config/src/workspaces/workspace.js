const path = require('path');
const fs = require('fs');

const { WORKSPACE_PREFIX } = require('./constants');

class Workspace {
  #absolutePath;

  /**
   * @param {string} absolutePath
   */
  constructor(absolutePath) {
    this.#absolutePath = absolutePath;
  }

  get fullPath() {
    return this.#absolutePath;
  }

  get projectPath() {
    return path.relative(__dirname, this.fullPath);
  }

  get directoryName() {
    return this.fullPath.split('/').pop();
  }

  get moduleName() {
    return `${WORKSPACE_PREFIX}/${this.directoryName}`;
  }

  get tsConfigPath() {
    const tsConfigPath = path.resolve(this.fullPath, 'tsconfig.json');

    return fs.existsSync(tsConfigPath) ? tsConfigPath : null;
  }

  match = (name) => {
    return [this.fullPath, this.projectPath, this.directoryName, this.moduleName].includes(name);
  };
}

module.exports = Workspace;
