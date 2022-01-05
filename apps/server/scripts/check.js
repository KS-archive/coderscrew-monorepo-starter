#!/usr/bin/env node

const { exec, logger } = require('@ccms/config');

const checkPostgresContainer = () => {
  const containerName = 'postgres';

  const { stderr, stdout } = exec.query(`docker inspect -f '{{.State.Running}}' ${containerName}`);

  if (stderr) {
    return 'Postgres container is not created. To create it and other containers run `docker compose up -d`';
  }

  if (stdout.trim() === 'false') {
    return 'Postgres container is not started. To start it and other containers run `docker compose start`';
  }

  return false;
};

const checkRedisContainer = () => {
  const containerName = 'redis';

  const { stderr, stdout } = exec.query(`docker inspect -f '{{.State.Running}}' ${containerName}`);

  if (stderr) {
    return 'Redis container is not created. To create it and other containers run `docker compose up -d`';
  }

  if (stdout.trim() === 'false') {
    return 'Redis container is not started. To start it and other containers run `docker compose start`';
  }

  return false;
};

const checkEnvironment = () => {
  const errors = [checkPostgresContainer(), checkRedisContainer()].filter(Boolean);

  if (errors.length > 0) {
    for (const error of errors) {
      logger.error(error);
    }

    process.exit(1);
  }

  process.exit(0);
};

checkEnvironment();
