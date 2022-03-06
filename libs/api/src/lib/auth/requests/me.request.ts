import { ResultAsync } from 'neverthrow';
import { z } from 'zod';

import { handleRequestError } from '../../../utils/handle-request-error';
import { httpClient } from '../../../utils/http-client';
import { OkSuccess } from '../../../utils/success.responses';
import { accountSchema } from '../schemas/account.schema';

export const meResponseSchema = accountSchema.omit({ password: true }).or(z.null());

export type MeResponse = z.infer<typeof meResponseSchema>;

export const meRequest = () =>
  ResultAsync.fromPromise(
    httpClient.get<MeResponse>('/auth/me').then((response) => new OkSuccess(response.data)),
    handleRequestError
  );
