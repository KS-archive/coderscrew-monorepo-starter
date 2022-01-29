import { Route } from 'react-location';

import type { AnyFunctionWithReturnType } from '@ccms/typings';

export type CreatePathFc = AnyFunctionWithReturnType<string>;

export type TypeSafePath = ReturnType<typeof import('./utils/create-type-safe-path').createTypeSafePath>;

export type CustomRoute<CreatePath extends CreatePathFc = CreatePathFc> = {
  use: () => Route;
  path: (...args: Parameters<CreatePath>) => TypeSafePath;
};
