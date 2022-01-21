// eslint-disable-next-line max-classes-per-file
import { Err, Ok } from 'neverthrow';

class HttpSuccess<Data> extends Ok<Data, never> {
  code: number;

  name: string;

  constructor(code: number, name: string, data: Data) {
    super(data);
    this.code = code;
    this.name = name;
  }
}

export class OkSuccess<Data> extends HttpSuccess<Data> {
  constructor(data: Data) {
    super(200, 'No Content', data);
  }
}

export class CreatedSuccess<Data> extends HttpSuccess<Data> {
  constructor(data: Data) {
    super(201, 'No Content', data);
  }
}

export class NoContentSuccess extends HttpSuccess<never> {
  constructor() {
    super(204, 'No Content', undefined as never);
  }
}

class HttpError extends Err<never, string> {
  code: number;

  name: string;

  message: string;

  constructor(code: number, name: string, message: string) {
    super(message);
    this.code = code;
    this.name = name;
  }
}

export class BadRequestError extends HttpError {
  constructor(message?: string) {
    super(400, 'Bad Request', message ?? 'Bad Request');
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message?: string) {
    super(401, 'Unauthorized', message ?? 'Unauthorized');
  }
}

export class ConflictError extends HttpError {
  constructor(message?: string) {
    super(409, 'Conflict', message ?? 'Conflict');
  }
}

export class InternalServerError extends HttpError {
  constructor(message?: string) {
    super(500, 'Internal Server Error', message ?? 'Internal Server Error');
  }
}
