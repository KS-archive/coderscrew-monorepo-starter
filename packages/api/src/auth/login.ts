import { paths } from '@/generated/schema';
import { httpClient, isAxiosError } from '@/http-client';
import { InternalServerError, NoContentSuccess, UnauthorizedError } from '@/responses';

type Endpoint = paths['/auth/login']['post'];

export const loginRequest = async (body: Endpoint['requestBody']['content']['application/json']) => {
  try {
    await httpClient.post<Endpoint['responses']['204']>('/auth/login', body);

    return new NoContentSuccess();
  } catch (error) {
    if (isAxiosError(error) && error.code === '401') {
      return new UnauthorizedError(error.message);
    }

    return new InternalServerError();
  }
};
