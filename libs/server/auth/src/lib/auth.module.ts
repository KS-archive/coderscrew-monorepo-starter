import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import RedisStore from 'connect-redis';
import session from 'express-session';
import passport from 'passport';

import { PrismaModule } from '@ccms/server-prisma';
import { RedisModule, RedisService } from '@ccms/server-redis';

import { AuthController } from './auth.controller';
import { authEnv } from './auth.env';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    RedisModule,
    PrismaModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SessionSerializer, LocalStrategy],
})
export class AuthModule implements NestModule {
  constructor(private readonly redisService: RedisService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redisService.getClient(),
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: authEnv.SESSION_SECRET,
          resave: false,
          cookie: { sameSite: true, httpOnly: false, maxAge: 1000 * 60 * 60 },
        }),
        passport.initialize(),
        passport.session()
      )
      .forRoutes('*');
  }
}
