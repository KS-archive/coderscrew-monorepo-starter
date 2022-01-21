import type { Account } from '../account/account.entity';

export interface SerializedAccount {
  id: Account['id'];
}

export interface DeserializedAccount {
  id: Account['id'];
  status: Account['status'];
}
