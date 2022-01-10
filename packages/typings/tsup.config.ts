import { defineConfig } from 'tsup';

export default defineConfig(({ watch }) => ({
  entry: ['src/index.ts'],
  watch,
  sourcemap: watch ? 'inline' : true,
  format: ['cjs', 'esm'],
  target: 'node16',
}));
