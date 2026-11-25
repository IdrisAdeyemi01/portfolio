import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { siteContent } from '../content';
import { Reveal } from './Reveal';

/** "Story" section: career told in chapters on a rail that draws as you scroll, then the skills grid. */
export function About() {
  const { about } = siteContent;
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 75%', 'end 60%'] });
  const railScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section id="story" aria-labelledby="story-heading" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium text-accent">01. {about.heading}</p>
            <h2
              id="story-heading"
              className="mt-2.5 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
            >
              {about.lead}
            </h2>
          </div>
        </Reveal>

        <ol ref={railRef} className="relative mt-12 space-y-12 sm:space-y-14">
          {/* Rail: faint track + accent fill that grows with scroll */}
          <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
          <motion.span
            aria-hidden="true"
            style={reduce ? undefined : { scaleY: railScale, transformOrigin: 'top' }}
            className="absolute bottom-2 left-[7px] top-2 w-px bg-accent"
          />

          {about.chapters.map((chapter) => (
            <li key={chapter.id} className="relative pl-9 sm:pl-12">
              <motion.span
                aria-hidden="true"
                initial={reduce ? false : { scale: 0.4, backgroundColor: 'var(--t-canvas)' }}
                whileInView={{ scale: 1, backgroundColor: 'var(--t-accent)' }}
                viewport={{ once: true, amount: 1, margin: '0px 0px -30% 0px' }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 border-accent bg-accent"
              />
              <Reveal>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-subtle">{chapter.label}</p>
                  {chapter.isNow && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-solid px-2 py-0.5 text-[10.5px] font-semibold text-on-accent">
                      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-on-accent opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-on-accent" />
                      </span>
                      Now
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">{chapter.title}</h3>
                <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.75] text-body sm:text-base">{chapter.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Places in this chapter">
                  {chapter.chips.map((chip) => (
                    <li key={chip} className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-medium text-muted">
                      {chip}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Compact skills grid */}
        <Reveal className="mt-16 border-t border-line pt-10">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h3 className="text-base font-semibold text-ink">{about.skillsHeading}</h3>
              <p className="mt-1.5 text-sm text-muted">
                Production technologies used daily across mobile delivery, observability, and review.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
              {about.skillGroups.map((group, i) => (
                <motion.div
                  key={group.category}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={reduce ? undefined : { y: -3 }}
                  className="rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
                >
                  <h4 className="font-mono text-xs font-medium text-accent">{group.category}</h4>
                  <ul className="mt-3 space-y-2 text-sm text-body">
                    {group.items.map((skill) => (
                      <li key={skill} className="leading-snug">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
