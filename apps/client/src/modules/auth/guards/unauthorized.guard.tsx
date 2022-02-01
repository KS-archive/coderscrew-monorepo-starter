import type { ReactElement } from 'react';

import { Redirect } from '@/services/routing';

import { authModuleConfig } from '../auth.config';
import { authSelectors } from '../store/auth.selectors';

interface UnauthorizedGuardProps {
  children: ReactElement;
}

export const UnauthorizedGuard = ({ children }: UnauthorizedGuardProps) =>
  authSelectors.useIsUserAuthorized() ? <Redirect to={authModuleConfig.get('authorizedPath')} replace /> : children;
