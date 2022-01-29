import { Auth } from '@/modules/auth';
import { defineRoute } from '@/services/routing';

export const dashboardRoute = defineRoute({
  path: '/',
  element: () =>
    import('./dashboard').then((module) => (
      <Auth.Guard.Authorized>
        <module.Dashboard />
      </Auth.Guard.Authorized>
    )),
  createPath: () => '/',
});
