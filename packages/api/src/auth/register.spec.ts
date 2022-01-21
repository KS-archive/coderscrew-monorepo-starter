import { BadRequestError, ConflictError, CreatedSuccess } from '@/responses';
import { getDescribeFor } from '@/utils';

import { createAccountCredentials } from './auth.test-helpers';
import { registerRequest } from './register';

describe(getDescribeFor(registerRequest), () => {
  it('returns a new account if correct credentials provided', async () => {
    const body = createAccountCredentials();
    const response = await registerRequest(body);

    expect(response.isOk()).toBe(true);

    if (response.isOk()) {
      expect(response.value).toBeInstanceOf(CreatedSuccess);
      expect(response.value.data.email).toBe(body.email);
      expect(response.value.data.status).toBe('inactive');
    }
  });

  it('returns error when no email provided', async () => {
    const body = createAccountCredentials({ email: undefined });
    const response = await registerRequest(body);

    expect(response.isErr()).toBe(true);

    if (response.isErr()) {
      expect(response.error).toBeInstanceOf(BadRequestError);
      expect(response.error.message).toMatchInlineSnapshot(`"email must be an email"`);
    }
  });

  it('returns error when email has incorrect format', async () => {
    const body = createAccountCredentials({ email: 'wrong@email' });
    const response = await registerRequest(body);

    expect(response.isErr()).toBe(true);

    if (response.isErr()) {
      expect(response.error).toBeInstanceOf(BadRequestError);
      expect(response.error.message).toMatchInlineSnapshot(`"email must be an email"`);
    }
  });

  it('returns error when user with a particular email already exist', async () => {
    const body = createAccountCredentials();

    await registerRequest(body);

    const response = await registerRequest(body);

    expect(response.isErr()).toBe(true);

    if (response.isErr()) {
      expect(response.error).toBeInstanceOf(ConflictError);
      expect(response.error.message).toMatchInlineSnapshot(`"Duplicate e-mail address"`);
    }
  });

  it('returns error when no password provided', async () => {
    const body = createAccountCredentials({ password: undefined });
    const response = await registerRequest(body);

    expect(response.isErr()).toBe(true);

    if (response.isErr()) {
      expect(response.error).toBeInstanceOf(BadRequestError);
      expect(response.error.message).toMatchInlineSnapshot(`"password should not be empty"`);
    }
  });
});
