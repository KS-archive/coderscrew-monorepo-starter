import { httpClient } from '@/http-client';

export const loginRequest = httpClient.path('/auth/login').method('post').create();
