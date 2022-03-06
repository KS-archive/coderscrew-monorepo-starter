interface HttpSuccess<Data = never> {
  readonly code: number;
  readonly name: string;
  readonly data?: Data;
}

export class OkSuccess<Data> implements HttpSuccess<Data> {
  readonly code = 200;

  readonly name = 'Ok';

  constructor(readonly data: Data) {}
}

export class CreatedSuccess<Data> implements HttpSuccess<Data> {
  readonly code = 201;

  readonly name = 'Created';

  constructor(readonly data: Data) {}
}

export class NoContentSuccess implements HttpSuccess {
  readonly code = 204;

  readonly name = 'No Content';
}
