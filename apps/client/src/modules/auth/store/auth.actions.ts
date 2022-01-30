import { loginRequest, logoutRequest, meRequest, registerRequest } from '@ccms/api';

import { Toasts } from '@/services/toasts';

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
  const loginToastId = Toasts.loading('Logging in...');

  const result = await loginRequest(...args);

  Toasts.dismiss(loginToastId);

  if (result.isOk()) {
    authSlice.setState({ error: undefined }, false, 'login / success');
    await getCurrentUser();
    Toasts.success('Login successful');
  } else {
    authSlice.setState(() => ({ user: undefined, error: result.error }), true, 'login / failure');

    if (result.error.code === 401) {
      Toasts.error("Account with provided e-mail and password doesn't exist");
    } else {
      Toasts.error('Error when logging in');
    }
  }
};

const logout = async () => {
  const logoutToastId = Toasts.loading('Logging out...');
  const result = await logoutRequest();

  Toasts.dismiss(logoutToastId);

  if (result.isOk()) {
    authSlice.setState(() => ({ user: undefined, error: undefined }), true, 'logout / success');
    Toasts.success('Logout successful');
  } else {
    authSlice.setState(() => ({ user: undefined, error: result.error }), true, 'logout / failure');
    Toasts.error('Error when logging out');
  }
};

const register = async (...args: Parameters<typeof registerRequest>) => {
  const registerToastId = Toasts.loading('Creating account...');
  const result = await registerRequest(...args);

  Toasts.dismiss(registerToastId);

  if (result.isOk()) {
    authSlice.setState({ error: undefined }, false, 'register / success');
    Toasts.success('Account created. You can now log in to the app');
  } else {
    authSlice.setState(() => ({ user: undefined, error: result.error }), true, 'register / failure');

    if (result.error.code === 409) {
      Toasts.error('Account with provided e-mail already exists');
    } else {
      Toasts.error('Error when creating account');
    }
  }
};

export const authActions = { login, logout, register, getCurrentUser };
