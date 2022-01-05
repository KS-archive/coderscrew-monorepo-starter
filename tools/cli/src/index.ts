import { Command } from 'commander';

import { addCommand } from './commands/add';
import { buildCommand } from './commands/build';
import { cleanCommand } from './commands/clean';
import { devCommand } from './commands/dev';
import { lintCommand } from './commands/lint';
import { ormCommand } from './commands/orm';
import { removeCommand } from './commands/remove';
import { startCommand } from './commands/start';
import { storybookCommand } from './commands/storybook';
import { testCommand } from './commands/test';

const program = new Command();

program.version('0.0.0');

addCommand(program);
buildCommand(program);
cleanCommand(program);
devCommand(program);
lintCommand(program);
ormCommand(program);
removeCommand(program);
startCommand(program);
storybookCommand(program);
testCommand(program);

program.parse(process.argv);