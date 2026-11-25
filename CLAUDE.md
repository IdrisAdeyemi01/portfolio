# Idris Idris · Portfolio

Personal portfolio for Idris Idris, Software Engineer (Flutter & Mobile), Lagos. Its one job: get a recruiter or client to trust him within 10 seconds and reach out for **remote senior engineering roles, contract work, and AI evaluation / code review work**. Every change should serve that goal.

## Stack

- React 19 + TypeScript, Vite 8, Tailwind CSS v4 (via `@tailwindcss/vite`, no `tailwind.config`), `motion` for scroll reveals, `lucide-react` icons.
- Single page, no router, no backend. Static build in `dist/`.
- Fonts: Plus Jakarta Sans (text) + JetBrains Mono (labels), loaded from Google Fonts in `index.html`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # tsc --noEmit (the only type/lint gate)
npm run build    # production build to dist/
```

There are no tests. "Done" means `npm run lint` and `npm run build` pass and the page has been checked in a browser at 375px and desktop width, in all three themes.

## Layout

```
index.html                 SEO/OG/Twitter meta, JSON-LD Person, fonts, theme pre-paint script
public/favicon.svg
src/content.ts             ALL copy, links, experience, projects, talks, achievements
src/theme.ts               Theme registry (ids, labels, meta colours, storage key)
src/index.css              Tailwind import, design tokens per theme, base styles
src/App.tsx                Theme state + section order
src/components/
  Navbar.tsx               Sticky header, scroll-spy, mobile drawer
  ThemeSwitcher.tsx        3-way radio group (Midnight / Daylight / Paper)
  Hero.tsx                 Name, pitch, CTAs, socials, photo or monogram placeholder, quick-scan strip
  About.tsx                Bio + skills grid
  Experience.tsx           Timeline
  FeaturedWork.tsx         Project cards (Problem / Decision / Shipped) + category filter
  DeviceMockups.tsx        Hand-built phone and browser mockups, one per project
  SpeakingAndAchievements.tsx
  ContactFooter.tsx        Contact card + footer
  Reveal.tsx               Fade/slide on scroll; renders a plain div under reduced motion
  SocialIcons.tsx
```

Section order and numbering: Hero, 01 About, 02 Experience, 03 Featured Work, 04 Speaking & Community, 05 Achievements, 06 Contact. The `0N.` labels are hardcoded in each component; renumber them if you reorder.

## Content rules (`src/content.ts`)

- **Content lives only in `content.ts`.** Components read `siteContent`; never hardcode copy in a component (the few existing exceptions, like the Achievements subheading and the mockup screen text, are fair game to move into content).
- **Placeholders** are strings wrapped in square brackets, e.g. `[DATES]`, `[CV_LINK]`, `[PHOTO_URL]`, `[APP_STORE_LINK]`. `isPlaceholderValue()` detects them; the UI renders placeholder links as muted mono text instead of a broken `<a>`, the CV button shows a "request by email" notice, and the photo falls back to the monogram. Replacing the string with a real value upgrades the UI automatically. Keep this pattern for any new link or image field.
- Experience items with unfilled highlights set `isPlaceholderHighlights: true` (renders them in mono/muted). Remove the flag when real highlights are added.
- Contact details (email, GitHub, LinkedIn) also appear in the JSON-LD block in `index.html`. Update both.

### Copy style (non-negotiable)

- Human, direct, first person where it's Idris speaking. No buzzword soup.
- **No em dashes (—) anywhere**, in copy or UI strings. Use commas, colons, full stops, or ` · `. En dashes are also best avoided. Check with `grep -rn '—' src index.html`.
- **No invented metrics, companies, dates or outcomes.** If a number or fact is needed and Idris hasn't given it, use a bracketed placeholder. Figures that are real and may be used: shipping Flutter professionally since 2021; 11 GA4 events on the Nology homepage analytics layer; 5,000+ requests handled by the MSSN Lagos support pipeline; Squadio winner 2021; Zindi hackathons 2018; DevFest Ibadan talk on Nov 21, 2026.
- Project cards follow the "I own it like a CEO" frame: **Problem → Decision → Shipped**.
- Pitch line is fixed: "I treat every feature I build like I'm its CEO."

## Theming

Three themes, set as `data-theme` on `<html>`:

| id | label | feel | accent (text / solid) |
|---|---|---|---|
| `dark` (default) | Midnight | near-black, cool | `#38A3FF` / `#0468D7` |
| `light` | Daylight | cool white | `#0468D7` / `#0468D7` |
| `paper` | Paper | warm editorial off-white | `#02569B` (Flutter navy) |

How it works:

1. `src/index.css` defines raw variables (`--t-*`) per `:root[data-theme=...]`, and an `@theme inline` block maps them to Tailwind colours.
2. `index.html` has an inline pre-paint script that reads `localStorage['idris-portfolio-theme']` and sets `data-theme` + `meta[name=theme-color]` before React loads, so there's no flash.
3. `src/theme.ts` (`THEMES`, `applyTheme`) owns runtime switching. `App.tsx` holds the state; `ThemeSwitcher` is the UI.

