import { Module } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@liaoliaots/nestjs-redis';

import { redisEnv } from './redis.env';

@Module({
  imports: [
    NestRedisModule.forRoot(
      {
        closeClient: true,
        config: {
          port: redisEnv.REDIS_DB_PORT,
          host: redisEnv.REDIS_DB_HOST,
          password: redisEnv.REDIS_DB_PASSWORD,
        },
      },
      false
    ),
  ],
  exports: [NestRedisModule],
})
export class RedisModule {}
