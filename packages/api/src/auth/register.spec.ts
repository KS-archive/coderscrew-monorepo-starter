import { nanoid } from 'nanoid';

import { BadRequestError, ConflictError, CreatedSuccess } from '@/responses';

import { registerRequest } from './register';

type Credentials = {
  email: string;
  password: string;
};

const createUserCredentials = (overwrite: Partial<Credentials> = {}): Credentials => ({
  email: `test-mail-${nanoid()}@e2e.com`,
  password: nanoid(),
  ...overwrite,
});

describe('register', () => {
  it('returns a new account if correct credentials provided', async () => {
    const userCredentials = createUserCredentials();
    const response = await registerRequest(userCredentials);

    expect(response.isOk()).toBe(true);

    if (response.isOk()) {
      expect(response.value).toBeInstanceOf(CreatedSuccess);
      expect(response.value.data.email).toBe(userCredentials.email);
      expect(response.value.data.status).toBe('inactive');
    }
  });

  it('returns error when no email provided', async () => {
    const userCredentials = createUserCredentials({ email: undefined });
    const response = await registerRequest(userCredentials);

    expect(response.isErr()).toBe(true);

    if (response.isErr()) {
      expect(response.error).toBeInstanceOf(BadRequestError);
      expect(response.error.message).toMatchInlineSnapshot(`"email must be an email"`);
    }
  });

  it('returns error when email has incorrect format', async () => {
    const userCredentials = createUserCredentials({ email: 'wrong@email' });
    const response = await registerRequest(userCredentials);

    expect(response.isErr()).toBe(true);

    if (response.isErr()) {
      expect(response.error).toBeInstanceOf(BadRequestError);
      expect(response.error.message).toMatchInlineSnapshot(`"email must be an email"`);
    }
  });

  it('returns error when user with a particular email already exist', async () => {
    const userCredentials = createUserCredentials();

    await registerRequest(userCredentials);

    const response = await registerRequest(userCredentials);

    expect(response.isErr()).toBe(true);

    if (response.isErr()) {
      expect(response.error).toBeInstanceOf(ConflictError);
      expect(response.error.message).toMatchInlineSnapshot(`"Duplicate e-mail address"`);
    }
  });

  it('returns error when no password provided', async () => {
    const userCredentials = createUserCredentials({ password: undefined });
    const response = await registerRequest(userCredentials);

    expect(response.isErr()).toBe(true);

    if (response.isErr()) {
      expect(response.error).toBeInstanceOf(BadRequestError);
      expect(response.error.message).toMatchInlineSnapshot(`"password should not be empty"`);
    }
  });
});
