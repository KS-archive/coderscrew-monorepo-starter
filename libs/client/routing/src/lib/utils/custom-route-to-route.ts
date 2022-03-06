import type { RouteObject } from 'react-router-dom';

import type { CustomRoute } from '../routing.types';

export const customRouteToRoute = (route: CustomRoute): RouteObject => route.use();
