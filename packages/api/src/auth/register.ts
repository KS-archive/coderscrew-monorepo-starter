import { ResultAsync } from 'neverthrow';

import { handleApiErrors, httpClient } from '@/client';
import { CreatedSuccess } from '@/responses';

const register = httpClient.path('/auth/register').method('post').create();

export const registerRequest = async (...args: Parameters<typeof register>) =>
  ResultAsync.fromPromise(
    register(...args).then((response) => new CreatedSuccess(response.data, response)),
    handleApiErrors(register)
  );

registerRequest.path = '/auth/register' as const;
registerRequest.method = 'post' as const;
