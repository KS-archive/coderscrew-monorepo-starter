import type { RouteObject } from 'react-router-dom';

import type { RoutePath } from './route-path';

export type CreatePathFc = (...args: any[]) => string;

export type CustomRoute<CreatePath extends CreatePathFc = CreatePathFc> = {
  use: () => RouteObject;
  path: (...args: Parameters<CreatePath>) => RoutePath;
};
