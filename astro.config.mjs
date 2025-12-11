// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind"; // <-- THIS IS THE CORRECT IMPORT FOR PATH 1

import svelte from "@astrojs/svelte";

export default defineConfig({
  integrations: [// <-- THIS IS THE CORRECT INTEGRATION FOR PATH 1
  // Add other integrations if truly needed for THIS project (e.g., mdx())
  tailwind(), svelte()],
  // IMPORTANT: There should be NO 'vite' block related to PostCSS/Tailwind here.
  // The @astrojs/tailwind integration handles that internally for Path 1.
});