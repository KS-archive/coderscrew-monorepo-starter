import { signInRoute, signUpRoute } from './modules/auth';
import { accountRoute } from './pages/account/account.route';
import { dashboardRoute } from './pages/dashboard/dashboard.route';
import { childRoute } from './pages/nested/child/child.route';
import { nestedRoute } from './pages/nested/nested.route';
import { searchRoute } from './pages/search/search.route';
import { defineRoutes, RoutesList } from './services/routing';

const routes = defineRoutes([
  dashboardRoute,
  accountRoute,
  searchRoute,
  nestedRoute,
  childRoute,
  signInRoute,
  signUpRoute,
]);

export const Routes = () => <RoutesList routes={routes} />;