**Rule: components use only semantic token utilities.** Never hardcode hex colours, never use Tailwind palette colours like `slate-600`, never use `dark:` variants (there's no `.dark` class anymore). Available tokens:

- Surfaces: `canvas` (page), `surface` (cards), `surface-2` (inset wells), `surface-hover`
- Lines: `line`, `line-soft` (inner dividers), `line-strong` (hover/emphasis)
- Text, strongest to weakest: `ink` (headings), `ink-2`, `body` (paragraphs), `muted`, `subtle` (labels/meta), `faint` (placeholders only)
- Accent: `accent` (accent text/links/labels), `accent-hover`, `accent-solid` (filled buttons), `accent-solid-hover`, `on-accent` (text on filled buttons)
- Decorative: `glow` (blurred ambient blob in the hero placeholder; warm amber in Paper, blue elsewhere), plus `--t-grid-line` used by the `.bg-blueprint` class

Measured contrast (worst case across `canvas`/`surface`/`surface-2`, Nov 2026): `body` ≥ 8.5, `muted` ≥ 6.2, `subtle` ≥ 4.7, `accent` ≥ 4.9, filled button text ≥ 5.3 in every theme. `faint` is 3.2 to 3.9, which is why it's reserved for `[PLACEHOLDER]` text that disappears once real content is added. Re-measure after changing any `--t-*` value.

Use them with any utility: `bg-surface`, `text-muted`, `border-line`, `hover:text-accent`, `bg-accent/15`, `divide-line`, `before:bg-line`.

**Exception:** the screens inside `DeviceMockups.tsx` are fixed colours on purpose. They depict the apps, not the site, so they don't follow the site theme (Kabsa's screen follows its own local light/dark preview toggle). Only the device frames use tokens.

**Adding a 4th theme:** add a `:root[data-theme="x"]` block in `index.css` defining every `--t-*` variable, add an entry to `THEMES` in `theme.ts`, add its id + canvas colour to the `themes` map in the `index.html` pre-paint script, and add an icon in `ThemeSwitcher.tsx`. Check contrast: `body` and `muted` on `canvas`/`surface` should be at least 4.5:1, `subtle` at least 4.5:1 on `canvas`, accent text at least 4.5:1.

## Design rules

- Polished product, not a template. Lots of whitespace, strong type, one accent hue (Flutter blue family).
- Layout container: `mx-auto max-w-6xl px-5 sm:px-8`. Sections: `py-16 sm:py-20`, `scroll-mt-20` (sticky header is `h-16`), bordered by `border-b border-line`.
- Section header pattern: mono `text-xs text-accent` label `0N. Heading`, then an `h2` lead (`text-2xl sm:text-3xl font-semibold tracking-tight text-ink text-balance`).
- Cards: `rounded-xl`/`rounded-2xl border border-line bg-surface`, hover lift `hover:-translate-y-0.5 hover:border-line-strong`.
- Motion: subtle only. Use `<Reveal>` for scroll-in; it already respects `prefers-reduced-motion`, and `index.css` neutralises CSS transitions under reduced motion. No parallax, no bouncy springs, no cursor effects.
- Tap targets at least 40 to 44px. Mobile first: everything must work at 375px with no horizontal scroll.

## Accessibility & SEO

- Semantic landmarks: one `h1` (Hero), each section is `<section aria-labelledby>` with an `h2`. Keep heading order.
- Skip link in `App.tsx`. Visible focus ring via `:focus-visible` using the accent token.
- Interactive groups: the theme switcher is a `radiogroup` with roving tabindex and arrow keys; filters use `aria-pressed`; mobile menu uses `aria-expanded`/`aria-controls` and closes on Escape.
- Decorative icons get `aria-hidden="true"`; mockups are `role="img"` with a descriptive `aria-label`.
- SEO/OG/Twitter tags and JSON-LD live in `index.html`. There's no `og:image` or canonical URL yet (needs the deployed domain and a 1200x630 image).

## Leftovers from the AI Studio scaffold

This was generated in Google AI Studio. Not used by the site and safe to clean up when convenient: `@google/genai`, `express`, `dotenv`, `@types/express`, `tsx` in `package.json`; `.env.example` (Gemini key); `metadata.json`; the AI Studio `README.md`; the `DISABLE_HMR` logic and `copy-unbundled-src-assets` plugin in `vite.config.ts`. The package name is still `react-example`.

## Open TODOs (content Idris needs to supply)

- `[DATES]` for every role; highlights for Mabilla Group, ErrandPay, Whoosh, Greamit, NesterVerify.
- `[CV_LINK]`, `[PHOTO_URL]`.
- Store links for Nology Mobile; links for NesterVerify, EMC Portal (site + repo), Runway repo.
- DevFest Ibadan 2026 slides and recording links.
- LinkedIn URL in `content.ts` and `index.html` should be confirmed.
- Deployment target, domain, `og:image`, canonical URL.
