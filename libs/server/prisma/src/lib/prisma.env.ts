import { Logger } from '@nestjs/common';
import { map } from 'lodash';
import { z } from 'zod';

export const prismaLogger = new Logger('env:prisma');

const prismaEnvSchema = z.object({
  DATABASE_URL: z.string(),
});

const result = prismaEnvSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
});

if (!result.success) {
  const message = map(result.error.flatten().fieldErrors, (errors, envName) => `${envName}: ${errors[0]}`).join('; ');
  prismaLogger.error(message);
  process.exit(1);
}

export const prismaEnv = result.data;
