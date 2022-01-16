import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { isBoolean } from '@ccms/utils';

import type { LocalStrategy } from './local.strategy';

interface LocalAuthGuardRequest extends Express.Request {
  user: Awaited<ReturnType<LocalStrategy['validate']>>;
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = await super.canActivate(context);

    if (!isBoolean(result)) {
      throw new Error('`canActivate` in LocalAuthGuard should return a boolean value');
    }

    await super.logIn(context.switchToHttp().getRequest<LocalAuthGuardRequest>());

    return result;
  }

  handleRequest<User>(error: unknown, user: User) {
    if (error || !user) {
      throw new UnauthorizedException('Incorrect e-mail address or password');
    }

    return user;
  }
}
