// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  srcDir: './src/presentation',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    })
  ],
  adapter: vercel(),
  image: {
    service: passthroughImageService(),
  },
});