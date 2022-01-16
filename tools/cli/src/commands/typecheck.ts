import { Command } from 'commander';

import { runCommand } from '../utils';

function action(this: Command) {
  runCommand('pnpm exec cli build');
  runCommand('pnpm run typecheck --recursive');
}

export const typecheckCommand = (program: Command) => {
  program.command('typecheck').description('Check TypeScript types across all workspaces.').action(action);
};
