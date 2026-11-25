/**
 * Theme registry. The CSS variables for each theme live in src/index.css under
 * :root[data-theme="<id>"]. The pre-paint script in index.html must stay in
 * sync with THEME_IDS and THEME_STORAGE_KEY.
 */

export type ThemeId = 'dark' | 'light' | 'paper';

export interface ThemeOption {
  id: ThemeId;
  label: string;
  description: string;
  /** Browser UI colour (meta theme-color). Matches --t-canvas. */
  metaColor: string;
}

export const THEME_STORAGE_KEY = 'idris-portfolio-theme';
export const DEFAULT_THEME: ThemeId = 'dark';

export const THEMES: ThemeOption[] = [
  { id: 'dark', label: 'Midnight', description: 'Dark theme', metaColor: '#090C10' },
  { id: 'light', label: 'Daylight', description: 'Light theme', metaColor: '#FAFBFD' },
  { id: 'paper', label: 'Paper', description: 'Warm paper theme', metaColor: '#F5F0E6' },
];

const THEME_IDS = THEMES.map((t) => t.id);

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && (THEME_IDS as string[]).includes(value);
}

export function getInitialTheme(): ThemeId {
  if (typeof document !== 'undefined') {
    // The pre-paint script in index.html has already resolved the theme.
    const attr = document.documentElement.dataset.theme;
    if (isThemeId(attr)) return attr;
  }
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemeId(saved)) return saved;
  } catch {
    // Storage can be blocked (private mode); fall back to default.
  }
  return DEFAULT_THEME;
}

export function applyTheme(theme: ThemeId) {
  const root = document.documentElement;
  root.dataset.theme = theme;

  const option = THEMES.find((t) => t.id === theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta && option) meta.setAttribute('content', option.metaColor);

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage access errors
  }
}
