---
title: Building NordStack
slug: building-nordstack
summary: The NordStack website, from a logo sketch to a live site, one layer at a time.
status: In progress
started: 2026-10-30
updated: 2026-10-31
---

<!--
This is the first build log for the website. Each "## Layer" section becomes one row in the build_layers table,
with Layer 1 at the bottom of the page. Fields under each heading map to its columns.
Keep it public-safe: no real names, no home paths, no keys.
-->

## Layer 1 · The brand

- **Status:** Done
- **Dates:** 2026-10-30
- **Photo:** none yet
- **Caption:**

Before any code, NordStack needed a face. The logo is a rugged peak cut into rock faces and engraved, built stone by
stone from the ground up: the mountain carries "Nord" and its stacked faces carry "Stack". It went through more than
fifteen concept rounds before settling, and came out as a kit of ten versions in four colours, plus favicons and app
icons.

Alongside it came the colours and type. Bottle green `#2C3A2F`, bone `#E6DFD0`, ink `#1E1B18` and a soft
burgundy-light `#D1A3A7` for accents. Cinzel for headings, EB Garamond for reading.

## Layer 2 · Finding the style

- **Status:** Done
- **Dates:** 2026-10-30 – 2026-10-31
- **Photo:** none yet
- **Caption:**

Three home page concepts first: an engraved paper journal, a dark photo-first "Nightfall", and "Strata", where the
page itself is rock layers darkening towards the footer. None was quite right alone, so the fourth, D, took Strata's
layout, the journal's green navbar and Nightfall's ink background. That's the one.

Then every page was designed in style D: nine public pages and a five-page admin area for uploading projects, build
logs and photos. A look at how other builders and photographers present their work led to a few changes: build logs
now show the latest photo first, photo collections get one big photo per row with the camera settings underneath,
and empty sections simply don't appear.

## Layer 3 · The plan and the foundations

- **Status:** Done
- **Dates:** 2026-10-31
- **Photo:** `images/layer-03-first-page.png`
- **Caption:** The very first page the new site served: just the logo on the layered background.

The site is built with Astro and TypeScript. Public pages are made ahead of time as plain HTML and CSS, so they load
fast and keep working even if the database is asleep. Content, photos and sign-in live in Supabase, and the admin
forms are small Svelte components. Pressing Publish rebuilds the site, and the change is live about a minute later.

Photos get special care: before anything is uploaded, the browser reads the camera settings, rounds the latitude to
whole degrees, and redraws the photo at two sizes. Redrawing writes a brand-new file with no hidden location data, so
exact GPS never leaves the computer.

Today the project skeleton went in: Astro with strict TypeScript, Svelte, the Supabase client, the favicons and logo
files straight from the brand kit, and a first test that opens the page and checks the logo is there. The build and
the test both pass.

Then the code went up to GitHub and hosting was connected. Cloudflare Pages builds the `main` branch into the live
site and gives every other branch its own preview link, so nothing reaches the live site before it has been looked
at. Work happens in three layers of branches: small `feat/` and `fix/` branches merge into `dev`, and `dev` merges
into `main` only when a whole phase is done and tested. The first live page was the logo on its layered background.

## Layer 4 · Look and layout

- **Status:** Done
- **Dates:** 2026-10-31
- **Photo:** `images/layer-04-home-desktop.png`
- **Caption:** The Home page, built for real: five layers from ink to bottle green, joined by ridged edges.

The design became code. The colours, type sizes and spacing went into one tokens file, and Cinzel and EB Garamond are
now served from the site itself instead of from Google. The navbar, the ridged edge between layers and the footer are
shared parts, so every page gets them for free.

The Home page came next, rebuilt from the approved design. The "Now building" band isn't sample text: it shows this
very build log, reading its layers from the same place the rest of the content will come from. The Work filter works
without a page reload and tells screen readers how many items are showing. On a phone everything stacks into one
column with no sideways scrolling, and a test checks that on every build.

## Layer 5 · The pages

- **Status:** In progress
- **Dates:** 2026-10-31 –
- **Photo:**
- **Caption:**

With the look in place, the pages started arriving, starting with this one. The build log you're reading isn't typed
into the page: it's a plain text file kept alongside the code, one section per layer. When the site is built, each
section becomes a band on the page, the newest photo goes to the top, and the jump list, progress bar and reading
time are worked out from the text. Adding a layer is just adding a section to the file.

The site's two main branches are now locked down as well. Nothing can be pushed straight to them, they can't be
deleted or rewritten, and a change only gets in through a pull request whose tests have passed.

The Projects pages came next and work the same way. Each project is one text file with a few facts at the top
(what kind it is, its status, the stack, links) and the write-up below. The list page groups them with a filter for
apps, tools, web and scripts, and every project page links back to its build log when it has one. This site is the
first project on the list.

Photos followed. Collections are grouped by year, and each one opens into a column of large frames with the
camera settings beside them. Clicking a photo opens a full-screen viewer that works with the keyboard: the arrow
keys move between photos and Escape closes it. Until the database arrives in the next phase, the collections are
sample placeholders.

## Parts

| Part | What for |
|---|---|
| Astro | Builds the pages |
| TypeScript | The language for everything |
| Svelte | Admin forms |
| Supabase | Database, photo storage, sign-in |
| Cloudflare Pages | Hosting |
| exifr | Reads camera settings from photos |
| Playwright | Tests |
