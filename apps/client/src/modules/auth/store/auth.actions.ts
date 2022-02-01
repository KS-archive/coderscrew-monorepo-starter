import { loginRequest, logoutRequest, meRequest, registerRequest } from '@ccms/api';

import { getFixedT } from '@/services/i18n';
import { toast } from '@/services/toasts';

import { authSlice } from './auth.slice';

const getCurrentUser = async () => {
  const result = await meRequest();

  if (result.isOk()) {
    const user = result.value.code === 200 ? result.value.data : undefined;

    authSlice.setState({ user, error: undefined }, true, 'getCurrentUser / success');
  } else {
    authSlice.setState({ user: undefined, error: result.error }, true, 'getCurrentUser / failure');
  }
};

const login = async (...args: Parameters<typeof loginRequest>) => {
  const t = await getFixedT('auth', { keyPrefix: 'actions.login' });
  const loginToastId = toast.loading(t('loading'));

  const result = await loginRequest(...args);

  toast.dismiss(loginToastId);

  if (result.isOk()) {
    authSlice.setState({ error: undefined }, false, 'login / success');
    await getCurrentUser();
    toast.success(t('success'));
  } else {
    authSlice.setState(() => ({ user: undefined, error: result.error }), true, 'login / failure');
    toast.error(result.error.code === 401 ? t('unauthorizedError') : t('error'));
  }
};

const logout = async () => {
  const t = await getFixedT('auth', { keyPrefix: 'actions.logout' });
  const logoutToastId = toast.loading(t('loading'));
  const result = await logoutRequest();

  toast.dismiss(logoutToastId);

  if (result.isOk()) {
    authSlice.setState(() => ({ user: undefined, error: undefined }), true, 'logout / success');
    toast.success(t('success'));
  } else {
    authSlice.setState(() => ({ user: undefined, error: result.error }), true, 'logout / failure');
    toast.error(t('error'));
  }
};

const register = async (...args: Parameters<typeof registerRequest>) => {
  const t = await getFixedT('auth', { keyPrefix: 'actions.register' });
  const registerToastId = toast.loading(t('loading'));
  const result = await registerRequest(...args);

  toast.dismiss(registerToastId);

  if (result.isOk()) {
    authSlice.setState({ error: undefined }, false, 'register / success');
    toast.success('success');
  } else {
    authSlice.setState(() => ({ user: undefined, error: result.error }), true, 'register / failure');
    toast.error(result.error.code === 409 ? t('conflictError') : t('error'));
  }
};

export const authActions = { login, logout, register, getCurrentUser };
