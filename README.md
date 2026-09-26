# Banyuhay, personal website of John Rick Manzanares

This repository contains the source for **https://jhnrckmnznrs.github.io/**.

“Banyuhay” is a Filipino word for *metamorphosis* or *transformation*. The site brings together research, publications, software, teaching material, mathematical notes, and selected personal writing.

## Purpose

The website is designed as more than an academic profile. It has three related roles:

1. present current and past research clearly;
2. make public software, teaching material, and writing easier to find;
3. experiment with better ways to communicate mathematical research on the web.

The flagship research interface for topology and bone fragility follows a layered path:

> question → intuition → interaction → mathematics → implementation → evidence

## Stack

The site is intentionally small:

- [Astro](https://astro.build/) for static generation
- semantic HTML and custom CSS
- small amounts of JavaScript only where interaction adds meaning
- native MathML where practical
- GitHub Actions and GitHub Pages for deployment

## Local development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

The generated site is written to `dist/`.

## Structure

```text
src/
├── components/
├── layouts/
├── pages/
│   ├── research.astro
│   ├── research/
│   ├── publications.astro
│   ├── software.astro
│   ├── teaching.astro
│   ├── notes/
│   └── about.astro
└── styles/
```

The historical `assets/` directory is copied into the production build so existing presentation and poster links remain valid. New website assets should remain small and purposeful.

## Design

The visual system uses:

- warm bone and off white backgrounds
- deep ink
- pine green
- terracotta
- muted ochre

Mathematical and bone inspired geometry is used sparingly. Decoration should support the research identity rather than compete with the content.

## Editorial style

The prose should be direct and readable.

- Prefer ordinary words over compressed compound phrases.
- Use hyphens only when they are conventional, part of a proper name, or needed for clarity.
- Avoid decorative dashes in prose when a comma, colon, or new sentence is clearer.
- Keep mathematical terminology precise.
- Distinguish teaching examples, public research methods, public results, and work still in progress.

## Deployment

Pull requests run a production build. Pushes to `master` build the site and publish `dist/` to GitHub Pages.
