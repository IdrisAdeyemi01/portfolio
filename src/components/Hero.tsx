import { useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ArrowDownRight, Download, Mail } from 'lucide-react';
import { isPlaceholderValue, siteContent } from '../content';
import { useQuest } from '../quest/QuestContext';
import { CountUp } from './MotionBits';
import { SocialIcon } from './SocialIcons';

const ease = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
};
const word: Variants = {
  hidden: { opacity: 0, y: '0.6em', rotate: 2 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease } },
};

export function Hero() {
  const { hero, socials, meta, stats } = siteContent;
  const { unlock } = useQuest();
  const reduce = useReducedMotion();
  const [photoError, setPhotoError] = useState(false);
  const [cvNoticeVisible, setCvNoticeVisible] = useState(false);

  const hasPhoto = !isPlaceholderValue(hero.photoUrl) && !photoError;
  const hasRealCv = !isPlaceholderValue(hero.secondaryCta.url);
  const initial = reduce ? 'show' : 'hidden';

  return (
    <section id="hero" aria-labelledby="hero-heading" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div variants={container} initial={initial} animate="show" className="lg:col-span-7">
            {/* Role pills */}
            <motion.ul variants={item} className="flex flex-wrap gap-2" aria-label="At a glance">
              {hero.pills.map((pill, i) => (
                <li
                  key={pill}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                    i === 0 ? 'border-accent/40 bg-accent/10 text-accent' : 'border-line bg-surface text-muted'
                  }`}
                >
                  {i === 0 && (
                    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                  )}
                  {pill}
                </li>
              ))}
            </motion.ul>

            <motion.p variants={item} className="mt-6 font-mono text-sm text-accent">
              {hero.greeting}
            </motion.p>

            <h1
              id="hero-heading"
              className="mt-2 text-balance text-[2.5rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]"
            >
              <span className="sr-only">{hero.pitch}</span>
              <motion.span variants={container} aria-hidden="true" className="inline">
                {hero.pitch.split(' ').map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span variants={word} className="inline-block">
                      {w === 'CEO.' ? <span className="text-accent">{w}</span> : w}
                    </motion.span>
                    {' '}
                  </span>
                ))}
              </motion.span>
            </h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
              {hero.subcopy}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <motion.a
                href={hero.primaryCta.href}
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                className="group inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-accent-solid px-5 py-2.5 text-sm font-medium text-on-accent shadow-sm shadow-accent/20 transition-colors duration-150 hover:bg-accent-solid-hover"
              >
                <span>{hero.primaryCta.label}</span>
                <ArrowDownRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
              </motion.a>

              {hasRealCv ? (
                <motion.a
                  href={hero.secondaryCta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => unlock('recruiter-mode')}
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-line-strong bg-surface px-5 py-2.5 text-sm font-medium text-ink-2 transition-colors duration-150 hover:border-subtle hover:bg-surface-hover"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>{hero.secondaryCta.label}</span>
                </motion.a>
              ) : (
                <button
                  type="button"
                  onClick={() => setCvNoticeVisible((prev) => !prev)}
                  aria-expanded={cvNoticeVisible}
                  className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-line-strong bg-surface px-5 py-2.5 text-sm font-medium text-ink-2 transition-colors duration-150 hover:border-subtle hover:bg-surface-hover"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>{hero.secondaryCta.label}</span>
                </button>
              )}
            </motion.div>

            {cvNoticeVisible && !hasRealCv && (
              <div
                role="status"
                className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-line bg-surface-2 px-4 py-3 text-xs text-body"
              >
                <span className="font-mono text-accent">[CV_LINK]</span>
                <span>CV PDF link not added yet. Request the latest copy directly:</span>
                <a
                  href={`mailto:${meta.email}?subject=CV%20Request%20-%20Idris%20Idris`}
                  className="inline-flex items-center gap-1.5 font-medium text-accent underline underline-offset-4 hover:text-accent-hover"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Email {meta.email}</span>
                </a>
              </div>
            )}

            {/* Socials */}
            <motion.div variants={item} className="mt-7 flex items-center gap-3">
              {socials.map((social) => {
                const isExternal = social.id !== 'email';
                return (
                  <motion.a
                    key={social.id}
                    href={social.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    onClick={social.id === 'email' ? () => unlock('say-hi') : undefined}
                    aria-label={`${social.label}: ${social.handle}`}
                    title={social.handle}
                    whileHover={reduce ? undefined : { y: -3, rotate: -4 }}
                    whileTap={reduce ? undefined : { scale: 0.92 }}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors duration-150 hover:border-accent/50 hover:text-accent"
                  >
                    <SocialIcon id={social.id} />
                  </motion.a>
                );
              })}
              <span className="ml-1 hidden font-mono text-xs text-subtle sm:inline">{meta.location}</span>
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
            className="flex justify-center lg:col-span-5 lg:justify-end"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[360px]">
              {/* Soft accent halo behind the frame */}
              <div aria-hidden="true" className="absolute -inset-6 -z-0 rounded-[2rem] bg-glow blur-3xl" />
              <motion.div
                whileHover={reduce ? undefined : { rotate: -1.5, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="relative overflow-hidden rounded-2xl border border-line bg-surface p-3 shadow-xl shadow-black/5"
              >
                <div className="relative aspect-[4/4.3] w-full overflow-hidden rounded-xl bg-surface-2">
                  {hasPhoto ? (
                    <img
                      src={hero.photoUrl}
                      alt={hero.photoAlt}
                      referrerPolicy="no-referrer"
                      onError={() => setPhotoError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div role="img" aria-label={hero.photoAlt} className="relative flex h-full w-full items-center justify-center">
                      <div aria-hidden="true" className="bg-blueprint pointer-events-none absolute inset-0" />
                      <span className="relative text-5xl font-bold tracking-tight text-ink">
                        I<span className="text-accent">I</span>
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between px-1 pt-3 font-mono text-[11px] text-muted">
                  <span>Lagos · NG</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                    Open to work
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats strip: real numbers, counted up on view */}
        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-10 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="flex flex-col-reverse"
            >
              <dt className="mt-1.5 text-[13px] leading-snug text-subtle">{stat.label}</dt>
              <dd className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
