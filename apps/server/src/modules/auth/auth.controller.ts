import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { AccountRepository } from './account/account.repository';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './local/local-auth.guard';
import { IsAuthenticatedGuard } from './session/is-authenticated.guard';
import { IsAuthenticatedGuardRequest } from './session/session.types';
import { encodePassword } from './utils/password.utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly accountRepository: AccountRepository) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const encodedPassword = await encodePassword(registerDto.password);
    const account = this.accountRepository.create({
      ...registerDto,
      password: encodedPassword,
    });

    await this.accountRepository.persistAndFlush(account);

    return account;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login() {
    return true;
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get('me')
  async me(@Req() req: IsAuthenticatedGuardRequest) {
    const { password, ...account } = await this.accountRepository.findOneOrFail({ id: req.user.id });

    return account;
  }

  @Post('logout')
  logout(@Req() req: Express.Request) {
    req.logout();
    req.session.destroy(() => {});
  }
}
