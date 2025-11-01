# Agent Context: eugeneistrach.com

## Project Overview
Personal website and blog for Eugene Istrach. Astro-based static site with interactive React components.

## Tech Stack
- **Framework**: Astro 5 (server output mode with Vercel adapter)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4 (via Vite plugin)
- **Content**: MDX for blog posts
- **Animations**: motion (formerly framer-motion) - import from `"motion/react"`
- **Components**: Radix UI (dialogs, hover cards, tooltips)
- **Data Fetching**: TanStack React Query
- **Icons**: lucide-react
- **Package Manager**: Bun
- **Deployment**: Vercel

## Key Features
- Blog with MDX support
- Interactive components (tech stack, skills, passions, AI features)
- Now playing integration
- RSS feed and sitemap
- Dark mode support

## Project Structure
```
src/
├── components/     # Astro & React components
├── content/        # Blog posts (MDX)
├── layouts/        # Page layouts
└── pages/          # Routes (file-based routing)
```

## Important Notes
- Dev server runs on port 3000
- All React components should use motion from `"motion/react"`, not framer-motion
- Site URL: https://eugeneistrach.com
