import { Command, Option } from 'commander';

import { runCommand } from '../utils';

interface Options {
  cache: boolean;
  timing: number;
}

function action(options: Options) {
  let command = 'eslint . --format=pretty --ext .js,.ts,.tsx';

  if (options.cache) {
    command = `${command} --cache`;
  }

  if (options.timing) {
    command = `cross-env TIMING=${options.timing} ${command}`;
  }

  runCommand(command);
}

export const lintCommand = (program: Command) => {
  program
    .command('lint')
    .description('Runs linter across all files.')
    .addOption(new Option('--no-cache', 'Clear ESLint cache before running the script.'))
    .addOption(new Option('--timing [count]', 'Show timing for [count] longest rules.').argParser(Number))
    .action(action);
};
