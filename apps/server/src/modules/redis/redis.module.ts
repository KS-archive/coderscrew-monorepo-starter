import { Inject, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis, { Redis as RedisClient } from 'ioredis';

import { env } from '@/shared/env';

import { REDIS } from './redis.constants';

@Module({
  providers: [
    {
      provide: REDIS,
      useValue: new Redis({
        port: env.get('REDIS_DB_PORT'),
        host: env.get('REDIS_DB_HOST'),
      }),
    },
  ],
  exports: [REDIS],
})
export class RedisModule implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(REDIS) private readonly redis: RedisClient) {}

  async onModuleInit() {
    if (this.redis.status !== 'ready') {
      await this.redis.connect();
    }
  }

  async onModuleDestroy() {
    if (this.redis.status !== 'end') {
      await this.redis.quit();
    }
  }
}
