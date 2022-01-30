import type { ReactElement } from 'react';

import { Routing } from '@/services/routing';

import { authModuleConfig } from '../auth.config';
import { authSelectors } from '../store/auth.selectors';

interface UnauthorizedGuardProps {
  children: ReactElement;
}

export const UnauthorizedGuard = ({ children }: UnauthorizedGuardProps) =>
  authSelectors.useIsUserAuthorized() ? (
    <Routing.Redirect to={authModuleConfig.get('unauthorizedPath')} replace />
  ) : (
    children
  );
