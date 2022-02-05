import { rest } from 'msw';

import { enhanceCtx } from '@/tests/enhance-ctx';

export const logoutRequestHandler = rest.post('*/auth/logout', (req, res, _ctx) => {
  const ctx = enhanceCtx(_ctx, req);

  return res(ctx.status(204), ctx.cookie('accountId', '', { expires: new Date() }));
});
