import { Routing } from '@/services/routing';

export type AccountRouteParams = {
  accountId: string;
};

export const accountRoute = Routing.defineRoute({
  path: '/account/:accountId',
  element: () => import('./account').then((module) => <module.Account />),
  createPath: (accountId: number) => `/account/${accountId}`,
});
