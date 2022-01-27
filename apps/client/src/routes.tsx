import { accountRoute } from './pages/account/account.route';
import { dashboardRoute } from './pages/dashboard/dashboard.route';
import { nestedRoute } from './pages/nested/nested.route';
import { searchRoute } from './pages/search/search.route';
import { signInRoute } from './pages/sign-in';
import { signUpRoute } from './pages/sign-up';
import { defineRoutes } from './services/routing';

export const routes = defineRoutes([
  dashboardRoute.use('/'),
  accountRoute.use('/account/:accountId'),
  searchRoute.use('/search'),
  nestedRoute.use('/nested'),
  signInRoute.use('/sign-in'),
  signUpRoute.use('/sign-up'),
]);
