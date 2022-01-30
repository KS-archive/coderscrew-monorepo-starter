import { Routing } from '@/services/routing';

import { UnauthorizedGuard } from '../../guards/unauthorized.guard';

export const signUpRoute = Routing.defineRoute({
  path: '/sign-up',
  element: () =>
    import('./sign-up').then((module) => (
      <UnauthorizedGuard>
        <module.SignUp />
      </UnauthorizedGuard>
    )),
  createPath: () => '/sign-up',
});
