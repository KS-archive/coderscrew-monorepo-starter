import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { AccountRepository } from '../account/account.repository';
import { DeserializedAccount, SerializedAccount } from './session.types';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly accountRepository: AccountRepository) {
    super();
  }

  serializeUser(
    deserializedAccount: DeserializedAccount,
    done: (error: undefined, serializedAccount: SerializedAccount) => void
  ) {
    done(undefined, { id: deserializedAccount.id });
  }

  async deserializeUser(
    serializedAccount: SerializedAccount,
    done: (error: unknown, deserializedAccount?: DeserializedAccount) => void
  ) {
    try {
      const account = await this.accountRepository.findOneOrFail({ id: serializedAccount.id });

      done(undefined, { id: account.id, status: account.status });
    } catch (error) {
      done(error);
    }
  }
}
