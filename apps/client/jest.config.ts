import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const jestConfig: Config.InitialOptions = {
  rootDir: 'src',
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  testRegex: '.*\\.spec\\.+(ts|tsx)$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/../setup-tests.ts'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['**/*.(ts|tsx)'],
};

export default jestConfig;
