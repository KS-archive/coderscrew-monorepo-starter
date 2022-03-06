import { AccountStatus } from '@prisma/client';
import { z } from 'zod';

export const accountSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z.string(),
  status: z.nativeEnum(AccountStatus),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export type Account = z.infer<typeof accountSchema>;
