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

- **Status:** In progress
- **Dates:** 2026-10-31 –
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

**Up next in this layer:** the GitHub repository and Cloudflare Pages, so every change gets its own preview link.

## Layer 4 · Look and layout

- **Status:** Next
- **Dates:**
- **Photo:**
- **Caption:**

The shared navbar, ridged layers and footer, with self-hosted fonts, then the Home page.

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
