const { Command } = require('commander');

const program = new Command();

program.version('0.0.0');

require('./commands/clean')(program);
require('./commands/dev')(program);
require('./commands/build')(program);
require('./commands/start')(program);
require('./commands/lint')(program);
require('./commands/add')(program);
require('./commands/remove')(program);
require('./commands/orm')(program);

program.parse(process.argv);
