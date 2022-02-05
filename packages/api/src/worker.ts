import { setupWorker } from 'msw';

import { handlers } from './tests/handlers';

export const worker = setupWorker(...handlers);
