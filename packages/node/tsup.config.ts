import { defineConfig } from 'tsup';

export default defineConfig(({ watch }) => ({
  entry: ['src/**/*.ts'],
  clean: true,
  bundle: false,
  watch,
  sourcemap: watch ? 'inline' : true,
  dts: true,
  format: ['cjs', 'esm'],
  target: 'node16',
}));
