import { Link } from './components/link';
import { Redirect } from './components/redirect';
import { useNavigate } from './hooks/use-navigate';
import { useParams } from './hooks/use-params';
import { useQueryParams } from './hooks/use-query-params';
import { RoutingProvider } from './routing.provider';
import { defineRoute } from './utils/define-route';
import { defineRoutes } from './utils/define-routes';

export type { TypeSafePath } from './routing.types';

export const Routing = {
  Provider: RoutingProvider,
  Link,
  Redirect,
  useNavigate,
  useParams,
  useQueryParams,
  defineRoute,
  defineRoutes,
};
