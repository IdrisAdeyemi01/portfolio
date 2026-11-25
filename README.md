# Idris Idris · Portfolio

Live: **https://idris-idris.vercel.app**

Personal site for Idris Idris, Software Engineer, Lagos.

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

Hosted on Vercel (framework preset: Vite, build `npm run build`, output `dist`). Redeploy from this folder with:

```bash
npx vercel --prod
```

If the repo is connected to Vercel through GitHub, every push to `main` deploys automatically.
