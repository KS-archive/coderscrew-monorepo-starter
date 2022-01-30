import { Auth } from './modules/auth';
import { accountRoute } from './pages/account/account.route';
import { dashboardRoute } from './pages/dashboard/dashboard.route';
import { nestedRoute } from './pages/nested/nested.route';
import { searchRoute } from './pages/search/search.route';
import { Routing } from './services/routing';

export const routes = Routing.defineRoutes([
  dashboardRoute,
  accountRoute,
  searchRoute,
  nestedRoute,
  Auth.routes.signIn,
  Auth.routes.signUp,
]);
