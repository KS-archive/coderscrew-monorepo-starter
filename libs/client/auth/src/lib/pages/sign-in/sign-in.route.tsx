import { loadNamespace } from '@ccms/client/i18n';
import { defineRoute } from '@ccms/client/routing';

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
