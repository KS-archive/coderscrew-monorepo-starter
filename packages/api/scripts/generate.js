#!/usr/bin/env node

const { exec, logger } = require('@ccms/node');

const SCHEMA_FILE = 'src/generated/schema.ts';
const { SERVER_PORT } = process.env;

if (!SERVER_PORT) {
  logger.error(`SERVER_PORT environment variable not found`);
  process.exit(1);
}

exec.command(`rm -rf ${SCHEMA_FILE}`);
exec.command(
  [
    'openapi-typescript',
    `http://localhost:${SERVER_PORT}/api-json`,
    `--output ${SCHEMA_FILE}`,
    '--immutable-types',
    '--prettier-config ../../.prettierrc.js',
  ].join(' ')
);
