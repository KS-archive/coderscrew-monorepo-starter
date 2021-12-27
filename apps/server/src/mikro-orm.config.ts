import type { Options } from '@mikro-orm/core';

import { Account } from './modules/auth/account/account.entity';
import { env } from './shared/env';

env.validate();

const mikroOrmConfig: Options = {
  entities: [Account],
  type: 'postgresql',
  dbName: env.get('POSTGRES_DB_NAME'),
  port: env.get('POSTGRES_DB_PORT'),
  host: env.get('POSTGRES_DB_HOST'),
  user: env.get('POSTGRES_DB_USER'),
  password: env.get('POSTGRES_DB_PASSWORD'),
  migrations: {
    fileName: (timestamp) => `migration-${timestamp}`,
  },
};

// eslint-disable-next-line import/no-default-export
export default mikroOrmConfig;
