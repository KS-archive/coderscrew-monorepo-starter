import { Navigate } from 'react-location';

import type { RoutePath } from '../route-path';

interface RedirectProps {
  to: RoutePath;
  replace?: boolean;
}

export const Redirect = ({ to, ...props }: RedirectProps) => <Navigate {...props} to={to.url} />;
