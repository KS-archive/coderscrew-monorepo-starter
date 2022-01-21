import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvSchema } from './env.schema';

class Env {
  private envVariables: EnvSchema;

  private isValidated = false;

  private readonly logger = new Logger(Env.name);

  constructor() {
    this.assignEnvVariables();
  }

  private assignEnvVariables = () => {
    this.envVariables = plainToClass(EnvSchema, process.env, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  };

  private checkIfValidated = () => {
    if (!this.isValidated) {
      throw new Error('You need to validate your env variables before you can access them');
    }
  };

  validate = () => {
    if (this.isValidated) {
      return;
    }

    const errors = validateSync(this.envVariables);

    if (errors.length > 0) {
      const messages = errors.map((error) => error.toString()).join(',\n');

      this.logger.error('Environment variables validation failed');
      throw new Error(messages);
    }

    this.isValidated = true;
  };

  get = <Key extends keyof EnvSchema>(key: Key): EnvSchema[Key] => {
    this.checkIfValidated();

    return this.envVariables[key];
  };
}

export const env = new Env();
