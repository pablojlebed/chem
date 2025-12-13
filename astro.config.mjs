// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [
    // Add other integrations if truly needed for THIS project (e.g., mdx())
    tailwind()],
  // IMPORTANT: There should be NO 'vite' block related to PostCSS/Tailwind here.
  // The @astrojs/tailwind integration handles that internally for Path 1.
});