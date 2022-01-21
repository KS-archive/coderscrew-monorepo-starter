import { ResultAsync } from 'neverthrow';

import { httpClient } from '@/http-client';
import { CreatedSuccess, handleApiErrors } from '@/responses';

const register = httpClient.path('/auth/register').method('post').create();

export const registerRequest = async (...args: Parameters<typeof register>) =>
  ResultAsync.fromPromise(
    register(...args).then((response) => new CreatedSuccess(response.data, response)),
    handleApiErrors(register)
  );
