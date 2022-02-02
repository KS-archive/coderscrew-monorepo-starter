import fetch, { Headers, Request, Response } from 'cross-fetch';
import fetchCookie from 'fetch-cookie';

import { server } from './src/tests/msw-server';

const MOCKED_SERVER = process.env.MOCKED_SERVER === 'true';

beforeAll(() => {
  globalThis.fetch = fetchCookie(fetch);
  global.Response = Response;
  global.Headers = Headers;
  global.Request = Request;

  if (MOCKED_SERVER) {
    server.listen();
  }
});

beforeEach(() => {
  globalThis.fetch = fetchCookie(fetch);
});

if (MOCKED_SERVER) {
  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
}
