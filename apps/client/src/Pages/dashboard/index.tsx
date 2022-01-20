import { createPath } from '@/routing/utils';

export { Dashboard } from './dashboard.route';

export const dashboardModule = {
  path: 'dashboard' as const,
  element: () => import('./dashboard.route').then((module) => <module.Dashboard />),
};

export const homeModule = {
  path: '/' as const,
  element: dashboardModule.element,
};

export const dashboardPaths = createPath(dashboardModule.path);

export const homePaths = createPath(homeModule.path);
