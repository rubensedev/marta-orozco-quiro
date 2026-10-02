// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const SITEMAP_EXCLUDED_PATHS = new Set(["/gracias", "/en/thank-you"]);

export default defineConfig({
  site: "https://martaorozcoquiro.netlify.app",
  integrations: [
    sitemap({
      filter: (page) =>
        !SITEMAP_EXCLUDED_PATHS.has(new URL(page).pathname.replace(/\/$/, "")),
      i18n: {
        defaultLocale: "es",
        locales: {
          es: "es-ES",
          en: "en-GB",
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        // nub junctions resolve font files into the global store outside the project
        allow: [
          projectRoot,
          path.join(process.env.LOCALAPPDATA ?? "", "nub", "pm", "store"),
        ],
      },
    },
  },
});
