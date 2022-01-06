import { Command } from 'commander';
import dotenv from 'dotenv';
import path from 'path';

import { exec, logger } from '@ccms/node';

export const loadEnvVariables = () => {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
};

export const runCommand = (command: string) => {
  logger.info(`Running command: ${command}`);
  exec.command(command);
};

export const getRemainingArguments = (program: Command) => program.args.slice(program.processedArgs.length).join(' ');
