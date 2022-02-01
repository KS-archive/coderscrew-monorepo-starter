import { loadNamespace } from '@/services/i18n';
import { defineRoute } from '@/services/routing';

import { UnauthorizedGuard } from '../../guards/unauthorized.guard';

export const signInRoute = defineRoute({
  path: '/sign-in',
  createPath: () => '/sign-in',
  element: async () => {
    const [module] = await Promise.all([import('./sign-in'), loadNamespace('auth')]);

    return (
      <UnauthorizedGuard>
        <module.SignIn />
      </UnauthorizedGuard>
    );
  },
});
