import { defineRoute } from '@/services/routing';

export const nestedRoute = defineRoute({
  path: '/nested',
  createPath: () => '/nested',
  element: () => import('./nested').then((module) => <module.Nested />),
});
