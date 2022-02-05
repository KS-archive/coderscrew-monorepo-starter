import { rest } from 'msw';

import { paths } from '@/generated/schema';
import { db } from '@/tests/db';
import { enhanceCtx } from '@/tests/enhance-ctx';

type Body = paths['/auth/login']['post']['requestBody']['content']['application/json'];

export const loginRequestHandler = rest.post<Body>('*/auth/login', (req, res, _ctx) => {
  const ctx = enhanceCtx(_ctx, req);
  const account = db.account.findFirst({
    where: { email: { equals: req.body.email }, password: { equals: req.body.password } },
  });

  return account
    ? res(ctx.status(204), ctx.cookie('accountId', account.id))
    : res(ctx.status(401), ctx.json({ message: 'Incorrect e-mail address or password' }));
});
