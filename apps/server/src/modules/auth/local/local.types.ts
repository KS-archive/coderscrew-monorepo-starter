import type { LocalStrategy } from './local.strategy';

export interface LocalAuthGuardRequest extends Express.Request {
  user: Awaited<ReturnType<LocalStrategy['validate']>>;
}
