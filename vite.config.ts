import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import svgr from 'vite-plugin-svgr';
import removeConsole from 'vite-plugin-remove-console';
import checker from 'vite-plugin-checker';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svgr({ include: '**/*.svg?react' }),
        removeConsole(),
        react(),
        checker({
            typescript: true,
        }),
        chunkSplitPlugin(),
    ],
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'public') },
            { find: '~', replacement: path.resolve(__dirname, 'src') },
            { find: '$', replacement: path.resolve(__dirname, '.') },
        ],
    },
    build: {
        minify: "esbuild"
    },
});
