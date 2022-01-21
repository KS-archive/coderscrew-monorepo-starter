import type { ApiError } from 'openapi-typescript-fetch';

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
