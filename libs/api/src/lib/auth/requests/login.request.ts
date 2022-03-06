import axios from 'axios';
import { ResultAsync } from 'neverthrow';
import { z } from 'zod';

import { UnauthorizedError } from '../../../utils/error.responses';
import { handleRequestError } from '../../../utils/handle-request-error';
import { httpClient } from '../../../utils/http-client';
import { NoContentSuccess } from '../../../utils/success.responses';
import { accountSchema } from '../schemas/account.schema';

export const loginBodySchema = accountSchema.pick({ email: true, password: true });

export type LoginBody = z.infer<typeof loginBodySchema>;

export const loginResponseSchema = z.null();

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const loginRequest = (body: LoginBody) =>
  ResultAsync.fromPromise(
    httpClient.post<LoginResponse>('/auth/login', body).then(() => new NoContentSuccess()),
    (error) =>
      axios.isAxiosError(error) && error.response?.status === 401
        ? new UnauthorizedError(error.message)
        : handleRequestError(error)
  );
