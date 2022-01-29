import { ReactNode } from 'react';
import { useAsync } from 'react-use';
import create from 'zustand';
import createContext from 'zustand/context';

import type { TypeSafePath } from '@/services/routing';

import { authActions } from './store/auth.actions';

const { Provider, useStore } = createContext<AuthModuleConfig>();

interface AuthModuleConfig {
  unauthorizedPath: TypeSafePath;
}

interface AuthModuleProviderProps extends AuthModuleConfig {
  children: ReactNode;
}

export const useAuthModuleConfig = useStore;

export const AuthModuleProvider = ({ children, ...config }: AuthModuleProviderProps) => {
  useAsync(() => authActions.getCurrentUser(), []);

  return <Provider createStore={() => create(() => config)}>{children}</Provider>;
};
