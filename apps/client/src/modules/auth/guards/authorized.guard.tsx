import type { ReactElement } from 'react';

import { Redirect } from '@/services/routing';

import { signInRoute } from '../pages/sign-in';
import { authSelectors } from '../store/auth.selectors';

interface AuthorizedGuardProps {
  children: ReactElement;
}

export const AuthorizedGuard = ({ children }: AuthorizedGuardProps) =>
  authSelectors.useIsUserAuthorized() ? children : <Redirect to={signInRoute.path()} replace />;
