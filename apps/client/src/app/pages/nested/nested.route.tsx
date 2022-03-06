import { defineRoute } from '@ccms/client/routing';

export const nestedRoute = defineRoute({
  path: '/nested',
  createPath: () => '/nested',
  element: () => import('./nested').then((module) => <module.Nested />),
});
