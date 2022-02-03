import { rest } from 'msw';

import { paths } from '@/generated/schema';
import { setCookie } from '@/tests/cookies';
import { db } from '@/tests/db';

type Body = paths['/auth/login']['post']['requestBody']['content']['application/json'];

export const loginRequestHandler = rest.post<Body>('*/auth/login', (req, res, ctx) => {
  const account = db.account.findFirst({
    where: { email: { equals: req.body.email }, password: { equals: req.body.password } },
  });

  if (account) {
    setCookie('accountId', account.id, req);

    return res(ctx.status(204));
  }

  return res(ctx.status(401), ctx.json({ message: 'Incorrect e-mail address or password' }));
});
