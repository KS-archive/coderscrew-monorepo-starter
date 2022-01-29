import type { Route } from 'react-location';

import type { CustomRoute } from '../routing.types';

export const customRouteToRoute = (route: CustomRoute): Route => route.use();
