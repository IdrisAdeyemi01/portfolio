import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, Lock, Mail, RotateCcw, Sparkles, Trophy, X } from 'lucide-react';
import { siteContent } from '../content';
import { useQuest } from './QuestContext';

const TOAST_MS = 4200;

/** Progress ring drawn with two circles; stroke-dashoffset animates with motion. */
function Ring({ progress, size = 30 }: { progress: number; size?: number }) {
  const stroke = 3;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--t-line-strong)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--t-accent)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        initial={false}
        animate={{ strokeDashoffset: c * (1 - progress) }}
        transition={{ type: 'spring', stiffness: 90, damping: 18 }}
      />
    </svg>
  );
}

function Confetti({ burstKey }: { burstKey: number }) {
  const reduce = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: `${burstKey}-${i}`,
        x: (Math.random() - 0.5) * 900,
        y: -(Math.random() * 520 + 180),
        rotate: Math.random() * 720 - 360,
        size: Math.random() * 6 + 5,
        delay: Math.random() * 0.15,
        color: ['var(--t-accent)', 'var(--t-accent-solid)', '#F5B83D', '#3DDC97', '#FF6B6B'][i % 5],
        round: i % 3 === 0,
      })),
    [burstKey]
  );
  if (reduce || burstKey === 0) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute bottom-0"
          style={{
            width: p.size,
            height: p.round ? p.size : p.size * 0.45,
            background: p.color,
            borderRadius: p.round ? 999 : 2,
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 900], opacity: [1, 1, 0], rotate: p.rotate }}
          transition={{ duration: 2.6, delay: p.delay, ease: [0.2, 0.7, 0.4, 1], times: [0, 0.4, 1] }}
        />
      ))}
    </div>
  );
}

function Toasts() {
  const { toasts, dismissToast } = useQuest();
  const reduce = useReducedMotion();

  useEffect(() => {
    const timers = toasts.map((t) => window.setTimeout(() => dismissToast(t.key), TOAST_MS + (t.complete ? 3000 : 0)));
    return () => timers.forEach(window.clearTimeout);
  }, [toasts, dismissToast]);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-20 z-50 flex flex-col items-end gap-2 sm:inset-x-auto sm:right-6"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.key}
            layout={!reduce}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: 40, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="pointer-events-auto flex w-full max-w-[340px] items-center gap-3 rounded-xl border border-line-strong bg-surface p-3 shadow-xl shadow-black/10"
          >
            <motion.span
              initial={reduce ? false : { rotate: -30, scale: 0.4 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 14, delay: 0.08 }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-solid text-on-accent"
            >
              {t.complete ? <Trophy className="h-4 w-4" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
            </motion.span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10.5px] uppercase tracking-wide text-accent">
                {t.complete ? 'Quest complete' : 'Achievement unlocked'}
              </p>
              <p className="truncate text-sm font-semibold text-ink">
                {t.item.title} <span className="font-mono text-xs font-medium text-subtle">+{t.item.xp} XP</span>
              </p>
              {t.complete && (
                <a href="#contact" className="mt-0.5 inline-block text-xs font-medium text-accent hover:text-accent-hover">
                  Let&apos;s talk →
                </a>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(t.key)}
              aria-label="Dismiss notification"
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-subtle hover:bg-surface-hover hover:text-ink"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function Panel({ onClose }: { onClose: () => void }) {
  const { items, unlocked, xp, totalXp, isComplete, setHidden, reset } = useQuest();
  const reduce = useReducedMotion();
  const { quest, meta } = siteContent;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-label={quest.title}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
      style={{ transformOrigin: 'bottom right' }}
      className="absolute bottom-14 right-0 w-[min(340px,calc(100vw-32px))] rounded-2xl border border-line-strong bg-surface p-4 shadow-2xl shadow-black/15 outline-none"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-accent">{quest.title}</p>
          <p className="mt-1 text-[13px] leading-snug text-muted">{isComplete ? quest.completeBody : quest.intro}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quest panel"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-subtle hover:bg-surface-hover hover:text-ink"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* XP bar */}
      <div className="mt-3">
        <div className="flex items-baseline justify-between font-mono text-[11px] text-subtle">
          <span>
            {unlocked.size}/{items.length} unlocked
          </span>
          <span className="tabular-nums">
            {xp}/{totalXp} XP
          </span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={false}
            animate={{ width: `${(xp / totalXp) * 100}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          />
        </div>
      </div>

      <ul className="mt-3 max-h-[46vh] space-y-1 overflow-y-auto">
        {items.map((item) => {
          const done = unlocked.has(item.id);
          const masked = item.secret && !done;
          return (
            <li
              key={item.id}
              className={`flex items-center gap-3 rounded-lg px-2 py-1.5 ${done ? '' : 'opacity-75'}`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                  done ? 'bg-accent-solid text-on-accent' : 'border border-line bg-surface-2 text-faint'
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Lock className="h-3 w-3" aria-hidden="true" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className={`text-[13px] font-medium ${done ? 'text-ink' : 'text-body'}`}>
                  {masked ? 'Secret achievement' : item.title}
                  <span className="sr-only">{done ? ', unlocked' : ', locked'}</span>
                </p>
                <p className="text-[11.5px] leading-snug text-subtle">{item.hint}</p>
              </div>
              <span className="font-mono text-[10.5px] text-subtle tabular-nums">+{item.xp}</span>
            </li>
          );
        })}
      </ul>

      {isComplete && (
        <a
          href={`mailto:${meta.email}?subject=${encodeURIComponent('I finished your Explorer quest')}`}
          className="mt-3 flex min-h-[40px] items-center justify-center gap-2 rounded-lg bg-accent-solid text-sm font-medium text-on-accent hover:bg-accent-solid-hover"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          <span>{quest.completeTitle} Let&apos;s talk</span>
        </a>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-line-soft pt-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-subtle hover:text-ink"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          Reset
        </button>
        <button
          type="button"
          onClick={() => {
            setHidden(true);
            onClose();
          }}
          className="font-mono text-[11px] text-subtle hover:text-ink"
        >
          Hide the game
        </button>
      </div>
    </motion.div>
  );
}

/** Floating badge, unlock toasts, and the completion confetti. */
export function QuestHud() {
  const { items, unlocked, hidden, celebrateKey, isComplete } = useQuest();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const visible = !hidden && unlocked.size > 0;
  const progress = unlocked.size / items.length;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <>
      <Confetti burstKey={celebrateKey} />
      {!hidden && <Toasts />}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="hud"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6"
          >
            <AnimatePresence>{open && <Panel onClose={close} />}</AnimatePresence>
            <motion.button
              ref={buttonRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={`${siteContent.quest.title}: ${unlocked.size} of ${items.length} achievements unlocked`}
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.95 }}
              className="flex h-12 items-center gap-2 rounded-full border border-line-strong bg-surface/95 py-1.5 pl-1.5 pr-4 shadow-lg shadow-black/10 backdrop-blur"
            >
              <span className="relative flex h-9 w-9 items-center justify-center">
                <Ring progress={progress} size={36} />
                {isComplete ? (
                  <Trophy className="absolute h-3.5 w-3.5 text-accent" aria-hidden="true" />
                ) : (
                  <Sparkles className="absolute h-3.5 w-3.5 text-accent" aria-hidden="true" />
                )}
              </span>
              <span className="font-mono text-xs font-medium text-ink tabular-nums">
                {unlocked.size}/{items.length}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
