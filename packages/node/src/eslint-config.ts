import type { Linter } from 'eslint';
import path from 'path';

interface Options {
  dir: string;
}

export const createPackageEslintConfig =
  ({ dir }: Options) =>
  (config: Linter.Config) => {
    const project = path.resolve(dir, 'tsconfig.eslint.json');

    return {
      ...config,
      parserOptions: {
        ...config.parserOptions,
        project,
      },
      settings: {
        ...config.settings,
        'import/resolver': {
          typescript: { project },
        },
      },
    };
  };
