import create from 'zustand';
import { devtools } from 'zustand/middleware';

import type { MeResponse } from '@ccms/api';

interface StoreError {
  code: number;
  name: string;
  message: string;
}

type User = MeResponse;

interface AuthState {
  user: User | null;
  error: StoreError | null;
}

const initialState: AuthState = {
  user: null,
  error: null,
};

export const authSlice = create(devtools(() => initialState, { name: 'AuthModule' }));
