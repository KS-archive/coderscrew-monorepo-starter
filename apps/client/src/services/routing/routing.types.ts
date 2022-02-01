import { Route } from 'react-location';

import type { AnyFunctionWithReturnType } from '@ccms/typings';

import type { RoutePath } from './route-path';

export type CreatePathFc = AnyFunctionWithReturnType<string>;

export type CustomRoute<CreatePath extends CreatePathFc = CreatePathFc> = {
  use: () => Route;
  path: (...args: Parameters<CreatePath>) => RoutePath;
};
