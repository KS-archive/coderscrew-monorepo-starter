import fetch, { Headers, Request, Response } from 'cross-fetch';
import { setupServer } from 'msw/node';

import { withCookies } from './tests/cookies';
import { handlers } from './tests/handlers';

const server = setupServer(...handlers);

const beforeAll = (isServerMocked = true) => {
  globalThis.fetch = withCookies(fetch);
  global.Response = Response;
  global.Headers = Headers;
  global.Request = Request;

  if (isServerMocked) {
    server.listen();
  }
};

const beforeEach = () => {
  globalThis.fetch = withCookies(fetch);
};

const afterEach = (isServerMocked = true) => {
  if (isServerMocked) {
    server.resetHandlers();
  }
};

const afterAll = (isServerMocked = true) => {
  if (isServerMocked) {
    server.close();
  }
};

export const serverTests = { beforeAll, beforeEach, afterEach, afterAll };
