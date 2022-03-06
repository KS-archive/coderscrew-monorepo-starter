import 'express-session';

import { DeserializedAccount } from './lib/session.serializer';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface User extends DeserializedAccount {}
  }
}
