import { useState } from 'react';
import { ArrowDownRight, Download, Mail } from 'lucide-react';
import { isPlaceholderValue, siteContent } from '../content';
import { SocialIcon } from './SocialIcons';

export function Hero() {
  const { hero, socials, meta } = siteContent;
  const [photoError, setPhotoError] = useState(false);
  const [cvNoticeVisible, setCvNoticeVisible] = useState(false);

  const hasPhoto = !isPlaceholderValue(hero.photoUrl) && !photoError;
  const hasRealCv = !isPlaceholderValue(hero.secondaryCta.url);

  const handleCvClick = () => {
    if (!hasRealCv) {
      setCvNoticeVisible((prev) => !prev);
    }
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="scroll-mt-20 border-b border-line"
    >
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: primary identity and actions */}
          <div className="lg:col-span-7">
            <p className="font-mono text-xs font-medium tracking-wide text-accent sm:text-[13px]">
              {hero.title}
            </p>

            <h1
              id="hero-heading"
              className="mt-3 text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
            >
              {hero.name}
            </h1>

            <p className="mt-4 max-w-xl text-balance text-xl font-medium leading-snug text-ink-2 sm:text-2xl">
              {hero.pitch}
            </p>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
              {hero.subcopy}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={hero.primaryCta.href}
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-accent-solid px-5 py-2.5 text-sm font-medium text-on-accent transition-all duration-150 hover:bg-accent-solid-hover active:scale-[0.99]"
              >
                <span>{hero.primaryCta.label}</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>

              {hasRealCv ? (
                <a
                  href={hero.secondaryCta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-line-strong bg-surface px-5 py-2.5 text-sm font-medium text-ink-2 transition-colors duration-150 hover:border-subtle hover:bg-surface-hover"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>{hero.secondaryCta.label}</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleCvClick}
                  aria-expanded={cvNoticeVisible}
                  className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-line-strong bg-surface px-5 py-2.5 text-sm font-medium text-ink-2 transition-colors duration-150 hover:border-subtle hover:bg-surface-hover"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>{hero.secondaryCta.label}</span>
                </button>
              )}
            </div>

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

            {/* Social icon links */}
            <div className="mt-7 flex items-center gap-4">
              {socials.map((social) => {
                const isExternal = social.id !== 'email';
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    aria-label={`${social.label}: ${social.handle}`}
                    title={social.handle}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors duration-150 hover:border-accent/50 hover:text-accent"
                  >
                    <SocialIcon id={social.id} />
                  </a>
                );
              })}
              <span className="hidden font-mono text-xs text-subtle sm:inline">
                {meta.location}
              </span>
            </div>
          </div>

          {/* Right column: Professional photo / engineered placeholder avatar */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative w-full max-w-[320px] sm:max-w-[340px]">
              <div className="overflow-hidden rounded-2xl border border-line bg-surface p-3">
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
                    <div
                      role="img"
                      aria-label={hero.photoAlt}
                      className="relative flex h-full w-full flex-col justify-between overflow-hidden p-6"
                    >
                      {/* Subtle architectural coordinate grid */}
                      <div aria-hidden="true" className="bg-blueprint pointer-events-none absolute inset-0" />

                      {/* Subtle Flutter-blue ambient corner gradient */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-glow blur-2xl"
                      />

                      <div className="relative flex items-center justify-between font-mono text-[11px] text-subtle">
                        <span>LAGOS · NG</span>
                        <span>FLUTTER · MOBILE</span>
                      </div>

                      {/* Clean centered monogram */}
                      <div className="relative my-auto flex flex-col items-center justify-center py-6">
                        <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-line bg-surface/90 shadow-sm">
                          <span className="text-4xl font-bold tracking-tight text-ink">
                            I<span className="text-accent">I</span>
                          </span>
                        </div>
                        <p className="mt-4 font-mono text-[11px] text-subtle">
                          [PHOTO_URL]
                        </p>
                      </div>

                      <div className="relative flex items-center justify-between border-t border-line pt-3 font-mono text-[11px] text-muted">
                        <span>iOS &amp; Android</span>
                        <span className="tabular-nums">Since 2021</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width quick-scan recruiter strip below the hero split */}
        <dl className="mt-12 grid grid-cols-1 gap-y-5 border-t border-line pt-8 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
          {hero.focusAreas.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-xs text-subtle">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-ink tabular-nums">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
