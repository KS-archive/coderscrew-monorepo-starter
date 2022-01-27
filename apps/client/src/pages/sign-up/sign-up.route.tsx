import { defineRoute } from '@/services/routing';

export const signUpRoute = defineRoute({
  path: '/sign-up',
  element: () => import('./sign-up').then((module) => <module.SignUp />),
  createPath: () => '/sign-up',
});
