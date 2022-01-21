import { httpClient } from '@/http-client';

export const logoutRequest = httpClient.path('/auth/logout').method('post').create();
