import type { TypeSafePath } from '@/services/routing';

import { authActions } from './store/auth.actions';

interface AuthModuleConfig {
  authorizedPath: TypeSafePath;
}

const createAuthModuleConfig = () => {
  let isInitialized = false;
  let authModuleConfig = {} as AuthModuleConfig;

  const initialize = (config: AuthModuleConfig) => {
    isInitialized = true;
    authModuleConfig = config;

    authActions.getCurrentUser().catch(console.error);
  };

  const get = <Key extends keyof AuthModuleConfig>(key: Key): AuthModuleConfig[Key] => {
    if (!isInitialized) {
      throw new Error('You need to initialize AuthModule in order to use it');
    }

    return authModuleConfig[key];
  };

  return { initialize, get };
};

export const authModuleConfig = createAuthModuleConfig();
