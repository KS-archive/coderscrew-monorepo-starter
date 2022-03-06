import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';

import type { DeserializedAccount } from './session.serializer';

export interface IsAuthenticatedGuardRequest extends Request {
  user: DeserializedAccount;
}

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    return context.switchToHttp().getRequest<Request>().isAuthenticated();
  }
}
