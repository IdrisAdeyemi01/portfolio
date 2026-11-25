import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { siteContent, type ArticleItem } from '../content';
import { useQuest } from '../quest/QuestContext';
import { Reveal } from './Reveal';

function Meta({ article }: { article: ArticleItem }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11.5px] text-subtle">
      <span className="text-accent">{article.platform}</span>
      <span aria-hidden="true">·</span>
      <span>{article.date}</span>
      <span aria-hidden="true">·</span>
      <span>{article.readMinutes} min read</span>
    </p>
  );
}

export function Writing() {
  const { writing } = siteContent;
  const { unlock } = useQuest();
  const reduce = useReducedMotion();
  const [featured, ...rest] = writing.items;
  const onRead = () => unlock('bookworm');

  return (
    <section id="writing" aria-labelledby="writing-heading" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-medium text-accent">04. {writing.heading}</p>
              <h2 id="writing-heading" className="mt-2.5 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {writing.lead}
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {writing.profiles.map((p) => (
                <a
                  key={p.url}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[36px] items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
                >
                  {p.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-5">
          {featured && (
            <Reveal className="lg:col-span-3">
              <motion.a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onRead}
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong sm:p-8"
              >
                <div aria-hidden="true" className="bg-blueprint pointer-events-none absolute inset-0 opacity-70" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-glow blur-3xl" />
                <div className="relative">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[11px] font-medium text-accent">
                    <BookOpen className="h-3 w-3" aria-hidden="true" />
                    Featured article
                  </span>
                  <h3 className="mt-5 text-balance text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-[1.75rem]">
                    {featured.title}
                  </h3>
                  <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-body">{featured.summary}</p>
                </div>
                <div className="relative mt-8 flex flex-wrap items-end justify-between gap-3">
                  <Meta article={featured} />
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Read it
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </motion.a>
            </Reveal>
          )}

          <div className="flex flex-col gap-5 lg:col-span-2">
            {rest.map((article, i) => (
              <Reveal key={article.id} delay={0.08 * (i + 1)} className="flex-1">
                <motion.a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onRead}
                  whileHover={reduce ? undefined : { y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong"
                >
                  <div>
                    <Meta article={article} />
                    <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-ink">{article.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">{article.summary}</p>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="font-mono text-[11px] text-subtle">{article.tags.join(' · ')}</p>
                    <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
