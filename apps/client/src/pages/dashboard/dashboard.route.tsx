import { defineRoute } from '@/services/routing';

export const dashboardRoute = defineRoute({
  path: '/',
  element: () => import('./dashboard').then((module) => <module.Dashboard />),
  createPath: () => '/',
});
