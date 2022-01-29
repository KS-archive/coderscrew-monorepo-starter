import type { Route } from 'react-location';

import type { CustomRoute } from '../routing.types';
import { customRouteToRoute } from './custom-route-to-route';

export const defineRoutes = (routes: CustomRoute[]): Route[] => routes.map((route) => customRouteToRoute(route));
