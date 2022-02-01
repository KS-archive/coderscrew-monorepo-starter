import { Suspense } from 'react';

import { defineRoute } from '@/services/routing';

import { UnauthorizedGuard } from '../../guards/unauthorized.guard';

export const signInRoute = defineRoute({
  path: '/sign-in',
  element: () =>
    import('./sign-in').then((module) => (
      <UnauthorizedGuard>
        <Suspense fallback={false}>
          <module.SignIn />
        </Suspense>
      </UnauthorizedGuard>
    )),
  createPath: () => '/sign-in',
});
