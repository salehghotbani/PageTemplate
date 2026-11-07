import { defineConfig, loadEnv } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxyPath = env.VITE_BASE_URL_PATH?.replace(/\/+$/, '');

  return {
    resolve: { tsconfigPaths: true },
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: 'react-runtime',
                test: /node_modules[\\/](?:react|react-dom|scheduler)[\\/]/,
              },
            ],
          },
        },
      },
    },
    server: {
      port: 3000,
      strictPort: true,
      proxy:
        env.API_PROXY_TARGET &&
        proxyPath?.startsWith('/') &&
        !proxyPath.startsWith('//')
          ? {
              [proxyPath]: { target: env.API_PROXY_TARGET, changeOrigin: true },
            }
          : undefined,
    },
  };
});
