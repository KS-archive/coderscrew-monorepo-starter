// eslint-disable-next-line unicorn/prevent-abbreviations
import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.e2e.json';

const jestConfig: Config.InitialOptions = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.e2e.json',
    },
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePathIgnorePatterns: ['dist'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  rootDir: 'e2e',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',
};

export default jestConfig;
