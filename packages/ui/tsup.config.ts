import { defineConfig } from 'tsup';

export default defineConfig(({ watch }) => ({
  entry: ['src/index.ts'],
  clean: true,
  bundle: true,
  watch,
  sourcemap: watch ? 'inline' : true,
  dts: true,
  format: ['cjs', 'esm'],
  inject: ['./react-shim.js'],
  target: 'node16',
}));
