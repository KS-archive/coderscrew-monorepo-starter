import { UniqueConstraintViolationException } from '@mikro-orm/core';
import {
  Body,
  ConflictException,
  Get,
  InternalServerErrorException,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import {
  HttpBody,
  HttpController,
  HttpCreatedResponse,
  HttpErrors,
  HttpNoContentResponse,
  HttpOkResponse,
} from '@/shared/http';

import { AccountRepository } from '../account/account.repository';
import { LocalAuthGuard } from '../local/local-auth.guard';
import { hashPassword } from '../utils/password.utils';
import { LOGIN_ENDPOINT, LoginBody } from './login.route';
import { LOGOUT_ENDPOINT } from './logout.route';
import { ME_ENDPOINT, MeResponse } from './me.route';
import { REGISTER_ENDPOINT, RegisterBody, RegisterResponse } from './register.route';

@HttpController('Auth')
export class AuthController {
  constructor(private readonly accountRepository: AccountRepository) {}

  private readonly logger = new Logger(AuthController.name);

  @Post(REGISTER_ENDPOINT)
  @HttpBody(RegisterBody)
  @HttpCreatedResponse(RegisterResponse)
  @HttpErrors('BadRequest', 'Conflict', 'InternalServerError')
  async register(@Body() registerBody: RegisterBody): Promise<RegisterResponse> {
    const encodedPassword = await hashPassword(registerBody.password);
    const account = this.accountRepository.create({
      ...registerBody,
      password: encodedPassword,
    });

    try {
      await this.accountRepository.persistAndFlush(account);
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        throw new ConflictException('Duplicate e-mail address');
      }

      this.logger.error(error);
      throw new InternalServerErrorException();
    }

    const { password, ...restAccount } = account;

    return restAccount;
  }

  @Post(LOGIN_ENDPOINT)
  @UseGuards(LocalAuthGuard)
  @HttpBody(LoginBody)
  @HttpNoContentResponse()
  @HttpErrors('Unauthorized')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async login(): Promise<void> {}

  @Get(ME_ENDPOINT)
  @HttpOkResponse(MeResponse)
  @HttpNoContentResponse()
  async me(@Req() req: Request, @Res() res: Response): Promise<MeResponse | undefined> {
    if (!req.isAuthenticated()) {
      res.sendStatus(204);

      return undefined;
    }

    const { password, ...account } = await this.accountRepository.findOneOrFail({ id: req.user.id });

    res.status(200).send(account);

    return account;
  }

  @Post(LOGOUT_ENDPOINT)
  @HttpNoContentResponse()
  async logout(@Req() req: Request): Promise<void> {
    req.logout();
    req.session.destroy(() => {});
  }
}
