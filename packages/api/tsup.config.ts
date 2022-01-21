import { defineConfig } from 'tsup';

export default defineConfig(({ watch }) => ({
  entry: ['src/index.ts'],
  bundle: true,
  watch,
  sourcemap: watch ? 'inline' : true,
  format: ['cjs', 'esm'],
  target: 'node16',
}));
