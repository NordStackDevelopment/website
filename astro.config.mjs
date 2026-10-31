// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

// Public pages are built ahead of time into static HTML (see Documentation/Website_Build_Plan_2026-10-31.md).
// Set `site` to the real domain when it is connected.
export default defineConfig({
  output: 'static',
  integrations: [svelte()],
});
