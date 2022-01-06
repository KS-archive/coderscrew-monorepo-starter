#!/usr/bin/env node

const { exec, logger } = require('@ccms/node');

const checkIfDockerIsRunning = () => {
  const { stdout } = exec.query('docker info');

  if (stdout.includes('Cannot connect to the Docker daemon')) {
    logger.error('You need to turn on the Docker daemon');
    process.exit(1);
  }
};

const isContainerRunning = (containerName) => {
  const { stdout } = exec.query(`docker inspect -f '{{.State.Running}}' ${containerName}`);

  return stdout.trim() === 'true';
};

const ensureContainerIsRunning = (containerName) => {
  if (!isContainerRunning(containerName)) {
    const command = `docker compose up ${containerName} --wait`;

    logger.info(`Container ${containerName} is not running. Executing: ${command}`);
    exec.command(command);
  }
};

const checkEnvironment = () => {
  checkIfDockerIsRunning();
  ensureContainerIsRunning('postgres');
  ensureContainerIsRunning('redis');
};

checkEnvironment();
