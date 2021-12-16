const { Command } = require('commander');

const program = new Command();

program.version('0.0.0');

require('./commands/w')(program);
require('./commands/clean')(program);

program.parse();
