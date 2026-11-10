// Baut eine Einzeldatei-Vorschau (alles eingebettet) nach dist-preview/.
import { defineConfig } from 'astro/config';
export default defineConfig({
  outDir: './dist-preview',
  build: { inlineStylesheets: 'always' },
  vite: { build: { assetsInlineLimit: 100000000 } },
});
