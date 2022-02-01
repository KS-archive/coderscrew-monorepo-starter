import { loadNamespace } from '@/services/i18n';
import { defineRoute } from '@/services/routing';

import { UnauthorizedGuard } from '../../guards/unauthorized.guard';

export const signUpRoute = defineRoute({
  path: '/sign-up',
  createPath: () => '/sign-up',
  element: async () => {
    const [module] = await Promise.all([import('./sign-up'), loadNamespace('auth')]);

    return (
      <UnauthorizedGuard>
        <module.SignUp />
      </UnauthorizedGuard>
    );
  },
});
