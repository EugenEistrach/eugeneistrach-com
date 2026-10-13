# eugeneistrach.com

Personal homepage. A single static page, no framework, no build step.

- `public/index.html`: the whole page (markup, CSS and JS inline). German or English based on the visitor's browser; strings live in the `T` object.
- `public/assets/`: fonts, photos (AVIF + WebP at 480/640/960), and `matter.min.js` (physics, loaded on demand). Cached for a year as immutable, so give a changed file a new name.
- `vercel.json`: serves `public/` as-is, security/cache headers, and redirects old `/blog/*` URLs to https://paraglidejs.com/tanstack-start.
- Run locally: `npx serve public -l 3000`.
- Deploys to Vercel on push to `main`.
