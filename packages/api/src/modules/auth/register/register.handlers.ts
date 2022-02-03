import { isEmail } from 'class-validator';
import { rest } from 'msw';

import { paths } from '@/generated/schema';
import { db } from '@/tests/db';

type Body = paths['/auth/register']['post']['requestBody']['content']['application/json'];

export const registerRequestHandler = rest.post<Body>('*/auth/register', (req, res, ctx) => {
  if (!req.body.email) {
    return res(ctx.status(400), ctx.json({ message: 'email must be an email' }));
  }

  if (!isEmail(req.body.email)) {
    return res(ctx.status(400), ctx.json({ message: 'email must be an email' }));
  }

  if (db.account.findFirst({ where: { email: { equals: req.body.email } } })) {
    return res(ctx.status(409), ctx.json({ message: 'Duplicate e-mail address' }));
  }

  if (!req.body.password) {
    return res(ctx.status(400), ctx.json({ message: 'password should not be empty' }));
  }

  const account = db.account.create({
    email: req.body.email,
    password: req.body.password,
  });

  return res(ctx.status(201), ctx.json(account));
});
