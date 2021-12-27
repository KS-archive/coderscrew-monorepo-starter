import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvSchema } from './env.schema';

class Env {
  private _envVariables: EnvSchema;

  private _isValidated = false;

  constructor() {
    this.assignEnvVariables();
  }

  private assignEnvVariables = () => {
    this._envVariables = plainToClass(EnvSchema, process.env, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  };

  private checkIfValidated = () => {
    if (!this._isValidated) {
      throw new Error('You need to validate your env variables before you can access them');
    }
  };

  validate = () => {
    if (this._isValidated) {
      return;
    }

    const errors = validateSync(this._envVariables);

    if (errors.length > 0) {
      const messages = errors.map((error) => error.toString()).join(',\n');

      // eslint-disable-next-line no-console
      console.error('Environment variables validation failed');
      throw new Error(messages);
    }

    this._isValidated = true;
  };

  get = <Key extends keyof EnvSchema>(key: Key): EnvSchema[Key] => {
    this.checkIfValidated();

    return this._envVariables[key];
  };
}

export const env = new Env();
