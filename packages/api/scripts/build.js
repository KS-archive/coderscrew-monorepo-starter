#!/usr/bin/env node

const { exec } = require('@ccms/node');
const { buildCommands } = require('./common');

exec.command('rm -rf dist');
exec.command(buildCommands.join(' && '));
