import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react({
      // Automatic runtime breaks the builded version of the app.
      jsxRuntime: 'classic',
    }),
    tsconfigPaths(),
  ],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  envDir: '../..',
  optimizeDeps: {
    esbuildOptions: {
      plugins: [NodeModulesPolyfillPlugin()],
    },
  },
});
