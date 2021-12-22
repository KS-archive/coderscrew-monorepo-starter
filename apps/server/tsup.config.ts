import { esbuildDecorators } from '@anatine/esbuild-decorators';
import { defineConfig } from 'tsup';

export default defineConfig(({ watch }) => ({
  entry: ['src/index.ts'],
  clean: true,
  watch,
  sourcemap: watch ? 'inline' : true,
  format: ['cjs'],
  esbuildPlugins: [esbuildDecorators()],
  target: 'node16',
}));
