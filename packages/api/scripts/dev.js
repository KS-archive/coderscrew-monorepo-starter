#!/usr/bin/env node

const { exec } = require('@ccms/node');
const { buildCommands } = require('./common');

exec.command(buildCommands.map((command) => `${command} --watch`).join(' & '));
