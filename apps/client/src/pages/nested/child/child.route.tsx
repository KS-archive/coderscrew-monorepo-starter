import { defineRoute } from '@/services/routing';

import { createNestedRoutePath } from '../nested.route-utils';

export const childRoute = defineRoute({
  path: '/child',
  element: () => import('./child').then((module) => <module.Child />),
  createPath: () => `${createNestedRoutePath()}/child`,
});
