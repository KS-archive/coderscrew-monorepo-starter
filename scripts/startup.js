#!/usr/bin/env node

const { spawnSync } = require('child_process');
const { readFile, copyFile } = require('fs/promises');
const { existsSync } = require('fs');
const path = require('path');
const packageJson = require('../package.json');

const PROJECT_ROOT = path.resolve(__dirname, '..');

const createIndent = (size = 0) => [...Array.from({ length: size }).keys()].map(() => '').join(' ');

/**
 * Returns output created by the script without displaying it.
 */
const query = (script) => spawnSync(script, { stdio: 'pipe', shell: true, encoding: 'utf-8' });

/**
 * Displays output created by the script but doesn't return it.
 */
const command = (script) => spawnSync(script, { stdio: 'inherit', shell: true, encoding: 'utf-8' });

const createLogger =
  (colorCode, symbol) =>
  (message, indent = 0) =>
    // eslint-disable-next-line no-console
    console.log(`\u001B[${colorCode};1m${createIndent(indent * 4)}${symbol}${message}\u001B[0m`);

const log = {
  success: createLogger('32', '✅ '),
  info: createLogger('36', '▶️ '),
  danger: createLogger('31', '🚨 '),
  error: createLogger('31', ''),
};

const clearLastLine = () => {
  process.stdout.moveCursor(0, -1);
  process.stdout.clearLine(1);
};

const checkNode = () => {
  log.info('Checking Node.js...', 1);

  const nodeVersionOutput = query('node --version');

  const userNodeVersion = nodeVersionOutput.stdout.trim().replace('v', '');
  const requiredNodeVersion = packageJson.engines.node;

  if (userNodeVersion !== requiredNodeVersion) {
    clearLastLine();
    log.danger(
      `Node.js: You need ${requiredNodeVersion} version of Node.js. Detected version: ${userNodeVersion}.
      You can install Volta (https://volta.sh) or n (https://github.com/tj/n) to manage your Node versions`,
      1
    );

    return false;
  }

  clearLastLine();
  log.success('Node.js', 1);

  return true;
};

const checkPnpm = () => {
  log.info('Checking pnpm...', 1);

  const pnpmVersionOutput = query('pnpm --version');

  const userPnpmVersion = pnpmVersionOutput.stdout.trim().replace('v', '');
  const requiredPnpmVersion = packageJson.engines.pnpm;

  if (pnpmVersionOutput.stderr) {
    clearLastLine();
    log.danger(
      `pnpm: You need to install pnpm (https://pnpm.io/installation). Run \`npm i -g pnpm@${requiredPnpmVersion}\``,
      1
    );

    return false;
  }

  if (userPnpmVersion !== requiredPnpmVersion) {
    clearLastLine();
    log.danger(
      `pnpm: You need ${requiredPnpmVersion} version of pnpm. Detected version: ${userPnpmVersion}. Run \`npm i -g pnpm@${requiredPnpmVersion}\``,
      1
    );

    return false;
  }

  clearLastLine();
  log.success('pnpm', 1);

  return true;
};

const checkDocker = () => {
  log.info('Checking Docker...', 1);

  const dockerVersionOutput = query('docker --version');

  if (dockerVersionOutput.stderr) {
    clearLastLine();
    log.danger(`Docker: You need to install Docker (https://docs.docker.com/get-docker)`, 1);

    return false;
  }

  clearLastLine();
  log.success('Docker', 1);

  return true;
};

const getDotFileKeys = async (dotEnvFilePath) => {
  const content = await readFile(dotEnvFilePath, 'utf-8');

  return content
    .split('\n')
    .filter((str) => str.trim() && !str.startsWith('#'))
    .map((str) => str.split('=')[0]);
};

const checkEnvVariables = async () => {
  log.info('Checking environment variables...', 1);

  const dotEnvPath = path.resolve(PROJECT_ROOT, '.env');
  const dotEnvExamplePath = path.resolve(PROJECT_ROOT, '.env.example');

  if (!existsSync(dotEnvPath)) {
    await copyFile(dotEnvExamplePath, dotEnvPath);
  }

  const areDotEnvKeysEqual = async () => {
    const [dotEnvKeys, dotEnvExampleKeys] = await Promise.all([
      getDotFileKeys(dotEnvPath),
      getDotFileKeys(dotEnvExamplePath),
    ]);

    const haveSameLength = dotEnvKeys.length === dotEnvExampleKeys.length;
    const haveSameProperties = dotEnvKeys.every((key, index) => key === dotEnvExampleKeys[index]);

    return haveSameLength && haveSameProperties;
  };

  const areDotFileMatched = await areDotEnvKeysEqual();

  if (!areDotFileMatched) {
    clearLastLine();
    log.danger("Env: Names of environment variables from `.env.example` don't match those from `.env`", 1);

    return false;
  }

  clearLastLine();
  log.success('Environment variables', 1);

  return true;
};

const systemCheckup = async () => {
  let isSuccess = true;
  const checkers = [checkNode, checkPnpm, checkDocker, checkEnvVariables];

  for (const checker of checkers) {
    // eslint-disable-next-line no-await-in-loop
    const doesCheckerSucceeded = await checker();

    isSuccess = isSuccess && doesCheckerSucceeded;
  }

  if (!isSuccess) {
    log.error('To move further fix errors displayed above and run the command again');
    process.exit(0);
  }
};

const SUCCESS_MESSAGE = `Project set up successfully!
   To see all apps run 'pnpm exec cli showcase' and go to localhost: followed by a correct port number.
   You can find all ports numbers in the ./.env file.`.trim();

const main = async () => {
  log.info('Performing system checkup...');
  await systemCheckup();

  log.info('Installing dependencies...');
  command('pnpm install');

  log.info('Preparing project CLI...');
  command('nx run cli:build');

  log.success(SUCCESS_MESSAGE);
};

main();
