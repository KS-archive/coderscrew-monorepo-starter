/**
 * This file is necessary because the bin path from package.json has to exist even before we build this workspace.
 * Otherwise our package manager will be unable to resolve the bin path during the initial installation process.
 */
require('./dist/index');
