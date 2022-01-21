import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const jestConfig: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/../setup-tests.ts'],
  testEnvironment: 'node',
  collectCoverageFrom: ['**/*.(t|j)s'],
};

export default jestConfig;
