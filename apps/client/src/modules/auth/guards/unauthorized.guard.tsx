import type { ReactElement } from 'react';

import { useAsync } from '@/hooks';
import { Redirect } from '@/services/routing';

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
