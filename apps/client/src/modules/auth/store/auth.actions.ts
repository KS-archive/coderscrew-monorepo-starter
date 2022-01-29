import { loginRequest, logoutRequest, meRequest, registerRequest } from '@ccms/api';

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
  const result = await loginRequest(...args);

  if (result.isOk()) {
    authSlice.setState({ error: undefined }, false, 'login / success');
    await getCurrentUser();
  } else {
    authSlice.setState(() => ({ user: undefined, error: result.error }), true, 'login / failure');
  }
};

const logout = async () => {
  const result = await logoutRequest();

  if (result.isOk()) {
    authSlice.setState(() => ({ user: undefined, error: undefined }), true, 'logout / success');
  } else {
    authSlice.setState(() => ({ user: undefined, error: result.error }), true, 'logout / failure');
  }
};

const register = async (...args: Parameters<typeof registerRequest>) => {
  const result = await registerRequest(...args);

  if (result.isOk()) {
    authSlice.setState({ error: undefined }, false, 'register / success');
  } else {
    authSlice.setState(() => ({ user: undefined, error: result.error }), true, 'register / failure');
  }
};

export const authActions = { login, logout, register, getCurrentUser };
