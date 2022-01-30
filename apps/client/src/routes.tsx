import { signInRoute, signUpRoute } from './modules/auth';
import { accountRoute } from './pages/account/account.route';
import { dashboardRoute } from './pages/dashboard/dashboard.route';
import { nestedRoute } from './pages/nested/nested.route';
import { searchRoute } from './pages/search/search.route';
import { defineRoutes } from './services/routing';

export const routes = defineRoutes([dashboardRoute, accountRoute, searchRoute, nestedRoute, signInRoute, signUpRoute]);
