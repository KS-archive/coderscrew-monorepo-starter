import { Logger } from '@nestjs/common';
import { map } from 'lodash';
import { z } from 'zod';

const authLogger = new Logger('auth:env');

const authEnvSchema = z.object({
  SESSION_SECRET: z.string(),
  JWT_SECRET: z.string(),
});

const result = authEnvSchema.safeParse({
  SESSION_SECRET: process.env.SESSION_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
});

if (!result.success) {
  const message = map(result.error.flatten().fieldErrors, (errors, envName) => `${envName}: ${errors[0]}`).join('; ');
  authLogger.error(message);
  process.exit(1);
}

export const authEnv = result.data;
