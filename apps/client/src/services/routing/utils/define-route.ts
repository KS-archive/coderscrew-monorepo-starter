import type { ReactElement } from 'react';

import { RoutePath } from '../route-path';
import type { CreatePathFc, CustomRoute } from '../routing.types';
import { customRouteToRoute } from './custom-route-to-route';

interface RouteConfig<CreatePath extends CreatePathFc = CreatePathFc> {
  path: string;
  element: () => Promise<ReactElement>;
  children?: CustomRoute[];
  createPath: CreatePath;
}

export const defineRoute = <CreatePath extends CreatePathFc>({
  createPath,
  ...config
}: RouteConfig<CreatePath>): CustomRoute<CreatePath> => ({
  use: () => ({ ...config, children: config.children?.map((route) => customRouteToRoute(route)) }),
  path: (...args) => new RoutePath(createPath(...args), config.element),
});
