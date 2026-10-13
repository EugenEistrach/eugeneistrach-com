# eugeneistrach.com

Static site: one `public/index.html` plus assets. No build step.

```sh
npx serve public -l 3000
```

Vercel serves `public/` as-is (see `vercel.json`). Old `/blog/*` URLs redirect to the Paraglide JS TanStack Start docs.

Files in `public/assets/` are cached for a year (`immutable`). Give a changed file a new name instead of overwriting it.
