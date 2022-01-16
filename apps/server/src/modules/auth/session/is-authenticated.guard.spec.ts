import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';

import { IsAuthenticatedGuard } from './is-authenticated.guard';

describe('[Auth] IsAuthenticatedGuard', () => {
  it('returns the value of `isAuthenticated` function attached to request', () => {
    const guard = new IsAuthenticatedGuard();
    const context = createMock<ExecutionContext>();

    context.switchToHttp().getRequest.mockReturnValue({ isAuthenticated: () => true });

    expect(guard.canActivate(context)).toBe(true);

    context.switchToHttp().getRequest.mockReturnValue({ isAuthenticated: () => false });

    expect(guard.canActivate(context)).toBe(false);
  });
});
