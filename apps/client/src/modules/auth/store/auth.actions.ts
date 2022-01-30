import { loginRequest, logoutRequest, meRequest, registerRequest } from '@ccms/api';

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
  const loginToastId = toast.loading('Logging in...');

  const result = await loginRequest(...args);

  toast.dismiss(loginToastId);

  if (result.isOk()) {
    authSlice.setState({ error: undefined }, false, 'login / success');
    await getCurrentUser();
    toast.success('Login successful');
  } else {
    authSlice.setState(() => ({ user: undefined, error: result.error }), true, 'login / failure');

    if (result.error.code === 401) {
      toast.error("Account with provided e-mail and password doesn't exist");
    } else {
      toast.error('Error when logging in');
    }
  }
};

const logout = async () => {
  const logoutToastId = toast.loading('Logging out...');
  const result = await logoutRequest();

  toast.dismiss(logoutToastId);

  if (result.isOk()) {
    authSlice.setState(() => ({ user: undefined, error: undefined }), true, 'logout / success');
    toast.success('Logout successful');
  } else {
    authSlice.setState(() => ({ user: undefined, error: result.error }), true, 'logout / failure');
    toast.error('Error when logging out');
  }
};

const register = async (...args: Parameters<typeof registerRequest>) => {
  const registerToastId = toast.loading('Creating account...');
  const result = await registerRequest(...args);

  toast.dismiss(registerToastId);

  if (result.isOk()) {
    authSlice.setState({ error: undefined }, false, 'register / success');
    toast.success('Account created. You can now log in to the app');
  } else {
    authSlice.setState(() => ({ user: undefined, error: result.error }), true, 'register / failure');

    if (result.error.code === 409) {
      toast.error('Account with provided e-mail already exists');
    } else {
      toast.error('Error when creating account');
    }
  }
};

export const authActions = { login, logout, register, getCurrentUser };
