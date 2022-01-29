import { defineRoute } from '@/services/routing';

import { UnauthorizedGuard } from '../../guards/unauthorized.guard';

export const signInRoute = defineRoute({
  path: '/sign-in',
  element: () =>
    import('./sign-in').then((module) => (
      <UnauthorizedGuard>
        <module.SignIn />
      </UnauthorizedGuard>
    )),
  createPath: () => '/sign-in',
});
