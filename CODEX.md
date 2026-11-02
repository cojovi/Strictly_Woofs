# CODEX.md

## Project Overview

Strictly Woofs is a prototype/parody creator-social web app built with Next.js App Router. The UI presents a landing page, mock login/signup flows, a social feed, live-stream browsing/chat, direct messages, and static creator profile pages.

The app runs as a Next.js server app. Login and signup remain pretend gates; there is no real authentication or payment processing. Tips, subscriptions, likes, comments, live chat, messages, and story replies use local browser state. Upstash Redis coordinates anonymous presence, shared automatic feed posts, and AI usage limits. Creator replies and feed updates use the server-side OpenAI Responses API.

Project/package name in `package.json` is `nextjs-shadcn`, but the user-facing product is Strictly Woofs.

## Tech Stack

- Language: TypeScript and TSX.
- Runtime/framework: Next.js `15.3.8` with App Router, React `18.3.1`, React DOM `18.3.1`.
- Styling: Tailwind CSS `3.4.17`, CSS variables in `src/app/globals.css`, `tailwindcss-animate`.
- UI primitives: shadcn-style components in `src/components/ui`, Radix UI primitives, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`.
- Package managers/lockfiles: both `package-lock.json` and `bun.lock` exist. `package.json` scripts use `bunx` for lint/format, while README shows multiple package managers and Netlify uses Bun.
- Formatting/linting: Biome config exists for formatting and lint rules; ESLint flat config extends Next core web vitals/typescript with several rules disabled.
- Type checking: TypeScript `strict: true`, `noEmit: true`, `moduleResolution: "bundler"`, alias `@/* -> ./src/*`.
- Build output: standard Next.js server output in `.next`; dynamic API routes require a server-capable deployment.
- Deployment config: `netlify.toml` exists, but see Deployment Notes for a likely publish-directory mismatch.
- External scripts/services: `src/app/layout.tsx` loads `//unpkg.com/same-runtime/dist/index.global.js`; `tsconfig.json` sets `jsxImportSource` to `same-runtime/dist`.

## Repository Structure

- `src/app/`: Next App Router pages, layout, global CSS, and client body wrapper. Edit carefully because most app behavior and mock data live directly inside page files.
- `src/app/page.tsx`: marketing/landing page with featured creators and navigation to auth/live routes.
- `src/app/login/page.tsx` and `src/app/signup/page.tsx`: mock auth screens. These do not validate credentials or create accounts; they delay briefly and redirect to `/feed`.
- `src/app/feed/page.tsx`: main mock social feed. Contains hardcoded posts, fake notifications, fake comments, subscription state, tip dialog, and bottom nav.
- `src/app/live/page.tsx`: mock live-stream grid and simulated live chat/player view.
- `src/app/messages/page.tsx`: mock DM interface using `useSearchParams`, `Suspense`, local messages, typing delays, and auto-responses.
- `src/app/creator/[username]/page.tsx`: static creator data map and `generateStaticParams()` for exportable creator pages.
- `src/app/creator/[username]/CreatorProfileClient.tsx`: interactive profile UI tabs and local subscription state.
- `src/components/ui/`: shadcn-style reusable UI primitives. Edit carefully and preserve existing patterns because changes here affect many pages.
- `src/components/StrictlyWoofsLogo.tsx`: shared logo component; currently uses `/strictly_logo_short1.png`.
- `src/lib/utils.ts`: shared `cn()` helper for class merging.
- `src/lib/mockData.ts`: canonical mock creators, posts, stories, live streams, notifications, replies, and shared TypeScript interfaces.
- `src/lib/mockStorage.ts`: SSR-safe `localStorage` helpers for local-only subscriptions, conversations, likes, comments, notifications, and fake treat transactions.
- `src/lib/presence.ts` and `src/app/api/presence/route.ts`: anonymous expiring visitor markers, shared automatic-post schedule and recent posts.
- `src/lib/creatorAI.ts`: shared server-side OpenAI request and creator personality logic.
- `public/`: static images, logos, SVGs, and one MP4. Treat larger media files carefully; avoid casual replacement or deletion.
- Root config files: `package.json`, lockfiles, `next.config.js`, `tailwind.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `eslint.config.mjs`, `biome.json`, `components.json`, `netlify.toml`.

No `docs/`, `.github/`, `.cursor/rules/`, `CODEX.md`, `CLAUDE.md`, or `AGENTS.md` files were present before this file was created.

## Important Entry Points

- Root layout: `src/app/layout.tsx`.
- Global styles/theme variables: `src/app/globals.css`.
- Hydration/body wrapper: `src/app/ClientBody.tsx`.
- Landing route: `/` from `src/app/page.tsx`.
- Feed route: `/feed` from `src/app/feed/page.tsx`.
- Live route: `/live` from `src/app/live/page.tsx`.
- Messages route: `/messages` from `src/app/messages/page.tsx`.
- Login route: `/login` from `src/app/login/page.tsx`.
- Signup route: `/signup` from `src/app/signup/page.tsx`.
- Creator route: `/creator/[username]` from `src/app/creator/[username]/page.tsx`.
- Static creator generation: `generateStaticParams()` in `src/app/creator/[username]/page.tsx`.
- Shared UI utility: `cn()` in `src/lib/utils.ts`.

`src/app/api/creator/route.ts` handles AI chat and on-demand post generation; `/api/presence` handles anonymous activity and automatic shared posts. There are no workers, migrations, or database initialization files.

## How the App Works

The app is route-driven through Next App Router. Users land on `/`, navigate to mock login/signup, and are redirected to `/feed`. The feed renders canonical mock data from `src/lib/mockData.ts`. Most interactions persist locally in the browser via `src/lib/mockStorage.ts`.

Normal mock flow:

`/` landing page -> `/login` or `/signup` -> fake delay -> `router.push("/feed")` -> local toy interactions -> links to `/creator/[username]`, `/messages`, or `/live`.

Creator profiles use the shared creator catalog and `generateStaticParams()` enumerates supported usernames.

Stories, tips, subscriptions, notifications, stream imagery and audience activity are simulated. Direct messages, on-demand feed updates and replies to live-chat messages use `/api/creator`; those interactions persist in the browser. Automatically generated posts are shared through Redis. There is no websocket, queue, or real money movement.

Images are a mix of files under `public/` and remote image URLs. `next.config.js` disables Next image optimization.

## Setup Instructions

Dependencies are not installed by default in this workspace (`node_modules` was absent during inspection).

Because both `package-lock.json` and `bun.lock` exist, confirm the intended package manager before changing dependencies. The safest npm install command for the npm lockfile is:

```bash
npm ci
```

The Netlify config and some package scripts assume Bun is available. If the project owner intends Bun as canonical, use:

```bash
bun install
```

Do not run both install flows casually, because the two lockfiles may drift. If dependencies are changed, update the intended lockfile(s) deliberately.

## Common Commands

- `npm ci`: installs dependencies from `package-lock.json`. Safe when using npm and no dependency changes are intended.
- `bun install`: installs dependencies from `bun.lock`. Safe when Bun is the intended package manager; needs owner verification because npm lockfile also exists.
- `npm run dev`: runs `next dev -H 0.0.0.0 --turbopack`. Starts the dev server on port 3000 by default and exposes it on all interfaces.
- `bun run dev`: equivalent script through Bun. Likely matches Netlify's Bun-oriented setup.
- `npm run build` or `bun run build`: runs `next build`.
- `npm run start` or `bun run start`: serves the production build with `next start`.
- `npm run lint` or `bun run lint`: runs `bunx tsc --noEmit && next lint`. Needs verification; this script requires Bun even when invoked via npm, and `next lint` may be incompatible with newer Next versions.
- `npm run format` or `bun run format`: runs `bunx biome format --write` over Biome's configured file set. This writes changes.

No test, single-test, database migration, seed, Docker, or preview script is defined in `package.json`.

## Environment Variables

- `OPENAI_API_KEY`: server-only key required for AI replies and fresh posts. Never expose it to the browser or commit its value.
- `OPENAI_MODEL`: optional server-side model override; defaults to `gpt-4.1-mini`.
- `KV_REST_API_URL` and `KV_REST_API_TOKEN`: server-only Upstash Redis credentials for shared rate limits, presence, and automatic posts. The Vercel integration supplies them. For local development, pull the development environment with `vercel env pull .env.development.local --environment development`; never commit the resulting file.

`netlify.toml` sets one build-time environment variable:

- `NETLIFY_NEXT_PLUGIN_SKIP=true`: configured under `[build.environment]`; purpose appears to be skipping the Netlify Next plugin behavior, but this needs deployment verification.

Do not add secrets to documentation. If future auth, payment, database, or API integrations are added, document variable names and purposes here using safe examples only.

## Architecture Notes

- App architecture is still page-centric, but mock product data is centralized in `src/lib/mockData.ts` and local persistence helpers are centralized in `src/lib/mockStorage.ts`.
- `src/app/api/creator/route.ts` validates inputs and calls OpenAI on the server. `src/lib/creatorRateLimit.ts` uses an atomic Upstash Redis script to enforce 15 requests per visitor per UTC minute and 500 across the site per UTC day, shared across deployment instances. Counters use hashed IP addresses and expire automatically. A failed or unconfigured store returns 503 rather than allowing unmetered calls. Preview/development and production share the same store and quota unless separately configured.
- `ClientBody` sends an anonymous per-tab heartbeat on feed, creator, live and messages routes about every 40 seconds. Presence expires after 120 seconds without a heartbeat; the API exposes only a boolean. This is an approximate activity signal, not identity, authentication, or a verified person count. The Redis presence namespace separates deployment environments.
- The first heartbeat initializes an automatic-post schedule roughly 1-2 minutes ahead; subsequent posts are scheduled 3-7 minutes apart. A returning visitor may trigger a previously due post sooner. A Redis lock coordinates concurrent visitors; the post is published only if someone is still active when generation finishes. Redis retains up to 30 shared posts for seven days. Automatic posts consume the same site-wide AI quota as chats and on-demand updates; Redis or OpenAI failures leave the existing feed usable without automatic posting.
- State management is local React state only (`useState`, `useEffect`, `useRef`); there is no global store.
- Creator/post/story/message/live data should be changed in `src/lib/mockData.ts` first so landing, feed, live, messages, and creator profile routes stay synchronized.
- The shared UI layer follows shadcn conventions: Radix primitive wrappers, `React.forwardRef`, `cva` variants, and `cn()` for class merging.
- Styling is mostly Tailwind utility classes directly in components, with global CSS variables for shadcn color tokens.
- `ClientBody` resets `document.body.className` to `antialiased` after hydration to remove extension-added classes.
- API failures surface as retryable UI errors. There is no real auth or durable user account storage.

## Coding Conventions

- TSX files use function components and named local helper functions.
- Client-interactive route files begin with `"use client"`.
- Imports use the `@/` alias for shared components and utilities.
- UI composition uses shadcn-style components from `src/components/ui` plus direct Tailwind classes.
- Component styling favors dark backgrounds, gray borders, blue/pink gradients, badges, cards, and emoji-heavy labels.
- Semicolons are generally omitted in app files and UI components; Biome is configured for double quotes.
- TypeScript strict mode is enabled, but ESLint disables unused variable checks and several accessibility/image rules.
- Existing code uses some deprecated React DOM event props such as `onKeyPress`; preserve style for tiny changes, but prefer modern patterns when touching related code more broadly.
- Comments are used as section markers in long JSX files. Keep comments short and useful.

## Testing Notes

Shared limiter integration tests are in `tests/creator-rate-limit.test.mjs`. With the development Upstash credentials available, run `bun --env-file=.env.development.local test tests/creator-rate-limit.test.mjs`. The tests use unique, expiring Redis keys and verify concurrent per-visitor and site-wide limits. They are skipped when Redis credentials are absent. Run `bun test tests/creator-route.test.mjs` separately to check 429, 503, validation and successful-response behavior without calling OpenAI. There is no package-level `test` or `e2e` script.

Presence integration tests use isolated Redis keys: `bun --env-file=.env.development.local test tests/presence.test.mjs`. Run `bun test tests/presence-route.test.mjs` separately to check route behavior with mocked AI and Redis.

For code changes, at minimum run a type/build check when dependencies are installed:

```bash
npm run build
```

Also run the lint script if the project's package-manager setup has been verified:

```bash
npm run lint
```


## Deployment Notes

Vercel must run the app as a Next.js deployment with `OPENAI_API_KEY`, `KV_REST_API_URL`, and `KV_REST_API_TOKEN` set server-side. The Upstash resource is connected to the `strictly-woofs-com-1kjh` project. Static export cannot serve the creator API. The existing Netlify config is unverified and skips its Next plugin; do not assume it supports the API route without deployment testing.

## AI Agent Rules

- Read this `CODEX.md` before making changes.
- Treat `CODEX.md` as the canonical AI project memory file.
- Do not create or modify `AGENTS.md` unless the user explicitly asks.
- Do not modify application code for documentation-only tasks.
- Check existing page-local data and UI patterns before adding abstractions.
- Prefer small, focused edits. Avoid large rewrites of long route files unless the user asks for a refactor.
- Preserve the server-side API boundary and keep OpenAI credentials out of client code.
- Do not introduce new dependencies without explaining why and confirming the intended package manager.
- Do not treat mock auth, subscriptions, tips, messages, or live chat as real integrations.
- Do not add real payment, auth, database, moderation, or external API behavior without clearly calling out security and deployment implications.
- Be careful changing files in `src/components/ui/`; they are shared primitives.
- Be careful changing `next.config.js`, `netlify.toml`, lockfiles, or generated/static media in `public/`.
- Run relevant checks after edits when dependencies are installed. If checks cannot be run, explain why.
- Update this file when architecture, commands, deployment behavior, or conventions change.

## Risky Areas / Gotchas

- Package-manager ambiguity: both `package-lock.json` and `bun.lock` exist, scripts use `bunx`, and Netlify uses Bun.
- Public AI requests incur usage costs. Shared Redis limits bound request counts, not exact OpenAI spending; configure OpenAI billing limits separately. The free Upstash plan has its own quotas and AI requests fail closed when Redis is unavailable.
- `npm run lint` depends on `bunx`; npm-only environments may fail.
- `next lint` in the lint script needs verification with Next `15.3.8`.
- There is no real auth despite login/signup UI and 18+ copy. Do not rely on these screens for access control.
- There is no real billing despite subscription and tip UI. Do not connect real money movement without a proper payment flow and compliance review.
- User interaction persistence is local-only and browser-specific. Clearing localStorage resets subscriptions, messages, likes, comments, read notifications, and fake transactions. Shared automatic posts and anonymous presence are held temporarily in Redis.
- Mock data is centralized now; avoid reintroducing duplicated creator/post arrays in page files.
- `CreatorProfileClient` uses `Math.random()` during render for timestamps/likes/comments/video lengths, so values can change across renders.
- Remote images depend on third-party URLs and may break or violate hotlinking expectations.
- `public/` contains multiple large media assets, including a 4.9 MB MP4 and multi-megabyte PNGs.
- ESLint/Biome configs intentionally disable several accessibility/image-related checks; do not assume current markup is accessibility-complete.

## Documentation Gaps

- README is still the default create-next-app README and does not describe Strictly Woofs.
- No architecture docs existed before this file.
- No environment variable documentation exists because none are currently used.
- No testing strategy or QA checklist exists.
- No deployment verification notes beyond `netlify.toml`.
- No explicit package-manager decision is documented.
- No content policy/moderation guidance exists for the adult-coded parody copy.

## Maintenance Instructions

- Keep this file current whenever commands, package-manager choice, deployment config, app routes, data flow, or major conventions change.
- If a real backend is added, document API routes, data models, auth/session behavior, environment variables, migrations, and local service setup.
- If mock creator data is centralized, document the canonical source so future agents stop editing duplicate arrays.
- If tests are added, document the test command, single-test workflow, and any required fixtures/services.
- If deployment is fixed, document the confirmed hosting target and publish directory.
