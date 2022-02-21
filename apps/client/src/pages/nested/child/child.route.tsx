import { defineRoute } from '@/services/routing';

import { nestedRoute } from '../nested.route';

export const childRoute = defineRoute({
  path: `${nestedRoute.path().url}/child`,
  createPath: () => `${nestedRoute.path().url}/child`,
  element: () => import('./child').then((module) => <module.Child />),
});
