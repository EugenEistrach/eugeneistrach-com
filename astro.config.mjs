// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";
import { remarkModifiedTime } from "./remark-modified-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://eugeneistrach.com",
  integrations: [mdx(), sitemap(), react()],

  markdown: {
    remarkPlugins: [remarkModifiedTime],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});
