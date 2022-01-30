import { Auth } from '@/modules/auth';
import { Routing } from '@/services/routing';

export const dashboardRoute = Routing.defineRoute({
  path: '/',
  element: () =>
    import('./dashboard').then((module) => (
      <Auth.Guard.Authorized>
        <module.Dashboard />
      </Auth.Guard.Authorized>
    )),
  createPath: () => '/',
});
