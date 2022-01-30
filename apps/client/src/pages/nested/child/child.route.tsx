import { Routing } from '@/services/routing';

import { createNestedRoutePath } from '../nested.route-utils';

export const childRoute = Routing.defineRoute({
  path: '/child',
  element: () => import('./child').then((module) => <module.Child />),
  createPath: () => `${createNestedRoutePath()}/child`,
});
