import cookie from 'cookie';
import rawFetchCookie, { CookieJar } from 'fetch-cookie';
import { RestRequest } from 'msw';

interface FetchCookie {
  <Fetch>(fetch: Fetch, jar?: CookieJar): Fetch;
  toughCookie: {
    CookieJar: new () => CookieJar;
  };
}

type GlobalThis = typeof globalThis;

interface ExtendedGlobalThis extends GlobalThis {
  cookieJar: CookieJar;
}

const fetchCookie = rawFetchCookie as unknown as FetchCookie;
const getGlobalThis = () => globalThis as ExtendedGlobalThis;

export const withCookies = <Fetch extends typeof fetch>(fetch: Fetch): Fetch => {
  const cookieJar = new fetchCookie.toughCookie.CookieJar();

  getGlobalThis().cookieJar = cookieJar;

  return fetchCookie(fetch, getGlobalThis().cookieJar);
};

type SerializeParams = Parameters<typeof cookie.serialize>;

export const setCookie =
  (req: RestRequest) =>
  (...args: SerializeParams) => {
    getGlobalThis().cookieJar.setCookie(cookie.serialize(...args), req.url.href, { ignoreError: false }, () => {});
  };
