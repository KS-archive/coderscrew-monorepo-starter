import { AuthorizedGuard } from '@ccms/client/auth';
import { loadNamespace } from '@ccms/client/i18n';
import { defineRoute } from '@ccms/client/routing';

export const dashboardRoute = defineRoute({
  path: '/',
  createPath: () => '/',
  element: async () => {
    const [module] = await Promise.all([import('./dashboard'), loadNamespace('dashboard')]);

    return (
      <AuthorizedGuard>
        <module.Dashboard />
      </AuthorizedGuard>
    );
  },
});
