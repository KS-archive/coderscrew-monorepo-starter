import { ResultAsync } from 'neverthrow';

import { handleApiErrors, httpClient } from '@/client';
import { NoContentSuccess } from '@/responses';

const login = httpClient.path('/auth/login').method('post').create();

export const loginRequest = async (...args: Parameters<typeof login>) =>
  ResultAsync.fromPromise(
    login(...args).then((response) => new NoContentSuccess(response)),
    handleApiErrors(login)
  );

loginRequest.path = '/auth/login' as const;
loginRequest.method = 'post' as const;
