import type { RouteObject } from 'react-router-dom';

import type { AnyFunctionWithReturnType } from '@ccms/typings';

import type { RoutePath } from './route-path';

export type CreatePathFc = AnyFunctionWithReturnType<string>;

export type CustomRoute<CreatePath extends CreatePathFc = CreatePathFc> = {
  use: () => RouteObject;
  path: (...args: Parameters<CreatePath>) => RoutePath;
};
