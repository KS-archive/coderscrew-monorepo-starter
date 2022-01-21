import { httpClient } from '@/http-client';

export const meRequest = httpClient.path('/auth/me').method('get').create();
