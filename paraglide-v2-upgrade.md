# Paraglide v2 Upgrade Guide

## Overview
Upgrading the blog article from Paraglide v1 to v2 for TanStack Start integration.

## Goals
- Update article to use Paraglide v2
- Simplify setup steps where possible
- Maintain cookie-based language switching (no locale in route)
- Link to official example for advanced patterns

## Example Repository
- **URL**: https://github.com/TanStack/router/tree/main/examples/react/start-i18n-paraglide
- **Features**: Locale in route support (out of scope for our guide)
- **Purpose**: Reference for v2 setup patterns

## Test Project
- **Location**: /Users/eugeneistrach/Projects/throwaway/paraglide-test
- **Setup**: Fresh TanStack Start project (latest version)

## Workflow

**Agent implements → User tests → Iterate**

1. Agent makes code changes to test project and blog article
2. Agent commits changes with descriptive messages
3. Agent hands back to user for manual testing
4. User reports findings
5. Agent adjusts based on feedback, repeat

## Writing Principles

**No Assumed Context - Standalone Clarity**

- Never reference "the old way" or "previously" or "new approach"
- Explain everything as if reader has no prior knowledge
- Each section should be understandable without reading v1 guide
- Focus on what something does, not how it changed
- Example: ❌ "Notice the new import style" → ✅ "The outputStructure option enables this import syntax"

## Process

### Phase 1: Research & Analysis ✅
- [x] Clone official example repository
- [x] Read example README and documentation
- [x] Identify key differences between v1 and v2 setup
- [x] Inspected actual CLI behavior in test project

### Phase 2: Initial Documentation Updates ✅
- [x] Update "Setting Up Paraglide" section
- [x] Update "Creating Your First Translations" section
- [x] Update "Using Translations in Your Application" section

### Phase 3: Basic Translation Rendering ✅
**Agent implements:**
- [x] Update message files in test project
- [x] Create hello.tsx route in test project
- [x] Commit for testing (commit: f599ced)

**User tests:**
- [x] Fixed node_modules issue (commit: 7daa9ad)
- [x] Verified dev server starts successfully
- [x] Paraglide compilation working
- [x] Verified "Hello, world!" renders
- [x] Verified "Hey Eugene, how are you?" renders
- [x] TypeScript autocomplete works for messages
- [x] TypeScript error if parameter missing
- ✅ **CONFIRMED WORKING**

### Phase 4: Language Switching & Middleware (Current)
**Agent implements:**
- [x] Created src/server.ts with paraglideMiddleware
- [x] Updated __root.tsx with getLocale() for html lang
- [x] Added inline language switcher (EN/DE buttons)
- [x] Commit for testing (commit: e7fa996)

**User tests:** ⏳ READY FOR TESTING
- [ ] Run `npm run dev` in workspace paraglide-test project
- [ ] Visit http://localhost:3002/hello
- [ ] Click "EN" button - verify text stays English
- [ ] Click "DE" button - verify text changes to German ("Hallo, Welt!" and "Hey Eugene, wie geht's dir?")
- [ ] Refresh page - verify language persists (cookie test)
- [ ] Check browser DevTools → Application → Cookies → PARAGLIDE_LOCALE cookie exists
- [ ] Clear cookie, refresh - should default to browser language
- [ ] Report findings

**Next iterations will cover:**
- Blog article updates (remove complex i18n utils, simplify sections)
- Final documentation polish
- Lint rules and DX section review

#### Current Guide Sections Status:
1. ✅ **Getting Started** - Updated for latest CLI
2. ✅ **Setting Up Paraglide** - Updated for v2
3. ✅ **Creating Your First Translations** - Updated
4. ✅ **Using Translations in Your Application** - Updated for v2 API
5. ⏳ **Adding Language Detection and Switching** - Needs v2 simplification
6. ⏳ **Setting Up Root Route** - Needs v2 update
7. ⏳ **Client-Side Setup** - May be removable in v2
8. ⏳ **Creating a Language Switcher** - Needs v2 simplification
9. ⏳ **Enhancing DX** - Needs review for v2

## Findings

### What the CLI Actually Creates

When running `npx @inlang/paraglide-js@latest init`, the following happens:

**CLI Prompts:**
1. Uncommitted changes warning
2. Output directory selection (default: `./src/paraglide`)
3. TypeScript `allowJs` verification
4. VS Code user check (adds Sherlock extension recommendation)
5. Machine translations opt-in

**Files Created:**
- `project.inlang/` - Directory containing:
  - `settings.json` - Project configuration (locales, modules, pathPattern)
  - `cache/` - Compilation cache
  - `project_id` - Unique project identifier
  - `.gitignore` - Excludes cache
- `messages/en.json` - English translations with example message
- `messages/de.json` - German translations with example message
- `.vscode/extensions.json` - Sherlock extension recommendation

**Files Modified:**
- `package.json` - Adds `@inlang/paraglide-js` to devDependencies
- `vite.config.ts` - Adds basic plugin configuration (only `project` and `outdir`)

**Important Note:**
The CLI only adds minimal plugin configuration. Additional options like `outputStructure`, `cookieName`, and `strategy` must be added manually.

### Installation & Setup Differences

**V1:**
- Install: `@inlang/paraglide-js` and `@inlang/paraglide-vite` separately
- Plugin name: `paraglide` (from `@inlang/paraglide-vite`)
- Config in `app.config.ts`

**V2:**
- Install: Only `@inlang/paraglide-js` (includes vite plugin)
- Plugin name: `paraglideVitePlugin` (from `@inlang/paraglide-js`)
- Config in `vite.config.ts`
- New options: `outputStructure`, `cookieName`, `strategy`, `urlPatterns`

### API Changes

**V1:**
- `setLanguageTag()` - Set language
- `availableLanguageTags` - Get available languages
- `type AvailableLanguageTag` - Type for languages
- Messages imported as `import * as m from "../paraglide/messages"`

**V2:**
- `setLocale()` - Set language (simpler API)
- `getLocale()` - Get current language
- `locales` - Array of available locales
- `type Locale` - Type for languages
- Messages imported as `import { m } from "@/paraglide/messages"`
- New: `paraglideMiddleware` - Server middleware
- New: `deLocalizeUrl`, `localizeUrl` - URL handling functions

### Simplified Steps

**Much Simpler in V2:**
1. No need for custom `getLanguageFromRequest` server function
2. No need for custom `useLanguage` hook
3. No need for `readLanguageFromHtmlLangAttribute`
4. No need for `beforeLoad` in root route
5. No need for manual cookie handling
6. Language detection is built-in via middleware and strategy config
7. Just use `getLocale()` and `setLocale()` directly

**What the Vite Plugin Now Handles:**
- Cookie-based persistence (via `cookieName` option)
- Language detection strategy (via `strategy` option)
- Server middleware generation
- URL localization patterns (optional, for locale in route)

### New Steps Required

**For Simple Cookie-Based Approach (like our guide):**
1. Configure `paraglideVitePlugin` with:
   - `outputStructure: "message-modules"`
   - `cookieName: "PARAGLIDE_LOCALE"` (or your preference)
   - `strategy: ["cookie", "preferredLanguage", "baseLocale"]` (skip "url" for no locale in route)
2. Add `paraglideMiddleware` to `server.ts`
3. Use `getLocale()` in `__root.tsx` for html lang attribute
4. Use `setLocale()` directly in language switcher
5. Import messages as `import { m } from "@/paraglide/messages"`

## Notes
- Keep guide simple and focused on cookie-based approach
- Don't include locale-in-route complexity
- Emphasize type safety and DX improvements
