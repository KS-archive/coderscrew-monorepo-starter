import { AuthorizedGuard } from '@/modules/auth';
import { loadNamespace } from '@/services/i18n';
import { defineRoute } from '@/services/routing';

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
