import { ArrowUpRight } from 'lucide-react';
import { isPlaceholderValue, siteContent } from '../content';
import { Reveal } from './Reveal';

export function SpeakingAndAchievements() {
  const { speaking, achievements } = siteContent;

  return (
    <>
      {/* Speaking & Community */}
      <section
        id="speaking"
        aria-labelledby="speaking-heading"
        className="scroll-mt-20 border-b border-line"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-medium text-accent">
                05. {speaking.heading}
              </p>
              <h2
                id="speaking-heading"
                className="mt-2.5 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
              >
                {speaking.lead}
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {speaking.items.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.05} className="flex">
                <article className="flex w-full flex-col justify-between rounded-xl border border-line bg-surface p-6 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-line-strong">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-subtle">
                      <span className="text-accent">{item.kind}</span>
                      {item.date && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{item.date}</span>
                        </>
                      )}
                    </div>

                    <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-muted">
                      {item.organization}
                    </p>
                    <p className="mt-3.5 text-[14.5px] leading-relaxed text-body">
                      {item.summary}
                    </p>
                  </div>

                  {item.links && item.links.length > 0 && (
                    <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line-soft pt-4">
                      {item.links.map((link) => {
                        const placeholder = isPlaceholderValue(link.url);
                        if (placeholder) {
                          return (
                            <span
                              key={link.label}
                              className="font-mono text-xs text-faint"
                              title={`Replace ${link.url} in src/content.ts`}
                            >
                              {link.label}: {link.url}
                            </span>
                          );
                        }

                        return (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[36px] shrink-0 items-center gap-1 whitespace-nowrap text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                          >
                            <span>{link.label}</span>
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section
        id="achievements"
        aria-labelledby="achievements-heading"
        className="scroll-mt-20 border-b border-line"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs font-medium text-accent">
                  06. {achievements.heading}
                </p>
                <h2
                  id="achievements-heading"
                  className="mt-2.5 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
                >
                  Competitions &amp; recognition
                </h2>
              </div>

              <div className="divide-y divide-line border-y border-line lg:col-span-8">
                {achievements.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <span className="w-16 shrink-0 font-mono text-sm font-medium text-accent tabular-nums">
                      {item.year}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
