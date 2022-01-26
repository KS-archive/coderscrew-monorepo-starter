import type { Route } from 'react-location';

import { AnyFunctionWithReturnType, opaque } from '@ccms/typings';

type CreatePathFc = AnyFunctionWithReturnType<string>;

interface RouteConfig<Path extends string = string, CreatePath extends CreatePathFc = CreatePathFc> extends Route {
  path: Path;
  createPath: CreatePath;
}

const typeSafePath = opaque<string, 'TypeSafePath'>();

export type TypeSafePath = ReturnType<typeof typeSafePath.create>;

export const defineRoute = <Path extends string, CreatePath extends CreatePathFc>({
  createPath,
  ...config
}: RouteConfig<Path, CreatePath>) => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  use: (_path: Path): Route => config,
  path: (...args: Parameters<CreatePath>): TypeSafePath => typeSafePath.create(createPath(...args)),
});

export const defineRoutes = (routes: Route[]) => routes;
