import { ApiError, FetchErrorType } from 'openapi-typescript-fetch';
import type { TypedFetch } from 'openapi-typescript-fetch/dist/cjs/types';

import type { InferClass, Values } from '@ccms/typings';

import { components } from '../generated/schema';
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  UnauthorizedError,
  UndocumentedServerError,
  UnknownError,
} from '../responses/error.responses';

const errors = {
  400: BadRequestError,
  401: UnauthorizedError,
  409: ConflictError,
  500: InternalServerError,
};

type Errors = {
  [K in keyof typeof errors]: InferClass<typeof errors[K]>;
};

const isInErrors = (num: number): num is keyof Errors => num in errors;

const handleUnspecifiedError = (error: unknown) => {
  return error instanceof ApiError
    ? new UndocumentedServerError(error.message, error)
    : new UnknownError(error instanceof Error ? error.message : undefined, error);
};

/* eslint-disable @typescript-eslint/no-explicit-any */

export const handleApiErrors =
  <Fetch extends TypedFetch<any>>(typedFetch: Fetch) =>
  (error: unknown) => {
    if (error instanceof typedFetch.Error) {
      const typedError = error.getActualType();
      const { status, data } = typedError as { status: number; data: components['schemas']['HttpErrorBody'] };

      if (isInErrors(status)) {
        return new errors[status](data.message, error) as Values<{
          [K in FetchErrorType<Fetch>['status'] & keyof Errors]: Errors[K];
        }>;
      }
    }

    return handleUnspecifiedError(error);
  };

/* eslint-enable @typescript-eslint/no-explicit-any */
