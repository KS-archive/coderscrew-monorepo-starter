import path from 'path';
import url from 'url';

// eslint-disable-next-line import/no-relative-packages
import rootPackageJson from '../../../../package.json';

export const WORKSPACE_FOLDERS = rootPackageJson.workspaces.map((workspaceRegex) =>
  path.join(path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../../../..'), workspaceRegex)
);

export const WORKSPACE_PREFIX = '@ccms';
export const PACKAGES_FOLDER = 'packages';
export const APPS_FOLDER = 'apps';
