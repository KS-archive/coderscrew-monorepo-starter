import { Expose } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

const NODE_ENV_VALUES = ['development', 'test', 'production'] as const;
const APP_ENV_VALUES = ['local', 'review', 'staging', 'production'] as const;

export class EnvSchema {
  @Expose()
  @IsIn(NODE_ENV_VALUES)
  NODE_ENV: typeof NODE_ENV_VALUES[number];

  @Expose()
  @IsIn(APP_ENV_VALUES)
  APP_ENV: typeof APP_ENV_VALUES[number];

  @Expose()
  @IsInt()
  @IsPositive()
  SERVER_PORT: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  POSTGRES_DB_NAME: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  POSTGRES_DB_USER: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  POSTGRES_DB_PASSWORD: string;

  @Expose()
  @IsInt()
  @IsPositive()
  POSTGRES_DB_PORT: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  POSTGRES_DB_HOST: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  SESSION_SECRET: string;

  @Expose()
  @IsInt()
  @IsPositive()
  REDIS_DB_PORT: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  REDIS_DB_HOST: string;
}
