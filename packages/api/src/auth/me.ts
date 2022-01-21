import { ResultAsync } from 'neverthrow';

import { handleApiErrors, httpClient } from '@/client';
import { NoContentSuccess, OkSuccess } from '@/responses';

const me = httpClient.path('/auth/me').method('get').create();

export const meRequest = async (init?: RequestInit) =>
  ResultAsync.fromPromise(
    me({}, init).then((response) =>
      response.status === 200 ? new OkSuccess(response.data, response) : new NoContentSuccess(response)
    ),
    handleApiErrors(me)
  );

meRequest.path = '/auth/me' as const;
meRequest.method = 'get' as const;
