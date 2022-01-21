import { paths } from '@/generated/schema';
import { httpClient } from '@/http-client';
import { InternalServerError, NoContentSuccess, OkSuccess } from '@/responses';

type Endpoint = paths['/auth/me']['get'];

export const meRequest = async () => {
  try {
    const { data } = await httpClient.get<
      Endpoint['responses']['200']['content']['application/json'] | Endpoint['responses']['204']
    >('/auth/me');

    return data ? new OkSuccess(data) : new NoContentSuccess();
  } catch {
    return new InternalServerError();
  }
};
