import axios from 'axios';

import { InternalServerError, UndocumentedServerError, UnknownError } from './error.responses';

export const handleRequestError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.code === '500') return new InternalServerError(error.message);
    return new UndocumentedServerError(error.message, error);
  }
  return new UnknownError(error instanceof Error ? error.message : undefined, error);
};
