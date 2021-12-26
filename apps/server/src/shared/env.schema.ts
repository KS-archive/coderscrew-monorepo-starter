import { Expose } from 'class-transformer';
import { IsIn } from 'class-validator';

const NODE_ENV_VALUES = ['development', 'test', 'production'] as const;
const APP_ENV_VALUES = ['local', 'review', 'staging', 'production'] as const;

export class EnvSchema {
  @Expose()
  @IsIn(NODE_ENV_VALUES)
  NODE_ENV: typeof NODE_ENV_VALUES[number];

  @Expose()
  @IsIn(APP_ENV_VALUES)
  APP_ENV: typeof APP_ENV_VALUES[number];
}
