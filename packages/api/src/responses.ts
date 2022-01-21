// eslint-disable-next-line max-classes-per-file
import { ApiError, ApiResponse, FetchErrorType } from 'openapi-typescript-fetch';
import type { TypedFetch } from 'openapi-typescript-fetch/dist/cjs/types';

import { components } from './generated/schema';

interface HttpSuccess<Data = never> {
  readonly code: number;
  readonly name: string;
  readonly data?: Data;
  readonly meta: ApiResponse;
}

export class OkSuccess<Data> implements HttpSuccess<Data> {
  readonly code = 200;

  readonly name = 'Ok';

  constructor(readonly data: Data, readonly meta: ApiResponse) {}
}

export class CreatedSuccess<Data> implements HttpSuccess<Data> {
  readonly code = 201;

  readonly name = 'Created';

  constructor(readonly data: Data, readonly meta: ApiResponse) {}
}

export class NoContentSuccess implements HttpSuccess {
  readonly code = 204;

  readonly name = 'No Content';

  constructor(readonly meta: ApiResponse) {}
}

interface HttpError {
  readonly code: number;
  readonly name: string;
  readonly message: string;
  readonly meta?: ApiError | unknown;
}

export class BadRequestError implements HttpError {
  readonly code = 400;

  readonly name = 'Bad Request';

  constructor(readonly message: string, readonly meta: ApiError) {}
}

export class UnauthorizedError implements HttpError {
  readonly code = 401;

  readonly name = 'Unauthorized';

  constructor(readonly message: string, readonly meta: ApiError) {}
}

export class ConflictError implements HttpError {
  readonly code = 409;

  readonly name = 'Conflict';

  constructor(readonly message: string, readonly meta: ApiError) {}
}

export class InternalServerError implements HttpError {
  readonly code = 500;

  readonly name = 'Internal Server Error';

  constructor(readonly message: string, readonly meta: ApiError) {}
}

export class UndocumentedServerError implements HttpError {
  readonly code = 555;

  readonly name = 'Undocumented Server Error';

  constructor(readonly message: string, readonly meta: ApiError) {}
}

export class UnknownError implements HttpError {
  readonly code = 600;

  readonly name = 'Unknown error';

  constructor(readonly message = 'Unknown error', readonly meta: unknown = {}) {}
}

interface Errors {
  400: BadRequestError;
  401: UnauthorizedError;
  409: ConflictError;
  500: InternalServerError;
}

const errors = {
  400: BadRequestError,
  401: UnauthorizedError,
  409: ConflictError,
  500: InternalServerError,
};

const isInErrors = (num: number): num is keyof Errors => num in errors;

const handleUnspecifiedError = (error: unknown) => {
  return error instanceof ApiError
    ? new UndocumentedServerError(error.message, error)
    : new UnknownError(error instanceof Error ? error.message : undefined, error);
};

type Values<ObjectType, ValueType extends keyof ObjectType = keyof ObjectType> = ObjectType[ValueType];

/* eslint-disable @typescript-eslint/no-explicit-any */

export const handleApiErrors =
  <MyFetch extends TypedFetch<any>>(typedFetch: MyFetch) =>
  (error: unknown) => {
    if (error instanceof typedFetch.Error) {
      const typedError = error.getActualType();
      const { status, data } = typedError as { status: number; data: components['schemas']['HttpErrorBody'] };

      if (isInErrors(status)) {
        return new errors[status](data.message, error) as Values<{
          [K in FetchErrorType<MyFetch>['status'] & keyof Errors]: Errors[K];
        }>;
      }
    }

    return handleUnspecifiedError(error);
  };

/* eslint-enable @typescript-eslint/no-explicit-any */
