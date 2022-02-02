import { factory, primaryKey } from '@mswjs/data';
import { randEmail, randPassword, randUuid } from '@ngneat/falso';
import { isEmail } from 'class-validator';
import { rest } from 'msw';

import { paths } from '@/generated/schema';

type Body = paths['/auth/register']['post']['requestBody']['content']['application/json'];
type Response = paths['/auth/register']['post']['responses']['201']['content']['application/json'];

const db = factory({
  account: {
    id: primaryKey(() => randUuid()),
    email: () => randEmail(),
    password: () => randPassword(),
    status: () => 'inactive' as const,
    createdAt: () => new Date().toString(),
    updatedAt: () => new Date().toString(),
  },
});

export const registerRequestHandler = rest.post<Body>('http://localhost:4000/auth/register', (req, res, ctx) => {
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

  const { password, ...account } = db.account.create({
    email: req.body.email,
    password: req.body.password,
  });

  const response: Response = account;

  return res(ctx.status(201), ctx.json(response));
});
