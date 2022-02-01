import { Suspense } from 'react';

import { AuthorizedGuard } from '@/modules/auth';
import { defineRoute } from '@/services/routing';

export const dashboardRoute = defineRoute({
  path: '/',
  element: () =>
    import('./dashboard').then((module) => (
      <AuthorizedGuard>
        <Suspense fallback={false}>
          <module.Dashboard />
        </Suspense>
      </AuthorizedGuard>
    )),
  createPath: () => '/',
});
