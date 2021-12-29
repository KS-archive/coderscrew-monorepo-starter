import { Argument, Command } from 'commander';

import { workspacesUtils } from '@ccms/config';

import { runCommand } from '../utils';

const STORYBOOK_WORKSPACE = workspacesUtils.findOneOrThrow('ui').moduleName;

interface Arguments {
  script: 'dev' | 'build';
}

function action(script: Arguments['script']) {
  runCommand(`pnpm run storybook:${script} --filter=${STORYBOOK_WORKSPACE}`);
}

export const storybookCommand = (program: Command) => {
  program
    .command('storybook')
    .description('Runs Storybook related scripts.')
    .addArgument(new Argument('<script>', 'Script to run for the Storybook').choices(['dev', 'build']))
    .action(action);
};
