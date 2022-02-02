import { setupServer } from 'msw/node';

import { registerRequestHandler } from '@/modules/auth/register.handlers';

export const server = setupServer(registerRequestHandler);
