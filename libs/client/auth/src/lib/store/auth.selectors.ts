import { authSlice } from './auth.slice';

const useAuthorizedUser = () => authSlice((state) => state.user);

const useIsUserAuthorized = () => authSlice((state) => Boolean(state.user));

export const authSelectors = { useAuthorizedUser, useIsUserAuthorized };
