import { Routing } from '@/services/routing';

import { childRoute } from './child/child.route';
import { createNestedRoutePath } from './nested.route-utils';

export const nestedRoute = Routing.defineRoute({
  path: '/nested',
  element: () => import('./nested').then((module) => <module.Nested />),
  createPath: createNestedRoutePath,
  children: [childRoute],
});
