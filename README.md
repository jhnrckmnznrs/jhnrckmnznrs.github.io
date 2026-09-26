# Banyuhay — personal website of John Rick Manzanares

This repository contains the source for **https://jhnrckmnznrs.github.io/**.

“Banyuhay” is a Filipino word for *metamorphosis* or *transformation*. The site brings together my research, publications, software, teaching material, mathematical notes, and selected personal writing.

## Stack

The site is intentionally small:

- [Astro](https://astro.build/) for static generation
- semantic HTML and custom CSS
- no client-side framework
- GitHub Actions + GitHub Pages for deployment

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
│   ├── publications.astro
│   ├── software.astro
│   ├── teaching.astro
│   ├── notes/
│   └── about.astro
└── styles/
```

The historical `assets/` directory is copied into the production build so existing presentation and poster links remain valid. New site-specific assets should be kept deliberately small.

## Design

The visual system replaces the previous NeuralGlass template with an original, quieter editorial design built around:

- warm bone/off-white
- deep ink/navy
- pine green
- terracotta
- muted ochre

The site uses mathematical and bone-inspired geometry sparingly rather than decorative particle effects.

## Deployment

Pull requests run a production build. Pushes to `master` build the site and publish `dist/` to GitHub Pages.
