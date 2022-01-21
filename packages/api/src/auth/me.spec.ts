import { NoContentSuccess, OkSuccess } from '@/responses';
import { getDescribeFor } from '@/utils';

import { createAccountCredentials } from './auth.test-helpers';
import { loginRequest } from './login';
import { meRequest } from './me';
import { registerRequest } from './register';

describe(getDescribeFor(meRequest), () => {
  it('returns the current user and 200 status when user is logged in', async () => {
    const accountCredentials = createAccountCredentials();

    await registerRequest(accountCredentials);
    await loginRequest(accountCredentials);

    const response = await meRequest();

    expect(response.isOk()).toBe(true);

    if (response.isOk()) {
      expect(response.value).toBeInstanceOf(OkSuccess);

      if (response.value.code === 200) {
        expect(response.value.data.email).toBe(accountCredentials.email);
      }
    }
  });

  it('returns 204 status when user is not logged in', async () => {
    const response = await meRequest();

    expect(response.isOk()).toBe(true);

    if (response.isOk()) {
      expect(response.value).toBeInstanceOf(NoContentSuccess);
    }
  });
});
