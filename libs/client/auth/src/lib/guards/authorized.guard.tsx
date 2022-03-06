import { ReactElement } from 'react';
import { useAsync } from 'react-use';

import { Redirect } from '@ccms/client/routing';

import { signInRoute } from '../pages/sign-in';
import { authSelectors } from '../store/auth.selectors';

interface AuthorizedGuardProps {
  children: ReactElement;
}

const signInPath = signInRoute.path();

export const AuthorizedGuard = ({ children }: AuthorizedGuardProps) => {
  useAsync(async () => {
    await signInPath.preload();
  });

  return authSelectors.useIsUserAuthorized() ? children : <Redirect to={signInPath} replace />;
};
