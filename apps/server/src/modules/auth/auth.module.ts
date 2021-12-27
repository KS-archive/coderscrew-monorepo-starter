import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { Account } from './account/account.entity';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local/local.strategy';
import { SessionSerializer } from './session/session.serializer';

@Module({
  imports: [MikroOrmModule.forFeature([Account]), PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [LocalStrategy, SessionSerializer],
})
export class AuthModule {}
