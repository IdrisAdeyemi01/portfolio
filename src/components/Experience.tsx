import { siteContent } from '../content';
import { Reveal } from './Reveal';

export function Experience() {
  const { experience } = siteContent;

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-20 border-b border-line"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium text-accent">
              02. {experience.heading}
            </p>
            <h2
              id="experience-heading"
              className="mt-2.5 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
            >
              {experience.lead}
            </h2>
          </div>
        </Reveal>

        <ol className="relative mt-12 space-y-6 before:absolute before:bottom-3 before:left-[7px] before:top-3 before:w-px before:bg-line sm:before:left-[9px]">
          {experience.items.map((item, index) => (
            <li key={item.id} className="relative pl-7 sm:pl-9">
              {/* Subtle timeline node */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-6 flex h-[15px] w-[15px] items-center justify-center rounded-full border sm:h-[19px] sm:w-[19px] ${
                  index === 0
                    ? 'border-accent bg-accent/15'
                    : 'border-line-strong bg-canvas'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    index === 0
                      ? 'bg-accent-solid'
                      : 'bg-faint'
                  }`}
                />
              </span>

              <Reveal delay={Math.min(index * 0.04, 0.16)}>
                <article className="rounded-xl border border-line bg-surface p-5 sm:p-6">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-ink">
                        {item.company}
                      </h3>
                      <p className="mt-0.5 text-sm text-muted">
                        <span className="font-medium text-ink-2">
                          {item.role}
                        </span>
                        {item.context && (
                          <>
                            <span aria-hidden="true" className="mx-1.5 text-faint">
                              ·
                            </span>
                            <span>{item.context}</span>
                          </>
                        )}
                      </p>
                    </div>

                    <span className="shrink-0 font-mono text-xs text-subtle tabular-nums">
                      {item.dates}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2.5 border-t border-line-soft pt-4">
                    {item.highlights.map((point, pointIdx) => (
                      <li
                        key={pointIdx}
                        className={`flex gap-3 text-[14.5px] leading-relaxed sm:text-[15px] ${
                          item.isPlaceholderHighlights
                            ? 'font-mono text-xs text-subtle'
                            : 'text-body'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-solid"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
