import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { isPlaceholderValue, siteContent, type ProjectCategory } from '../content';
import { DeviceMockup } from './DeviceMockups';
import { TiltCard } from './MotionBits';
import { Reveal } from './Reveal';

type WorkFilter = 'All' | ProjectCategory;

const FILTERS: WorkFilter[] = ['All', 'Production', 'Personal'];

export function FeaturedWork() {
  const { work } = siteContent;
  const [filter, setFilter] = useState<WorkFilter>('All');

  const visibleProjects =
    filter === 'All'
      ? work.items
      : work.items.filter((project) => project.category === filter);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-20 border-b border-line"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-medium text-accent">
                03. {work.heading}
              </p>
              <h2
                id="work-heading"
                className="mt-2.5 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
              >
                {work.lead}
              </h2>
            </div>

            {/* Functional segmented filter control */}
            <div
              role="group"
              aria-label="Filter projects by category"
              className="inline-flex w-fit items-center gap-1 rounded-lg border border-line bg-surface-2 p-1"
            >
              {FILTERS.map((option) => {
                const active = filter === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFilter(option)}
                    aria-pressed={active}
                    className={`relative min-h-[36px] shrink-0 whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 ${
                      active ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="work-filter"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-md bg-surface shadow-xs"
                        transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                      />
                    )}
                    <span className="relative">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 space-y-6">
          {visibleProjects.map((project, index) => (
            <Reveal key={project.id} delay={Math.min(index * 0.04, 0.14)}>
              <TiltCard className="rounded-2xl">
              <article className="group relative rounded-2xl border border-line bg-surface p-5 transition-colors duration-200 hover:border-line-strong sm:p-7">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
                  {/* Device preview column */}
                  <div className="flex items-center justify-center rounded-xl border border-line-soft bg-surface-2 px-4 py-7 lg:col-span-4">
                    <DeviceMockup mockupId={project.mockupId} />
                  </div>

                  {/* Narrative column: Problem, Decision, Shipped */}
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-subtle">
                      <span className="text-accent">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.platform}</span>
                    </div>

                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {project.subtitle}
                    </p>

                    <dl className="mt-5 space-y-3.5 border-t border-line-soft pt-5">
                      <div className="grid grid-cols-1 gap-1 sm:grid-cols-12 sm:gap-4">
                        <dt className="font-mono text-xs font-medium text-subtle sm:col-span-2 sm:pt-0.5">
                          Problem
                        </dt>
                        <dd className="text-[14.5px] leading-relaxed text-body sm:col-span-10">
                          {project.problem}
                        </dd>
                      </div>

                      {project.decision && (
                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-12 sm:gap-4">
                          <dt className="font-mono text-xs font-medium text-subtle sm:col-span-2 sm:pt-0.5">
                            Decision
                          </dt>
                          <dd className="text-[14.5px] leading-relaxed text-body sm:col-span-10">
                            {project.decision}
                          </dd>
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-1 sm:grid-cols-12 sm:gap-4">
                        <dt className="font-mono text-xs font-medium text-accent sm:col-span-2 sm:pt-0.5">
                          Shipped
                        </dt>
                        <dd className="text-[14.5px] leading-relaxed text-ink-2 sm:col-span-10">
                          {project.shipped}
                        </dd>
                      </div>
                    </dl>

                    {/* Unboxed tech list & links */}
                    <div className="mt-6 flex flex-col gap-4 border-t border-line-soft pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-mono text-xs leading-relaxed text-subtle">
                        {project.tech.join(' · ')}
                      </p>

                      {project.links.length > 0 && (
                        <div className="flex shrink-0 flex-wrap items-center gap-4">
                          {project.links.map((link) => {
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
                    </div>
                  </div>
                </div>
              </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
