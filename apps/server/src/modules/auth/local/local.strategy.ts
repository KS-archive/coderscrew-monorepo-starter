import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';

import { AccountRepository } from '../account/account.repository';
import type { LoginBody } from '../controller/login.route';
import type { DeserializedAccount } from '../session/session.types';
import { checkPasswordsMatch } from '../utils/password.utils';

const strategyOptions: IStrategyOptions & Record<string, keyof LoginBody> = {
  usernameField: 'email' as const,
  passwordField: 'password' as const,
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accountRepository: AccountRepository) {
    super(strategyOptions);
  }

  async validate(email: string, password: string): Promise<DeserializedAccount> {
    const account = await this.accountRepository.findOne({ email });

    if (!account) {
      throw new UnauthorizedException();
    }

    const isPasswordCorrect = await checkPasswordsMatch(account.password, password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    return { id: account.id, status: account.status };
  }
}
