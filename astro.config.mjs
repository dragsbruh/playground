// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    preview: {
      allowedHosts: ['airobpzgvqadiuvxhmxvlqklja.srv.us']
    }
  },

  integrations: [svelte()]
});