import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Menu, Send, X } from 'lucide-react';
import { siteContent } from '../content';
import type { ThemeId } from '../theme';
import { ScrollProgress } from './MotionBits';
import { ThemeSwitcher } from './ThemeSwitcher';

interface NavbarProps {
  theme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

export function Navbar({ theme, onThemeChange }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('');

  useEffect(() => {
    // Every section is observed (some have no nav link) so the highlight clears between them.
    const sectionIds = siteContent.sectionIds;
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = visible[0].target.id;
          const isNavTarget = siteContent.nav.some((item) => item.href === `#${id}`);
          setActiveHash(isNavTarget ? `#${id}` : '');
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-line bg-canvas/85 backdrop-blur-md">
      <ScrollProgress />
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-3 px-5 sm:gap-8 sm:px-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#hero"
          onClick={() => setMobileOpen(false)}
          className="shrink-0 whitespace-nowrap text-base font-semibold tracking-tight text-ink transition-colors hover:text-accent"
        >
          {siteContent.meta.name}
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {siteContent.nav.map((item) => {
            const isActive = activeHash === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'location' : undefined}
                className={`relative shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors duration-150 ${
                  isActive ? 'font-medium text-accent' : 'text-muted hover:text-ink'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-md bg-accent/10"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Theme switcher & mobile menu trigger */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#contact"
            className="group hidden min-h-[40px] items-center gap-1.5 whitespace-nowrap rounded-lg bg-accent-solid px-3.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-solid-hover sm:inline-flex"
          >
            Get in touch
            <Send className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <ThemeSwitcher theme={theme} onChange={onThemeChange} />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-ink-2 transition-colors duration-150 hover:border-line-strong lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile navigation"
          className="border-b border-line bg-canvas px-5 py-4 shadow-lg lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {siteContent.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-ink-2 transition-colors hover:bg-surface-hover hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-accent-solid text-base font-medium text-on-accent"
              >
                Get in touch
                <Send className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
