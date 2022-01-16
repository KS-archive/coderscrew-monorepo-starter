import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { Account, AccountStatus } from '../account/account.entity';
import { AccountRepository } from '../account/account.repository';
import { SessionSerializer } from '../session/session.serializer';
import { encodePassword } from '../utils/password.utils';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guard';

describe('[Auth] Local auth guard', () => {
  let guard: LocalAuthGuard;
  let accountRepository: AccountRepository;
  let existingAccount: Account;

  const unauthorizedException = new UnauthorizedException('Incorrect e-mail address or password');

  const userCredentials = {
    email: 'test@test.test',
    password: '1234',
  };

  beforeEach(async () => {
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

    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [
        LocalStrategy,
        SessionSerializer,
        LocalAuthGuard,
        { provide: AccountRepository, useValue: accountRepository },
      ],
    }).compile();

    guard = module.get<LocalAuthGuard>(LocalAuthGuard);
  });

  it('returns true when correct credentials provided', async () => {
    const context = createMock<ExecutionContext>();

    context.switchToHttp().getRequest.mockReturnValue({
      body: userCredentials,
    });

    await expect(guard.canActivate(context)).resolves.toBeTruthy();
  });

  describe('throws unauthorized exception when incorrect credentials provided', () => {
    it('incorrect password', async () => {
      const context = createMock<ExecutionContext>();

      context.switchToHttp().getRequest.mockReturnValue({
        body: { email: userCredentials.email, password: 'wrong-password' },
      });

      await expect(guard.canActivate(context)).rejects.toEqual(unauthorizedException);
    });

    it('incorrect email', async () => {
      const context = createMock<ExecutionContext>();

      context.switchToHttp().getRequest.mockReturnValue({
        body: { email: 'wrong@email.address', password: userCredentials.password },
      });

      await expect(guard.canActivate(context)).rejects.toEqual(unauthorizedException);
    });
  });

  describe('throws unauthorized exception when non-complete credentials provided', () => {
    it('empty body', async () => {
      const context = createMock<ExecutionContext>();

      context.switchToHttp().getRequest.mockReturnValue({
        body: {},
      });

      await expect(guard.canActivate(context)).rejects.toEqual(unauthorizedException);
    });

    it('only email', async () => {
      const context = createMock<ExecutionContext>();

      context.switchToHttp().getRequest.mockReturnValue({
        body: { email: userCredentials.email },
      });

      await expect(guard.canActivate(context)).rejects.toEqual(unauthorizedException);
    });

    it('only password', async () => {
      const context = createMock<ExecutionContext>();

      context.switchToHttp().getRequest.mockReturnValue({
        body: { password: userCredentials.password },
      });

      await expect(guard.canActivate(context)).rejects.toEqual(unauthorizedException);
    });
  });
});
