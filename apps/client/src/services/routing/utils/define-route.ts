import type { ReactElement } from 'react';

import type { CreatePathFc, CustomRoute } from '../routing.types';
import { createTypeSafePath } from './create-type-safe-path';
import { customRouteToRoute } from './custom-route-to-route';

interface RouteConfig<CreatePath extends CreatePathFc = CreatePathFc> {
  path: string;
  element: ReactElement | (() => Promise<ReactElement>);
  children?: CustomRoute[];
  createPath: CreatePath;
}

export const defineRoute = <CreatePath extends CreatePathFc>({
  createPath,
  ...config
}: RouteConfig<CreatePath>): CustomRoute<CreatePath> => ({
  use: () => ({ ...config, children: config.children?.map((route) => customRouteToRoute(route)) }),
  path: (...args) => createTypeSafePath(createPath(...args)),
});
