import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { siteContent, type QuestId, type QuestItem } from '../content';
import type { ThemeId } from '../theme';

/**
 * Explorer quest state. Progress is a per-viewer convenience kept in
 * localStorage; every read/write is guarded so the site works without it.
 */

const STORAGE_KEY = 'idris-portfolio-quest';
const SECRET_WORD = 'flutter';
const ALL_THEMES: ThemeId[] = ['dark', 'light', 'paper'];

interface SavedState {
  unlocked: QuestId[];
  themes: ThemeId[];
  sections: string[];
  hidden: boolean;
}

export interface QuestToast {
  key: number;
  item: QuestItem;
  complete: boolean;
}

interface QuestContextValue {
  items: QuestItem[];
  unlocked: Set<QuestId>;
  xp: number;
  totalXp: number;
  isComplete: boolean;
  hidden: boolean;
  toasts: QuestToast[];
  celebrateKey: number;
  unlock: (id: QuestId) => void;
  noteTheme: (theme: ThemeId) => void;
  setHidden: (hidden: boolean) => void;
  dismissToast: (key: number) => void;
  reset: () => void;
}

const QuestContext = createContext<QuestContextValue | null>(null);

function load(): SavedState {
  const empty: SavedState = { unlocked: [], themes: [], sections: [], hidden: false };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<SavedState>;
    return {
      unlocked: Array.isArray(parsed.unlocked) ? parsed.unlocked : [],
      themes: Array.isArray(parsed.themes) ? parsed.themes : [],
      sections: Array.isArray(parsed.sections) ? parsed.sections : [],
      hidden: parsed.hidden === true,
    };
  } catch {
    return empty;
  }
}

function save(state: SavedState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage blocked: progress just won't persist.
  }
}

export function QuestProvider({ children }: { children: ReactNode }) {
  const items = siteContent.quest.items;
  const [state, setState] = useState<SavedState>(load);
  const [toasts, setToasts] = useState<QuestToast[]>([]);
  const [celebrateKey, setCelebrateKey] = useState(0);
  const toastKey = useRef(0);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => save(state), [state]);

  const unlock = useCallback(
    (id: QuestId) => {
      const current = stateRef.current;
      if (current.unlocked.includes(id)) return;
      const item = items.find((q) => q.id === id);
      if (!item) return;

      const nextUnlocked = [...current.unlocked, id];
      const complete = items.every((q) => nextUnlocked.includes(q.id));
      const next = { ...current, unlocked: nextUnlocked };
      stateRef.current = next;
      setState(next);

      if (!current.hidden) {
        toastKey.current += 1;
        const key = toastKey.current;
        setToasts((prev) => [...prev.slice(-2), { key, item, complete }]);
      }
      if (complete) setCelebrateKey((k) => k + 1);
    },
    [items]
  );

  const noteTheme = useCallback(
    (theme: ThemeId) => {
      const current = stateRef.current;
      if (current.themes.includes(theme)) return;
      const themes = [...current.themes, theme];
      const next = { ...current, themes };
      stateRef.current = next;
      setState(next);
      if (ALL_THEMES.every((t) => themes.includes(t))) unlock('shapeshifter');
    },
    [unlock]
  );

  // Section visits: "First steps" once past the hero, "Completionist" once all are seen.
  useEffect(() => {
    const ids = siteContent.sectionIds;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          const current = stateRef.current;
          if (id !== 'hero') unlock('first-steps');
          if (current.sections.includes(id)) continue;
          const sections = [...current.sections, id];
          const next = { ...stateRef.current, sections };
          stateRef.current = next;
          setState(next);
          if (ids.every((s) => sections.includes(s))) unlock('completionist');
        }
      },
      // A thin band across the middle of the viewport: a section counts as
      // visited when it crosses it, however tall the section is.
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [unlock]);

  // Secret: typing the word anywhere on the page.
  useEffect(() => {
    let buffer = '';
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.key.length !== 1) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      buffer = (buffer + event.key.toLowerCase()).slice(-SECRET_WORD.length);
      if (buffer === SECRET_WORD) unlock('secret-flutter');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [unlock]);

  const setHidden = useCallback((hidden: boolean) => {
    setState((prev) => ({ ...prev, hidden }));
    if (hidden) setToasts([]);
  }, []);

  const dismissToast = useCallback((key: number) => {
    setToasts((prev) => prev.filter((t) => t.key !== key));
  }, []);

  const reset = useCallback(() => {
    const next: SavedState = { unlocked: [], themes: [], sections: [], hidden: false };
    stateRef.current = next;
    setState(next);
    setToasts([]);
  }, []);

  const value = useMemo<QuestContextValue>(() => {
    const unlocked = new Set(state.unlocked);
    const xp = items.filter((q) => unlocked.has(q.id)).reduce((sum, q) => sum + q.xp, 0);
    const totalXp = items.reduce((sum, q) => sum + q.xp, 0);
    return {
      items,
      unlocked,
      xp,
      totalXp,
      isComplete: items.every((q) => unlocked.has(q.id)),
      hidden: state.hidden,
      toasts,
      celebrateKey,
      unlock,
      noteTheme,
      setHidden,
      dismissToast,
      reset,
    };
  }, [items, state, toasts, celebrateKey, unlock, noteTheme, setHidden, dismissToast, reset]);

  return <QuestContext.Provider value={value}>{children}</QuestContext.Provider>;
}

export function useQuest() {
  const ctx = useContext(QuestContext);
  if (!ctx) throw new Error('useQuest must be used inside <QuestProvider>');
  return ctx;
}
