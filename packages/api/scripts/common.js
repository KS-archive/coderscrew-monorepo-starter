#!/usr/bin/env node

const buildMain = 'tsup';
const buildWorker = 'tsup src/worker.ts --platform="browser"';
const buildServer = 'tsup src/server.ts --platform="node"';
const buildDeclarationFiles = 'tsc --project tsconfig.build.json --declaration --declarationMap --emitDeclarationOnly';
const resolveTsPaths = 'tsc-alias --project tsconfig.build.json';

module.exports = {
  buildCommands: [buildMain, buildWorker, buildServer, buildDeclarationFiles, resolveTsPaths],
};
