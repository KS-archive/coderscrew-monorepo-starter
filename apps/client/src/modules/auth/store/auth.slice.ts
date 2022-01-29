import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface StoreError {
  code: number;
  name: string;
  message: string;
}

interface User {
  id: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user?: User;
  error?: StoreError;
}

const initialState: AuthState = {
  user: undefined,
  error: undefined,
};

export const authSlice = create(
  devtools(() => initialState, { name: 'AuthModule', serialize: { options: { undefined: true } } })
);
