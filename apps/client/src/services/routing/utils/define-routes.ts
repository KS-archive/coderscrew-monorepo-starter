import type { RouteObject } from 'react-router-dom';

import type { CustomRoute } from '../routing.types';
import { customRouteToRoute } from './custom-route-to-route';

export const defineRoutes = (routes: CustomRoute[]): RouteObject[] => routes.map((route) => customRouteToRoute(route));
