import { pick } from '@ccms/utils';

import { Account, AccountStatus } from '../account/account.entity';
import { AccountRepository } from '../account/account.repository';
import { SessionSerializer } from './session.serializer';
import { DeserializedAccount, SerializedAccount } from './session.types';

describe('[Auth] SessionSerializer', () => {
  let serializer: SessionSerializer;

  const existingAccount: Account = {
    id: '0164e436-4ae9-4abe-be8b-932beca73032',
    email: 'test@test.test',
    password: '1234',
    status: AccountStatus.INACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const accountNotFoundError = new Error('Not found');

  beforeEach(() => {
    const accountRepository = {
      findOneOrFail: (props: Partial<Account>) =>
        props.id === existingAccount.id ? Promise.resolve(existingAccount) : Promise.reject(accountNotFoundError),
    } as AccountRepository;

    serializer = new SessionSerializer(accountRepository);
  });

  describe('serializeUser', () => {
    it('maps DeserializedAccount into SerializedAccount and passes it to the `done` callback', () => {
      const deserializedAccount: DeserializedAccount = {
        id: existingAccount.id,
        status: AccountStatus.ACTIVE,
      };
      const done = jest.fn();

      serializer.serializeUser(deserializedAccount, done);

      expect(done).toHaveBeenCalledWith(undefined, { id: deserializedAccount.id });
      expect(done).toHaveBeenCalledTimes(1);
    });
  });

  describe('deserializeUser', () => {
    it('maps SerializedAccount into DeserializedAccount and passes it to the `done` callback', async () => {
      const existingAccountDeserialized: DeserializedAccount = pick(existingAccount, ['id', 'status']);
      const existingAccountSerialized: SerializedAccount = pick(existingAccount, ['id']);
      const done = jest.fn();

      await serializer.deserializeUser(existingAccountSerialized, done);

      expect(done).toHaveBeenCalledWith(undefined, existingAccountDeserialized);
      expect(done).toHaveBeenCalledTimes(1);
    });

    it('calls the `done` callback with error when no account can be found', async () => {
      const nonExistingAccountDeserialized: DeserializedAccount = {
        id: 'some-id',
        status: AccountStatus.ACTIVE,
      };
      const done = jest.fn();

      await serializer.deserializeUser(nonExistingAccountDeserialized, done);

      expect(done).toHaveBeenCalledWith(accountNotFoundError);
      expect(done).toHaveBeenCalledTimes(1);
    });
  });
});
