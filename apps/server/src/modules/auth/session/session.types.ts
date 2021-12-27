import type { AccountStatus } from '../account/account.entity';

export interface SerializedAccount {
  id: string;
}

export interface DeserializedAccount {
  id: string;
  status: AccountStatus;
}

export interface IsAuthenticatedGuardRequest extends Express.Request {
  user: DeserializedAccount;
}
