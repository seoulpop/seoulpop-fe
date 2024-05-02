import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '#', replacement: '/public' },
    ],
  },
  server: {
    // pem 파일이 없는 경우 무시
    ...(fs.existsSync(path.resolve(__dirname, 'localhost-key.pem')) && {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
      },
    }),
    // Make sure the server is accessible over the local network
    host: '0.0.0.0',
  },
});
