import { useRef, type KeyboardEvent } from 'react';
import { motion } from 'motion/react';
import { Feather, Moon, Sun, type LucideIcon } from 'lucide-react';
import { THEMES, type ThemeId } from '../theme';

const ICONS: Record<ThemeId, LucideIcon> = {
  dark: Moon,
  light: Sun,
  paper: Feather,
};

interface ThemeSwitcherProps {
  theme: ThemeId;
  onChange: (theme: ThemeId) => void;
}

/**
 * Three-way segmented theme control, implemented as an ARIA radio group:
 * one tab stop, arrow keys move between options.
 */
export function ThemeSwitcher({ theme, onChange }: ThemeSwitcherProps) {
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = THEMES.findIndex((t) => t.id === theme);
    let next = current;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (current + 1) % THEMES.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (current - 1 + THEMES.length) % THEMES.length;
    else return;
    event.preventDefault();
    onChange(THEMES[next].id);
    buttonsRef.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      onKeyDown={onKeyDown}
      className="inline-flex items-center gap-0.5 rounded-lg border border-line bg-surface p-0.5"
    >
      {THEMES.map((option, index) => {
        const Icon = ICONS[option.id];
        const active = option.id === theme;
        return (
          <button
            key={option.id}
            ref={(el) => {
              buttonsRef.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${option.label} (${option.description})`}
            title={option.label}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(option.id)}
            className={`relative inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors duration-150 ${
              active ? 'text-on-accent' : 'text-muted hover:bg-surface-hover hover:text-ink'
            }`}
          >
            {active && (
              <motion.span
                layoutId="theme-pill"
                aria-hidden="true"
                className="absolute inset-0 rounded-md bg-accent-solid"
                transition={{ type: 'spring', stiffness: 500, damping: 32 }}
              />
            )}
            <motion.span
              key={active ? 'on' : 'off'}
              initial={active ? { rotate: -90, scale: 0.6 } : false}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 16 }}
              className="relative"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          </button>
        );
      })}
    </div>
  );
}
