import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: './src/index.js',
      name: 'MyComponentLibrary',
      fileName: (format) => `my-component-library.${format}.js`
    },
    rollupOptions: {
      external: ['svelte'],
      output: {
        globals: {
          svelte: 'svelte'
        }
      }
    }
  }
});
