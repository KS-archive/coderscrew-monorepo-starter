import { ResultAsync } from 'neverthrow';

import { handleApiErrors, httpClient } from '@/client';
import { NoContentSuccess } from '@/responses';

const logout = httpClient.path('/auth/logout').method('post').create();

export const logoutRequest = async () =>
  ResultAsync.fromPromise(
    logout({}).then((response) => new NoContentSuccess(response)),
    handleApiErrors(logout)
  );

logoutRequest.path = '/auth/logout' as const;
logoutRequest.method = 'post' as const;
