import type { Route } from 'react-location';

import { AnyFunctionWithReturnType, opaque } from '@ccms/typings';

type CreatePathFc = AnyFunctionWithReturnType<string>;

interface RouteConfig<CreatePath extends CreatePathFc = CreatePathFc> extends Route {
  createPath: CreatePath;
}

const typeSafePath = opaque<string, 'TypeSafePath'>();

export type TypeSafePath = ReturnType<typeof typeSafePath.create>;

export const defineRoute = <CreatePath extends CreatePathFc>({ createPath, ...config }: RouteConfig<CreatePath>) => ({
  use: (): Route => config,
  path: (...args: Parameters<CreatePath>): TypeSafePath => typeSafePath.create(createPath(...args)),
});

export const defineRoutes = (routes: Route[]) => routes;
