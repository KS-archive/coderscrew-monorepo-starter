import { UnauthorizedException } from '@nestjs/common';

import { Account, AccountStatus } from '../account/account.entity';
import { AccountRepository } from '../account/account.repository';
import { DeserializedAccount } from '../session/session.types';
import { encodePassword } from '../utils/password.utils';
import { LocalStrategy } from './local.strategy';

describe('[Auth] Local strategy', () => {
  let strategy: LocalStrategy;
  let accountRepository: AccountRepository;
  let existingAccount: Account;

  const userCredentials = {
    email: 'test@test.test',
    password: '1234',
  };

  beforeAll(async () => {
    const encodedPassword = await encodePassword(userCredentials.password);

    existingAccount = {
      id: '0164e436-4ae9-4abe-be8b-932beca73032',
      email: userCredentials.email,
      password: encodedPassword,
      status: AccountStatus.INACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    accountRepository = {
      findOne: (props: Partial<Account>) =>
        // eslint-disable-next-line unicorn/no-null
        Promise.resolve(props.email === userCredentials.email ? existingAccount : null),
    } as AccountRepository;
  });

  beforeEach(() => {
    strategy = new LocalStrategy(accountRepository);
  });

  describe('validate', () => {
    it('throws unauthorized error when no account found', async () => {
      await expect(strategy.validate('non@existing.email', userCredentials.password)).rejects.toBeInstanceOf(
        UnauthorizedException
      );
    });

    it('throws unauthorized error when password is incorrect', async () => {
      await expect(strategy.validate(userCredentials.email, 'some-wrong-password')).rejects.toBeInstanceOf(
        UnauthorizedException
      );
    });

    it('returns deserialized account when credentials are valid', async () => {
      await expect(
        strategy.validate(userCredentials.email, userCredentials.password)
      ).resolves.toEqual<DeserializedAccount>({
        id: existingAccount.id,
        status: existingAccount.status,
      });
    });
  });
});
