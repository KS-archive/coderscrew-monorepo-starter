import { rest } from 'msw';

import { db } from '@/tests/db';

export const meRequestHandler = rest.get('*/auth/me', (req, res, ctx) => {
  const id = req.cookies.accountId;

  const account = db.account.findFirst({
    where: { id: { equals: id } },
  });

  return account ? res(ctx.status(200), ctx.json(account)) : res(ctx.status(204));
});
