import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist', // this tells Vercel where to find the built site
  },
});
