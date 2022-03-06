import axios from 'axios';
import { ResultAsync } from 'neverthrow';
import { z } from 'zod';

import { ConflictError } from '../../../utils/error.responses';
import { handleRequestError } from '../../../utils/handle-request-error';
import { httpClient } from '../../../utils/http-client';
import { CreatedSuccess } from '../../../utils/success.responses';
import { accountSchema } from '../schemas/account.schema';

export const registerBodySchema = accountSchema.pick({ email: true, password: true });

export type RegisterBody = z.infer<typeof registerBodySchema>;

export const registerResponseSchema = accountSchema.omit({ password: true });

export type RegisterResponse = z.infer<typeof registerResponseSchema>;

export const registerRequest = (body: RegisterBody) =>
  ResultAsync.fromPromise(
    httpClient.post<RegisterResponse>('/auth/register', body).then((response) => new CreatedSuccess(response.data)),
    (error) =>
      axios.isAxiosError(error) && error.response?.status === 409
        ? new ConflictError(error.message)
        : handleRequestError(error)
  );
