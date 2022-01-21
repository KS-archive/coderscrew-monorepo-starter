import fetch, { Headers, Request, Response } from 'cross-fetch';
import fetchCookie from 'fetch-cookie';

beforeAll(() => {
  globalThis.fetch = fetchCookie(fetch);
  global.Response = Response;
  global.Headers = Headers;
  global.Request = Request;
});

beforeEach(() => {
  globalThis.fetch = fetchCookie(fetch);
});
