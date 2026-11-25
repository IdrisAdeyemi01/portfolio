# Idris Idris · Portfolio

Personal site for Idris Idris, Software Engineer (Flutter & Mobile), Lagos.

Built with React, TypeScript, Tailwind CSS v4 and Vite. Three colour themes: Midnight, Daylight and Paper.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Edit content

All copy, links, experience and projects live in [`src/content.ts`](src/content.ts). Values in square brackets like `[CV_LINK]` are placeholders; replace them and the UI upgrades automatically.

## Deploy

Every push to `main` builds and deploys to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
