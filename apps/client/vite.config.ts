import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react({
      // Automatic runtime breaks the builded version of the app.
      jsxRuntime: 'classic',
    }),
  ],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
