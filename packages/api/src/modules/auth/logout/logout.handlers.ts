import { rest } from 'msw';

import { removeCookie } from '@/tests/cookies';

export const logoutRequestHandler = rest.post('*/auth/logout', (req, res, ctx) => {
  removeCookie('accountId', req);

  return res(ctx.status(204));
});
