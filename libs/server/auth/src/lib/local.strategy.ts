import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import argon2 from 'argon2';
import { pick } from 'lodash';
import { IStrategyOptions, Strategy } from 'passport-local';

import type { LoginBody } from '@ccms/api';

import { AuthService } from './auth.service';
import type { DeserializedAccount } from './session.serializer';

const strategyOptions: IStrategyOptions & Record<string, keyof LoginBody> = {
  usernameField: 'email' as const,
  passwordField: 'password' as const,
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(strategyOptions);
  }

  async validate(email: string, password: string): Promise<DeserializedAccount> {
    const account = await this.authService.queryAccountByEmail(email);

    if (!account) {
      throw new UnauthorizedException();
    }

    const isPasswordCorrect = await argon2.verify(account.password, password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    return pick(account, 'id', 'email', 'status');
  }
}
