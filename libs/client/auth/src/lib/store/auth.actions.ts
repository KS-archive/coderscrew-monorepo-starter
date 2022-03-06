import { loginRequest, logoutRequest, meRequest, registerRequest } from '@ccms/api';
import { getFixedT } from '@ccms/client/i18n';
import { toast } from '@ccms/ui';

import { authSlice } from './auth.slice';

const getCurrentUser = async (loadingToastId?: string) => {
  const result = await meRequest();

  if (loadingToastId) {
    toast.dismiss(loadingToastId);
  }

  if (result.isOk()) {
    authSlice.setState({ user: result.value.data, error: null }, true, 'getCurrentUser / success');
  } else {
    authSlice.setState({ user: null, error: result.error }, true, 'getCurrentUser / failure');
  }
};

const login = async (...args: Parameters<typeof loginRequest>) => {
  const t = await getFixedT('auth', { keyPrefix: 'actions.login' });
  const loginToastId = toast.loading(t('loading'));

  const result = await loginRequest(...args);

  if (result.isOk()) {
    authSlice.setState({ error: null }, false, 'login / success');
    await getCurrentUser(loginToastId);
    toast.success(t('success'));
  } else {
    authSlice.setState(() => ({ user: null, error: result.error }), true, 'login / failure');
    toast.error(result.error.code === 401 ? t('unauthorizedError') : t('error'));
  }
};

const logout = async () => {
  const t = await getFixedT('auth', { keyPrefix: 'actions.logout' });
  const logoutToastId = toast.loading(t('loading'));
  const result = await logoutRequest();

  toast.dismiss(logoutToastId);

  if (result.isOk()) {
    authSlice.setState(() => ({ user: null, error: null }), true, 'logout / success');
    toast.success(t('success'));
  } else {
    authSlice.setState(() => ({ user: null, error: result.error }), true, 'logout / failure');
    toast.error(t('error'));
  }
};

const register = async (...args: Parameters<typeof registerRequest>) => {
  const t = await getFixedT('auth', { keyPrefix: 'actions.register' });
  const registerToastId = toast.loading(t('loading'));
  const result = await registerRequest(...args);

  toast.dismiss(registerToastId);

  if (result.isOk()) {
    authSlice.setState({ error: null }, false, 'register / success');
    toast.success(t('success'));
  } else {
    authSlice.setState(() => ({ user: null, error: result.error }), true, 'register / failure');
    toast.error(result.error.code === 409 ? t('conflictError') : t('error'));
  }
};

export const authActions = { login, logout, register, getCurrentUser };
