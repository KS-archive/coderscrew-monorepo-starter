import { Logger } from '@nestjs/common';
import { map } from 'lodash';
import { z } from 'zod';

export const redisLogger = new Logger('redis:env');

const redisEnvSchema = z.object({
  REDIS_DB_PORT: z.number(),
  REDIS_DB_HOST: z.string(),
  REDIS_DB_PASSWORD: z.string(),
});

const result = redisEnvSchema.safeParse({
  REDIS_DB_PORT: Number(process.env.REDIS_DB_PORT),
  REDIS_DB_HOST: process.env.REDIS_DB_HOST,
  REDIS_DB_PASSWORD: process.env.REDIS_DB_PASSWORD,
});

if (!result.success) {
  const message = map(result.error.flatten().fieldErrors, (errors, envName) => `${envName}: ${errors[0]}`).join('; ');
  redisLogger.error(message);
  process.exit(1);
}

export const redisEnv = result.data;
