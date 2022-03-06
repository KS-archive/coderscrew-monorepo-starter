import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Request } from 'express';
import { noop, omit } from 'lodash';

import { LoginResponse, LogoutResponse, MeResponse, RegisterResponse } from '@ccms/api';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalStrategyGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDto): Promise<RegisterResponse> {
    try {
      const account = await this.authService.register(body);
      return omit(account, 'password');
    } catch (ex) {
      if (ex instanceof Prisma.PrismaClientKnownRequestError && ex.code === 'P2002') {
        throw new ConflictException();
      }
      throw new InternalServerErrorException();
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(LocalStrategyGuard)
  async login(@Body() _body: LoginDto): Promise<LoginResponse> {
    return null;
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async me(@Req() req: Request): Promise<MeResponse> {
    if (!req.isAuthenticated()) {
      return null;
    }

    const account = await this.authService.queryAccountById(req.user.id);

    return omit(account, 'password');
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req: Request): Promise<LogoutResponse> {
    req.logout();
    req.session.destroy(noop);

    return null;
  }
}
