import type { ReactElement } from 'react';

import { Routing } from '@/services/routing';

import { signInRoute } from '../pages/sign-in';
import { authSelectors } from '../store/auth.selectors';

interface AuthorizedGuardProps {
  children: ReactElement;
}

export const AuthorizedGuard = ({ children }: AuthorizedGuardProps) =>
  authSelectors.useIsUserAuthorized() ? children : <Routing.Redirect to={signInRoute.path()} replace />;
