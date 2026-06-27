# CODEX.md

## Project Overview

Strictly Woofs is a prototype/parody creator-social web app built with Next.js App Router. The UI presents a landing page, mock login/signup flows, a social feed, live-stream browsing/chat, direct messages, and static creator profile pages.

This is currently a frontend-only static app. There is no real authentication, payment processing, database, API layer, or server actions. Login and signup always route to `/feed`; tips, subscriptions, likes, comments, live chat, messages, and story replies are simulated with client-side state and `localStorage`.

Project/package name in `package.json` is `nextjs-shadcn`, but the user-facing product is Strictly Woofs.

## Tech Stack

- Language: TypeScript and TSX.
- Runtime/framework: Next.js `15.3.8` with App Router, React `18.3.1`, React DOM `18.3.1`.
- Styling: Tailwind CSS `3.4.17`, CSS variables in `src/app/globals.css`, `tailwindcss-animate`.
- UI primitives: shadcn-style components in `src/components/ui`, Radix UI primitives, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`.
- Package managers/lockfiles: both `package-lock.json` and `bun.lock` exist. `package.json` scripts use `bunx` for lint/format, while README shows multiple package managers and Netlify uses Bun.
- Formatting/linting: Biome config exists for formatting and lint rules; ESLint flat config extends Next core web vitals/typescript with several rules disabled.
- Type checking: TypeScript `strict: true`, `noEmit: true`, `moduleResolution: "bundler"`, alias `@/* -> ./src/*`.
- Build output: `next.config.js` sets `output: "export"` and `distDir: "out"`, so builds are intended to produce static export output.
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

There are no API route handlers, CLI entry points, workers, migrations, or database initialization files in the current repo.

## How the App Works

The app is route-driven through Next App Router. Users land on `/`, navigate to mock login/signup, and are redirected to `/feed`. The feed renders canonical mock data from `src/lib/mockData.ts`. Most interactions persist locally in the browser via `src/lib/mockStorage.ts`.

Normal mock flow:

`/` landing page -> `/login` or `/signup` -> fake delay -> `router.push("/feed")` -> local toy interactions -> links to `/creator/[username]`, `/messages`, or `/live`.

Creator profiles use a hardcoded `creatorData` map in the server page and pass selected creator data to the client profile component. `generateStaticParams()` enumerates all supported usernames so the route can be statically exported.

Stories, messages, tips, subscriptions, notifications, and live chat are simulated client-side. Several flows use `setTimeout`, `setInterval`, `Math.random()`, and `localStorage` to create fake activity. There is no websocket, queue, API call, backend storage, moderation layer, or real money movement.

Images are a mix of files under `public/` and remote image URLs. `next.config.js` disables Next image optimization with `images.unoptimized: true`, matching static export usage.

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
- `npm run dev`: runs `next dev -H 0.0.0.0 --turbopack`. Starts the dev server on port 3000 by default and exposes it on all interfaces. Needs care after `next build` because this project uses `distDir: "out"` and dev/build artifacts can collide.
- `bun run dev`: equivalent script through Bun. Likely matches Netlify's Bun-oriented setup.
- `npm run build` or `bun run build`: runs `next build`. With current `next.config.js`, intended output is static export under `out/`.
- `python3 -m http.server 3001 -d out`: simple way to preview the built static export locally after `bun run build`.
- `npm run start` or `bun run start`: runs `next start`. Needs verification with `output: "export"` because static export sites are usually served from `out/` rather than with `next start`.
- `npm run lint` or `bun run lint`: runs `bunx tsc --noEmit && next lint`. Needs verification; this script requires Bun even when invoked via npm, and `next lint` may be incompatible with newer Next versions.
- `npm run format` or `bun run format`: runs `bunx biome format --write` over Biome's configured file set. This writes changes.

No test, single-test, database migration, seed, Docker, or preview script is defined in `package.json`.

## Environment Variables

No `.env`, `.env.example`, schema validator, or app code references to `process.env` were found. No environment variables are currently documented or required by the app code.

`netlify.toml` sets one build-time environment variable:

- `NETLIFY_NEXT_PLUGIN_SKIP=true`: configured under `[build.environment]`; purpose appears to be skipping the Netlify Next plugin behavior, but this needs deployment verification.

Do not add secrets to documentation. If future auth, payment, database, or API integrations are added, document variable names and purposes here using safe examples only.

## Architecture Notes

- App architecture is still page-centric, but mock product data is centralized in `src/lib/mockData.ts` and local persistence helpers are centralized in `src/lib/mockStorage.ts`.
- There is no backend boundary. All "business logic" is UI mock behavior in client components.
- State management is local React state only (`useState`, `useEffect`, `useRef`); there is no global store.
- Creator/post/story/message/live data should be changed in `src/lib/mockData.ts` first so landing, feed, live, messages, and creator profile routes stay synchronized.
- The shared UI layer follows shadcn conventions: Radix primitive wrappers, `React.forwardRef`, `cva` variants, and `cn()` for class merging.
- Styling is mostly Tailwind utility classes directly in components, with global CSS variables for shadcn color tokens.
- `ClientBody` resets `document.body.className` to `antialiased` after hydration to remove extension-added classes.
- The root layout metadata is still default create-next-app text (`Create Next App`), not product-specific.
- There is no error handling pattern beyond simple fallback UI for unknown creator usernames.
- There is no logging, validation library, auth/session handling, file upload/storage, or external API client.

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

No automated test framework or test files were found. There are no `test`, `e2e`, or single-test scripts in `package.json`.

For code changes, at minimum run a type/build check when dependencies are installed:

```bash
npm run build
```

Also run the lint script if the project's package-manager setup has been verified:

```bash
npm run lint
```

During this documentation pass, commands were inspected but not executed because dependencies were absent and installing packages was unnecessary for documentation.

## Deployment Notes

The app appears intended for static deployment:

- `next.config.js` uses `output: "export"`.
- `next.config.js` sets `distDir: "out"`.
- `images.unoptimized: true` is configured, which is typical for static export.

Netlify config needs verification:

- `netlify.toml` build command is `bun run build`.
- `netlify.toml` publish directory is `.next`.
- Current Next config changes the output/dist directory to `out`, so Netlify may be publishing the wrong directory.
- `@netlify/plugin-nextjs` is listed, but `NETLIFY_NEXT_PLUGIN_SKIP=true` is also set.

Before changing deployment config, verify the actual hosting target and whether the intended published directory is `.next` or `out`.

## AI Agent Rules

- Read this `CODEX.md` before making changes.
- Treat `CODEX.md` as the canonical AI project memory file.
- Do not create or modify `AGENTS.md` unless the user explicitly asks.
- Do not modify application code for documentation-only tasks.
- Check existing page-local data and UI patterns before adding abstractions.
- Prefer small, focused edits. Avoid large rewrites of long route files unless the user asks for a refactor.
- Preserve the current static-export constraints unless the user approves introducing backend features.
- Do not introduce new dependencies without explaining why and confirming the intended package manager.
- Do not treat mock auth, subscriptions, tips, messages, or live chat as real integrations.
- Do not add real payment, auth, database, moderation, or external API behavior without clearly calling out security and deployment implications.
- Be careful changing files in `src/components/ui/`; they are shared primitives.
- Be careful changing `next.config.js`, `netlify.toml`, lockfiles, or generated/static media in `public/`.
- Run relevant checks after edits when dependencies are installed. If checks cannot be run, explain why.
- Update this file when architecture, commands, deployment behavior, or conventions change.

## Risky Areas / Gotchas

- Package-manager ambiguity: both `package-lock.json` and `bun.lock` exist, scripts use `bunx`, and Netlify uses Bun.
- Deployment mismatch risk: `next.config.js` points output to `out`, while `netlify.toml` publishes `.next`.
- `npm run lint` depends on `bunx`; npm-only environments may fail.
- `next lint` in the lint script needs verification with Next `15.3.8`.
- There is no real auth despite login/signup UI and 18+ copy. Do not rely on these screens for access control.
- There is no real billing despite subscription and tip UI. Do not connect real money movement without a proper payment flow and compliance review.
- Persistence is local-only and browser-specific. Clearing localStorage resets subscriptions, messages, likes, comments, read notifications, and fake transactions.
- Mock data is centralized now; avoid reintroducing duplicated creator/post arrays in page files.
- `CreatorProfileClient` uses `Math.random()` during render for timestamps/likes/comments/video lengths, so values can change across renders.
- Remote images depend on third-party URLs and may break or violate hotlinking expectations.
- `public/` contains multiple large media assets, including a 4.9 MB MP4 and multi-megabyte PNGs.
- Root metadata still says "Create Next App".
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
