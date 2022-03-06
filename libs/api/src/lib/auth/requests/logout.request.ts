import { ResultAsync } from 'neverthrow';
import { z } from 'zod';

import { handleRequestError } from '../../../utils/handle-request-error';
import { httpClient } from '../../../utils/http-client';
import { NoContentSuccess } from '../../../utils/success.responses';

export const logoutResponseSchema = z.null();

export type LogoutResponse = z.infer<typeof logoutResponseSchema>;

export const logoutRequest = () =>
  ResultAsync.fromPromise(
    httpClient.post<LogoutResponse>('/auth/logout').then(() => new NoContentSuccess()),
    handleRequestError
  );
