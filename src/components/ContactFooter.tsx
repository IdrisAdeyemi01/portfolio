import { useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { siteContent } from '../content';
import { Reveal } from './Reveal';
import { SocialIcon } from './SocialIcons';

export function ContactFooter() {
  const { contact, meta, socials } = siteContent;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(meta.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-6 sm:p-10 lg:p-12">
              <p className="font-mono text-xs font-medium text-accent">
                06. {contact.heading}
              </p>

              <h2
                id="contact-heading"
                className="mt-3 max-w-2xl text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl"
              >
                {contact.closingLine}
              </h2>

              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
                {contact.subcopy}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${meta.email}`}
                  className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-accent-solid px-5 py-2.5 text-sm font-medium text-on-accent transition-all duration-150 hover:bg-accent-solid-hover active:scale-[0.99]"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>{contact.emailCtaLabel}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-line-strong bg-surface px-4 py-2.5 font-mono text-xs font-medium text-body transition-colors duration-150 hover:border-subtle hover:bg-surface-hover"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{meta.email}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-line-soft pt-6">
                {socials.map((social) => {
                  const isExternal = social.id !== 'email';
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="inline-flex min-h-[40px] items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                    >
                      <SocialIcon id={social.id} className="h-4 w-4" />
                      <span>{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-7 text-xs text-subtle sm:flex-row sm:px-8">
          <p>{meta.copyright}</p>
          <p className="font-mono">{meta.location}</p>
        </div>
      </footer>
    </>
  );
}
