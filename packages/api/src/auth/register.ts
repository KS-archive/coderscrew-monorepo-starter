import { paths } from '@/generated/schema';
import { httpClient, isAxiosError } from '@/http-client';
import { BadRequestError, ConflictError, InternalServerError, OkSuccess } from '@/responses';

type Endpoint = paths['/auth/register']['post'];

export const registerRequest = async (body: Endpoint['requestBody']['content']['application/json']) => {
  try {
    const { data } = await httpClient.post<Endpoint['responses']['201']['content']['application/json']>(
      '/auth/register',
      body
    );

    return new OkSuccess(data);
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.code === '400') return new BadRequestError(error.message);

      if (error.code === '409') return new ConflictError(error.message);
    }

    return new InternalServerError();
  }
};
