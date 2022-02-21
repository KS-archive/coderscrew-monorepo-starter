import { Navigate } from 'react-router-dom';

import type { RoutePath } from '../route-path';

interface RedirectProps {
  to: RoutePath;
  replace?: boolean;
}

export const Redirect = ({ to, replace }: RedirectProps) => <Navigate replace={replace} to={to.url} />;
