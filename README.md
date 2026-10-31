# NordStack website

The NordStack website: projects, builds and photographs. Built with [Astro](https://astro.build) and TypeScript,
with [Svelte](https://svelte.dev) for the admin forms and [Supabase](https://supabase.com) for content, photos and
sign-in. Hosted on Cloudflare Pages.

## Run it

Needs Node 22 or newer.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type check, then build into dist/
npm test           # Playwright smoke tests against the built site
```

The first time you run the tests on a new machine, install the browser with `npx playwright install chromium`.

## Folders

| Folder | Contents |
|---|---|
| `src/pages/` | One file per page address |
| `src/layouts/` | Shared page shells |
| `src/components/` | Navbar, footer, layers and other shared parts |
| `src/admin/` | Svelte components for the admin editors |
| `src/lib/` | Data loading, Supabase client, photo processing |
| `src/styles/` | Brand tokens and global styles |
| `public/` | Favicons, app icons and logo files from the NordStack logo kit (never redrawn) |
| `sample-data/` | Sample content used until Supabase is connected |
| `supabase/` | Database migrations and Edge Functions |
| `content/` | Real content written alongside the build, such as the first build log |
| `tests/` | Playwright tests |

## Settings

Copy `.env.example` to `.env` and fill in the Supabase URL and public key. Never commit `.env` or the Supabase
service role key.

## Branches

The site is built in three layers of branches:

| Branch | What it is | Deploys to |
|---|---|---|
| `main` | The live site. Only changes when `dev` is merged in at the end of a phase, after that phase is tested. | The domain |
| `dev` | Where finished work collects during a phase. | A Cloudflare preview link |
| `feat/…`, `fix/…`, `chore/…`, `docs/…` | One piece of work each, branched from `dev`. | A preview link per branch |

1. Branch from `dev`: `git switch dev && git pull && git switch -c feat/photo-viewer`.
2. Open a pull request into `dev`. The checks (type check, build, tests) must pass before merging.
3. When a whole phase is in `dev` and tested on its preview link, open a pull request from `dev` into `main`.

Never commit straight to `main` or `dev`. Both are protected on GitHub: no deleting, no force pushes, pull
requests only, and the `build-and-test` check must pass. Merged work branches are deleted automatically.

## Build logs

Until Supabase is connected, each build log is a Markdown file at `content/<slug>/build-log.md`, with its photos in
`content/<slug>/images/`. Each `## Layer N · Title` section becomes one layer on the page, and `## Parts` and
`## Files` sections become the parts list and files list. `src/lib/buildlog.ts` reads them at build time.
