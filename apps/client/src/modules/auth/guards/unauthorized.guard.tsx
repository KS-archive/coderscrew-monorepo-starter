import type { ReactElement } from 'react';

import { Redirect } from '@/services/routing';

import { useAuthModuleConfig } from '../auth.provider';
import { authSelectors } from '../store/auth.selectors';

interface UnauthorizedGuardProps {
  children: ReactElement;
}

export const UnauthorizedGuard = ({ children }: UnauthorizedGuardProps) => {
  const unauthorizedPath = useAuthModuleConfig((state) => state.unauthorizedPath);

  return authSelectors.useIsUserAuthorized() ? <Redirect to={unauthorizedPath} replace /> : children;
};
