import { defineRoute } from '@/services/routing';

import { childRoute } from './child/child.route';
import { createNestedRoutePath } from './nested.route-utils';

export const nestedRoute = defineRoute({
  path: '/nested',
  element: () => import('./nested').then((module) => <module.Nested />),
  createPath: createNestedRoutePath,
  children: [childRoute.use('/child')],
});
