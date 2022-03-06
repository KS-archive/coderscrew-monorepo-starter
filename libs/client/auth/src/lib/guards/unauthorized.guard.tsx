import type { ReactElement } from 'react';
import { useAsync } from 'react-use';

import { Redirect } from '@ccms/client/routing';

import { authModuleConfig } from '../auth.config';
import { authSelectors } from '../store/auth.selectors';

interface UnauthorizedGuardProps {
  children: ReactElement;
}

export const UnauthorizedGuard = ({ children }: UnauthorizedGuardProps) => {
  const authorizedPath = authModuleConfig.get('authorizedPath');

  useAsync(async () => {
    await authorizedPath.preload();
  });

  return authSelectors.useIsUserAuthorized() ? <Redirect to={authorizedPath} replace /> : children;
};
