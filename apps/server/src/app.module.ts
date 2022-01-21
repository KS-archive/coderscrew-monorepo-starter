import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import RedisStore from 'connect-redis';
import session from 'express-session';
import type { Redis } from 'ioredis';
import passport from 'passport';

import mikroOrmConfig from './mikro-orm.config';
import { AuthModule } from './modules/auth/auth.module';
import { REDIS } from './modules/redis/redis.constants';
import { RedisModule } from './modules/redis/redis.module';
import { env } from './shared/env';
import { HttpValidationPipe } from './shared/http/validation.pipe';

@Module({
  imports: [AuthModule, RedisModule, MikroOrmModule.forRoot(mikroOrmConfig)],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: HttpValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: Redis) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({ client: this.redis, logErrors: true }),
          saveUninitialized: false,
          secret: env.get('SESSION_SECRET'),
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 1000 * 60 * 60,
          },
        }),
        passport.initialize(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        passport.session()
      )
      .forRoutes('*');
  }
}
