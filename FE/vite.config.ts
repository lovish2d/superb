/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(dirname, './src'),
      },
    },
    envPrefix: 'VITE_',
    build: {
      outDir: 'dist',
    },
    server: {
      host: '0.0.0.0',
      allowedHosts: ['superbaero-dev.webmobsoft.com', 'localhost'],
      port: 6001,
    },
    test: {
      projects: [
        {
          extends: true,
          plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
            }),
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({}),
              instances: [
                {
                  browser: 'chromium',
                },
              ],
            },
            setupFiles: ['.storybook/vitest.setup.ts'],
          },
        },
      ],
    },
  };
});