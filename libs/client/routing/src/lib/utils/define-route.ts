import { createElement, ReactElement } from 'react';
import type { RouteObject } from 'react-router-dom';
import loadable from '@loadable/component';

import { RoutePath } from '../route-path';
import type { CreatePathFc, CustomRoute } from '../routing.types';
import { customRouteToRoute } from './custom-route-to-route';

interface RouteConfig<CreatePath extends CreatePathFc = CreatePathFc> {
  path: string;
  element: () => Promise<ReactElement>;
  children?: CustomRoute[];
  createPath: CreatePath;
}

const createLoadableComponent = (element: () => Promise<ReactElement>) =>
  loadable(async () => {
    const el = await element();

    return () => el;
  });

export const defineRoute = <CreatePath extends CreatePathFc>({
  path,
  element,
  children,
  createPath,
}: RouteConfig<CreatePath>): CustomRoute<CreatePath> => {
  const component = createLoadableComponent(element);
  const customRoute: RouteObject = {
    path,
    element: createElement(component),
    children: children?.map((route) => customRouteToRoute(route)),
  };

  return {
    use: () => customRoute,
    path: (...args) => new RoutePath(createPath(...args), component),
  };
};
