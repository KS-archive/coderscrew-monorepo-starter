import { defineRoute } from '@/services/routing';

export const signInRoute = defineRoute({
  path: '/sign-in',
  element: () => import('./sign-in').then((module) => <module.SignIn />),
  createPath: () => '/sign-in',
});
