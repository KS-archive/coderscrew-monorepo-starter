import { paths } from '@/generated/schema';
import { httpClient } from '@/http-client';
import { InternalServerError, NoContentSuccess } from '@/responses';

type Endpoint = paths['/auth/logout']['post'];

export const logoutRequest = async () => {
  try {
    await httpClient.post<Endpoint['responses']['204']>('/auth/logout');

    return new NoContentSuccess();
  } catch {
    return new InternalServerError();
  }
};
