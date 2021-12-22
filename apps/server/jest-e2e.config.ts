import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

const jestConfig: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  rootDir: 'e2e',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',
};

export default jestConfig;
