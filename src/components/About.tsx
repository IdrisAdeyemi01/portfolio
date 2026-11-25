import { siteContent } from '../content';
import { Reveal } from './Reveal';

export function About() {
  const { about } = siteContent;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 border-b border-line"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Section label & editorial lead */}
            <div className="lg:col-span-4">
              <p className="font-mono text-xs font-medium text-accent">
                01. {about.heading}
              </p>
              <h2
                id="about-heading"
                className="mt-2.5 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
              >
                {about.lead}
              </h2>
            </div>

            {/* Two-paragraph warm first-person bio */}
            <div className="space-y-4 lg:col-span-8">
              {about.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="max-w-[68ch] text-[15px] leading-[1.7] text-body sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Compact skills grid (zero pill enclosures) */}
        <Reveal delay={0.06} className="mt-12 border-t border-line pt-10">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h3 className="text-base font-semibold text-ink">
                {about.skillsHeading}
              </h3>
              <p className="mt-1.5 text-sm text-muted">
                Production technologies used daily across mobile delivery, observability, and review.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8">
              {about.skillGroups.map((group) => (
                <div
                  key={group.category}
                  className="rounded-xl border border-line bg-surface p-5"
                >
                  <h4 className="font-mono text-xs font-medium text-accent">
                    {group.category}
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-body">
                    {group.items.map((skill) => (
                      <li key={skill} className="leading-snug">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
