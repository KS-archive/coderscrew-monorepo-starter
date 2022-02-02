import { NoContentSuccess, OkSuccess } from '@/responses';
import { getDescribeFor } from '@/utils';

import { createAccountCredentials } from './auth.test-helpers';
import { loginRequest } from './login';
import { logoutRequest } from './logout';
import { meRequest } from './me';
import { registerRequest } from './register';

describe(getDescribeFor(logoutRequest), () => {
  it('logs the current user out and returns 204', async () => {
    const accountCredentials = createAccountCredentials();

    await registerRequest(accountCredentials);
    await loginRequest(accountCredentials);

    let meResponse = await meRequest();

    expect(meResponse.isOk()).toBe(true);

    if (meResponse.isOk()) {
      expect(meResponse.value).toBeInstanceOf(OkSuccess);
    }

    const logoutResponse = await logoutRequest();

    meResponse = await meRequest();

    expect(logoutResponse.isOk()).toBe(true);
    expect(meResponse.isOk()).toBe(true);

    if (logoutResponse.isOk() && meResponse.isOk()) {
      expect(logoutResponse.value).toBeInstanceOf(NoContentSuccess);
      expect(meResponse.value).toBeInstanceOf(NoContentSuccess);
    }
  });
});
