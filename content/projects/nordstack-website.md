---
title: NordStack
slug: nordstack-website
kind: web
year: 2026
status: In progress
summary: This website: projects, builds and photographs, built from the ground up.
stack: Astro, TypeScript, Svelte, Supabase
role: Design and code
started: 2026-10
github: https://github.com/NordStackDevelopment/website
live: https://nordstack-bcb.pages.dev
tags: Astro, TypeScript
cover: images/nordstack-website-home.png
screenshot: images/nordstack-website-home.png | The home page, with the layers getting greener towards the footer.
screenshot: images/nordstack-website-builds.png | The Builds page, showing the build log of this very site.
screenshot: images/nordstack-website-phone.png | The same home page on a phone.
build: building-nordstack
published: true
---

## Why I made it

I wanted one place for everything I make: code, things built with my hands, and photographs. Most portfolio
templates are made for one of those. NordStack is made for all three, and it's built in the open, with
[its own build log](/builds/building-nordstack) on the site.

## How it works

The pages are built ahead of time with Astro, so visitors get plain, fast HTML and CSS. The look comes straight from
the NordStack brand kit: ink, bone and bottle green, Cinzel and EB Garamond, and layers that step down the page like
rock. Content will live in Supabase, edited from a small admin area, and pressing Publish rebuilds the site on
Cloudflare Pages.

```bash
git clone https://github.com/NordStackDevelopment/website
cd website && npm install && npm run dev
```

## What I learned

Planning the pages on a design canvas first made the build quick: every page already had a shape before any code was
written. Working in small branches that merge into `dev`, with checks that must pass, keeps the live site safe.
