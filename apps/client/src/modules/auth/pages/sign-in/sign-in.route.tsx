import { Routing } from '@/services/routing';

import { UnauthorizedGuard } from '../../guards/unauthorized.guard';

export const signInRoute = Routing.defineRoute({
  path: '/sign-in',
  element: () =>
    import('./sign-in').then((module) => (
      <UnauthorizedGuard>
        <module.SignIn />
      </UnauthorizedGuard>
    )),
  createPath: () => '/sign-in',
});
