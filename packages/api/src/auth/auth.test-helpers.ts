import { randomUUID } from 'crypto';

type Credentials = {
  email: string;
  password: string;
};

export const createAccountCredentials = (overwrite: Partial<Credentials> = {}): Credentials => ({
  email: `test-mail-${randomUUID()}@e2e.com`,
  password: randomUUID(),
  ...overwrite,
});
