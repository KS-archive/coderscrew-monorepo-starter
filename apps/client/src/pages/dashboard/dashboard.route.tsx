import { AuthorizedGuard } from '@/modules/auth';
import { defineRoute } from '@/services/routing';

export const dashboardRoute = defineRoute({
  path: '/',
  element: () =>
    import('./dashboard').then((module) => (
      <AuthorizedGuard>
        <module.Dashboard />
      </AuthorizedGuard>
    )),
  createPath: () => '/',
});
