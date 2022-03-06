import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { isBoolean } from 'lodash';

import type { LocalStrategy } from './local.strategy';

interface LocalStrategyGuardRequest extends Request {
  user: Awaited<ReturnType<LocalStrategy['validate']>>;
}

@Injectable()
export class LocalStrategyGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = await super.canActivate(context);

    if (!isBoolean(result)) {
      throw new Error('`canActivate` in LocalStrategyGuard should return a boolean value');
    }

    await super.logIn(context.switchToHttp().getRequest<LocalStrategyGuardRequest>());

    return result;
  }
}
