import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { pick } from 'lodash';

import type { Account } from '@ccms/api';
import { PrismaService } from '@ccms/server-prisma';

export interface SerializedAccount {
  id: Account['id'];
}

export interface DeserializedAccount {
  id: Account['id'];
  email: Account['email'];
  status: Account['status'];
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly prismaService: PrismaService) {
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
      const account = await this.prismaService.account.findUnique({
        where: { id: serializedAccount.id },
        rejectOnNotFound: true,
      });

      done(undefined, pick(account, 'id', 'email', 'status'));
    } catch (error) {
      done(error);
    }
  }
}
