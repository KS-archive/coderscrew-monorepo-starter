import type { DeserializedAccount } from './serialization/serialization.types';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface User extends DeserializedAccount {}
  }
}
