import { spawnSync } from 'child_process';
import { Command } from 'commander';
import dotenv from 'dotenv';
import path from 'path';

export const loadEnvVariables = () => {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
};

export const runCommand = (command: string) => {
  // eslint-disable-next-line no-console
  console.info('Running command:', command);
  spawnSync(command, { stdio: 'inherit', shell: true, encoding: 'utf-8' });
};

export const getRemainingArguments = (program: Command) => program.args.slice(program.processedArgs.length).join(' ');
