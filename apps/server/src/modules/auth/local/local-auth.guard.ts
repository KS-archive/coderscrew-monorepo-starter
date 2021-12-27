import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { isBoolean } from '@ccms/utils';

import type { LocalAuthGuardRequest } from './local.types';

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
}
