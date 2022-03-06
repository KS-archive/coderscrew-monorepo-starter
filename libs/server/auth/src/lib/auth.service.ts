import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';

import type { Account, RegisterBody } from '@ccms/api';
import { PrismaService } from '@ccms/server-prisma';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(data: RegisterBody) {
    const password = await argon2.hash(data.password);
    const account = await this.prismaService.account.create({ data: { ...data, password } });

    return account;
  }

  async queryAccountById(id: Account['id']) {
    return this.prismaService.account.findUnique({ where: { id } });
  }

  async queryAccountByEmail(email: Account['email']) {
    return this.prismaService.account.findUnique({ where: { email } });
  }
}
