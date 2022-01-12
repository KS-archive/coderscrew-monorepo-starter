import { DeserializedAccount } from './session/session.types';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface User extends DeserializedAccount {}
  }
}
