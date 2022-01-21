import { Fetcher } from 'openapi-typescript-fetch';

import { paths } from '@/generated/schema';

export const httpClient = Fetcher.for<paths>();

httpClient.configure({
  baseUrl: 'http://localhost:4000',
  init: { credentials: 'include' },
});
