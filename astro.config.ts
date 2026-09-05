import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

const site = process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

export default defineConfig({
  site,
  trailingSlash: 'never',
  output: 'static',
  adapter: netlify({ imageCDN: false }),
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        if (path.startsWith('/og/')) return false;
        if (path.startsWith('/api/')) return false;
        if (path.startsWith('/projects')) return false;
        if (path.startsWith('/insights')) return false;
        return true;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss() as never],
    cacheDir: process.env.VITE_CACHE_DIR ?? '.cache-vite',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
