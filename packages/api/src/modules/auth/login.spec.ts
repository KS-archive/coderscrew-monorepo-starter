import { NoContentSuccess, UnauthorizedError } from '@/responses';
import { getDescribeFor } from '@/utils';

import { createAccountCredentials } from './auth.test-helpers';
import { loginRequest } from './login';
import { registerRequest } from './register';

describe(getDescribeFor(loginRequest), () => {
  const accountCredentials = createAccountCredentials();

  beforeAll(() => registerRequest(accountCredentials));

  it('returns 204 status when user is successfully logged in', async () => {
    const response = await loginRequest(accountCredentials);

    expect(response.isOk()).toBe(true);

    if (response.isOk()) {
      expect(response.value).toBeInstanceOf(NoContentSuccess);
    }
  });

  it('returns error when no email provided', async () => {
    const body = createAccountCredentials({ email: undefined });
    const response = await loginRequest(body);

    expect(response.isErr()).toBe(true);

    if (response.isErr()) {
      expect(response.error).toBeInstanceOf(UnauthorizedError);
      expect(response.error.message).toMatchInlineSnapshot(`"Incorrect e-mail address or password"`);
    }
  });

  it('returns error when email has incorrect format', async () => {
    const body = createAccountCredentials({ email: 'wrong@email' });
    const response = await loginRequest(body);

    expect(response.isErr()).toBe(true);

    if (response.isErr()) {
      expect(response.error).toBeInstanceOf(UnauthorizedError);
      expect(response.error.message).toMatchInlineSnapshot(`"Incorrect e-mail address or password"`);
    }
  });

  it("returns error when user with provided email doesn't exist", async () => {
    const body = createAccountCredentials({ password: accountCredentials.password });
    const response = await loginRequest(body);

    expect(response.isErr()).toBe(true);

    if (response.isErr()) {
      expect(response.error).toBeInstanceOf(UnauthorizedError);
      expect(response.error.message).toMatchInlineSnapshot(`"Incorrect e-mail address or password"`);
    }
  });

  it('returns error when no password provided', async () => {
    const body = createAccountCredentials({ password: accountCredentials.password });
    const response = await loginRequest(body);

    expect(response.isErr()).toBe(true);

    if (response.isErr()) {
      expect(response.error).toBeInstanceOf(UnauthorizedError);
      expect(response.error.message).toMatchInlineSnapshot(`"Incorrect e-mail address or password"`);
    }
  });

  it("returns error when user's password is incorrect", async () => {
    const body = createAccountCredentials({ email: accountCredentials.email });
    const response = await loginRequest(body);

    expect(response.isErr()).toBe(true);

    if (response.isErr()) {
      expect(response.error).toBeInstanceOf(UnauthorizedError);
      expect(response.error.message).toMatchInlineSnapshot(`"Incorrect e-mail address or password"`);
    }
  });
});
