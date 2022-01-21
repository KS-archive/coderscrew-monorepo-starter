import { Command } from 'commander';

import { addCommand } from './commands/add';
import { buildCommand } from './commands/build';
import { cleanCommand } from './commands/clean';
import { devCommand } from './commands/dev';
import { generateCommand } from './commands/generate';
import { lintCommand } from './commands/lint';
import { ormCommand } from './commands/orm';
import { removeCommand } from './commands/remove';
import { showcaseCommand } from './commands/showcase';
import { startCommand } from './commands/start';
import { storybookCommand } from './commands/storybook';
import { testCommand } from './commands/test';
import { typecheckCommand } from './commands/typecheck';

const program = new Command();

program.version('0.0.0');

addCommand(program);
buildCommand(program);
cleanCommand(program);
devCommand(program);
generateCommand(program);
lintCommand(program);
ormCommand(program);
removeCommand(program);
showcaseCommand(program);
startCommand(program);
storybookCommand(program);
testCommand(program);
typecheckCommand(program);

program.parse(process.argv);
