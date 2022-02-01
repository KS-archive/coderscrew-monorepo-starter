import { Suspense } from 'react';

import { defineRoute } from '@/services/routing';

import { UnauthorizedGuard } from '../../guards/unauthorized.guard';

export const signUpRoute = defineRoute({
  path: '/sign-up',
  element: () =>
    import('./sign-up').then((module) => (
      <UnauthorizedGuard>
        <Suspense fallback={false}>
          <module.SignUp />
        </Suspense>
      </UnauthorizedGuard>
    )),
  createPath: () => '/sign-up',
});
