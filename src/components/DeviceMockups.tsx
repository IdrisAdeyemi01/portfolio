import { useState } from 'react';
import {
  Bell,
  Car,
  CheckCircle2,
  Heart,
  Layers,
  MapPin,
  MessageCircle,
  Moon,
  Navigation,
  Package,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  Wallet,
} from 'lucide-react';
import type { ProjectMockupId } from '../content';
import { useQuest } from '../quest/QuestContext';

interface DeviceMockupProps {
  mockupId: ProjectMockupId;
}

function PhoneFrame({
  children,
  darkScreen = true,
  label,
}: {
  children: React.ReactNode;
  darkScreen?: boolean;
  label: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className="phone-float mx-auto w-full max-w-[232px] select-none rounded-[30px] border border-line-strong bg-[#0D1117] p-2 shadow-xl shadow-black/20"
    >
      <div
        className={`relative overflow-hidden rounded-[22px] border ${
          darkScreen
            ? 'border-[#1E2733] bg-[#0B0F15] text-[#E6EDF5]'
            : 'border-slate-200 bg-[#FAFBFD] text-[#0B1220]'
        }`}
      >
        {/* Status bar + speaker cutout */}
        <div className="flex items-center justify-between px-4 pb-1.5 pt-2.5">
          <span
            className={`font-mono text-[9px] tabular-nums ${
              darkScreen ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            09:41
          </span>
          <div
            aria-hidden="true"
            className={`h-2.5 w-12 rounded-full ${
              darkScreen ? 'bg-[#171E28]' : 'bg-slate-200'
            }`}
          />
          <div className="flex items-center gap-1" aria-hidden="true">
            <span
              className={`h-1.5 w-3 rounded-[2px] ${
                darkScreen ? 'bg-slate-500' : 'bg-slate-400'
              }`}
            />
          </div>
        </div>

        {/* Screen viewport */}
        <div className="min-h-[256px] px-3 pb-3.5 pt-1">{children}</div>

        {/* Home indicator */}
        <div className="flex justify-center pb-2" aria-hidden="true">
          <span
            className={`h-1 w-16 rounded-full ${
              darkScreen ? 'bg-slate-700' : 'bg-slate-300'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

function NologyMobileMockup() {
  return (
    <PhoneFrame label="Phone preview of Nology Mobile e-commerce interface with search and CMS sections">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-tight text-white">
            Nology Store
          </span>
          <span className="font-mono text-[9px] text-[#38A3FF]">GA4 · App Check</span>
        </div>

        {/* Debounced Search bar */}
        <div className="flex items-center gap-1.5 rounded-lg border border-[#222D3C] bg-[#121822] px-2.5 py-1.5">
          <Search className="h-3 w-3 text-slate-400" aria-hidden="true" />
          <span className="text-[10px] text-slate-400">Debounced search...</span>
        </div>

        {/* Scoped filter row */}
        <div className="flex items-center gap-2 font-mono text-[9px] text-slate-400">
          <span className="text-[#38A3FF]">Trending</span>
          <span>·</span>
          <span>In Stock</span>
          <span>·</span>
          <span>Filters</span>
        </div>

        {/* CMS Hero card with spotlight overlay hint */}
        <div className="relative overflow-hidden rounded-xl border border-[#1E2E42] bg-[#101A28] p-2.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8.5px] text-[#38A3FF]">CMS SECTION</span>
            <Layers className="h-3 w-3 text-[#38A3FF]" aria-hidden="true" />
          </div>
          <p className="mt-1 text-[11px] font-semibold leading-snug text-white">
            Spotlight Onboarding
          </p>
          <p className="mt-0.5 text-[9.5px] leading-snug text-slate-400">
            CustomPainter overlay · Remote Config toggle
          </p>
        </div>

        {/* Compact product grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-[#1D2633] bg-[#121822] p-2">
            <div className="h-10 rounded-md bg-[#1A2433]" />
            <div className="mt-1.5 h-2 w-12 rounded bg-slate-700" />
            <div className="mt-1 h-1.5 w-8 rounded bg-[#0468D7]/60" />
          </div>
          <div className="rounded-lg border border-[#1D2633] bg-[#121822] p-2">
            <div className="h-10 rounded-md bg-[#1A2433]" />
            <div className="mt-1.5 h-2 w-14 rounded bg-slate-700" />
            <div className="mt-1 h-1.5 w-9 rounded bg-[#0468D7]/60" />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function KabsaMockup() {
  const [previewDark, setPreviewDark] = useState(true);
  const { unlock } = useQuest();
  const flip = (dark: boolean) => {
    setPreviewDark(dark);
    if (dark !== previewDark) unlock('night-and-day');
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <PhoneFrame
        darkScreen={previewDark}
        label={`Phone preview of Kabsa driver app rendered in ${previewDark ? 'dark' : 'light'} theme`}
      >
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-tight">Kabsa Driver</span>
            <span className={`font-mono text-[9px] ${previewDark ? 'text-[#38A3FF]' : 'text-[#0468D7]'}`}>
              {previewDark ? 'Dark tokens' : 'Light tokens'}
            </span>
          </div>

          {/* Active route card */}
          <div
            className={`rounded-xl border p-2.5 ${
              previewDark
                ? 'border-[#1E2A3A] bg-[#121923]'
                : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Navigation className={`h-3 w-3 ${previewDark ? 'text-[#38A3FF]' : 'text-[#0468D7]'}`} aria-hidden="true" />
              <span className="font-mono text-[9px] font-medium">ACTIVE ROUTE</span>
            </div>
            <p className="mt-1.5 text-[11px] font-semibold">Next Drop-off Ready</p>
            <p
              className={`mt-0.5 text-[9.5px] ${
                previewDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Shared design system across day &amp; night shifts
            </p>
          </div>

          {/* Delivery steps */}
          <div className="space-y-1.5">
            {['Pickup verified', 'In transit to customer', 'Proof of delivery'].map(
              (step, idx) => (
                <div
                  key={step}
                  className={`flex items-center justify-between rounded-lg border px-2.5 py-2 ${
                    previewDark
                      ? 'border-[#1B2430] bg-[#10151E]'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <span className="text-[10px] font-medium">{step}</span>
                  <span
                    className={`font-mono text-[8.5px] ${
                      idx === 0
                        ? previewDark
                          ? 'text-[#38A3FF]'
                          : 'text-[#0468D7]'
                        : previewDark
                          ? 'text-slate-500'
                          : 'text-slate-400'
                    }`}
                  >
                    {idx === 0 ? 'Done' : idx === 1 ? 'Active' : 'Next'}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </PhoneFrame>

      {/* Interactive theme demo toggle specifically for Kabsa */}
      <div
        role="group"
        aria-label="Preview Kabsa phone theme"
        className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface p-1"
      >
        <button
          type="button"
          onClick={() => flip(true)}
          aria-pressed={previewDark}
          className={`inline-flex min-h-[32px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors ${
            previewDark
              ? 'bg-accent-solid text-on-accent'
              : 'text-muted hover:text-ink'
          }`}
        >
          <Moon className="h-3 w-3" aria-hidden="true" />
          <span>Dark</span>
        </button>
        <button
          type="button"
          onClick={() => flip(false)}
          aria-pressed={!previewDark}
          className={`inline-flex min-h-[32px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors ${
            !previewDark
              ? 'bg-accent-solid text-on-accent'
              : 'text-muted hover:text-ink'
          }`}
        >
          <Sun className="h-3 w-3" aria-hidden="true" />
          <span>Light</span>
        </button>
      </div>
    </div>
  );
}

function NesterVerifyMockup() {
  return (
    <PhoneFrame label="Phone preview of NesterVerify business verification workflow">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-tight text-white">
            NesterVerify
          </span>
          <ShieldCheck className="h-3.5 w-3.5 text-[#38A3FF]" aria-hidden="true" />
        </div>

        <div className="rounded-xl border border-[#1E2B3A] bg-[#111925] p-2.5">
          <p className="font-mono text-[8.5px] text-[#38A3FF]">BUSINESS VERIFICATION</p>
          <p className="mt-1 text-[11px] font-semibold text-white">
            Verification Checklist
          </p>
          <p className="mt-0.5 text-[9.5px] text-slate-400">
            Structured field capture &amp; validation
          </p>
        </div>

        <div className="space-y-1.5">
          {[
            'Business registration check',
            'Address & site confirmation',
            'Document submission',
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-lg border border-[#1B2430] bg-[#10151E] px-2.5 py-2"
            >
              <CheckCircle2 className="h-3 w-3 shrink-0 text-[#38A3FF]" aria-hidden="true" />
              <span className="text-[10px] text-slate-200">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function RunwayMockup() {
  return (
    <PhoneFrame label="Phone preview of Runway personal budgeting and financial runway app">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-tight text-white">
            Runway
          </span>
          <Wallet className="h-3.5 w-3.5 text-[#38A3FF]" aria-hidden="true" />
        </div>

        <div className="rounded-xl border border-[#1D2D40] bg-[#101926] p-3">
          <p className="font-mono text-[8.5px] text-[#38A3FF]">FINANCIAL RUNWAY</p>
          <p className="mt-1 text-base font-bold tracking-tight text-white">
            Clear burn view
          </p>
          <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#1B2736]">
            <div className="h-full w-2/3 rounded-full bg-[#38A3FF]" />
          </div>
          <p className="mt-1.5 font-mono text-[9px] text-slate-400">
            Balance vs monthly spend pace
          </p>
        </div>

        <div className="space-y-1.5">
          {[
            { label: 'Essential budget', note: 'Tracked' },
            { label: 'Recurring commitments', note: 'Planned' },
            { label: 'Quick expense entry', note: 'Flutter UI' },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-lg border border-[#1B2430] bg-[#10151E] px-2.5 py-2"
            >
              <span className="text-[10px] text-slate-200">{row.label}</span>
              <span className="font-mono text-[8.5px] text-[#38A3FF]">{row.note}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function WhooshMockup() {
  return (
    <PhoneFrame label="Phone preview of Whoosh delivery tracking with rider chat">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-tight text-white">Whoosh</span>
          <Package className="h-3.5 w-3.5 text-[#38A3FF]" aria-hidden="true" />
        </div>

        {/* Live route map */}
        <div className="relative h-24 overflow-hidden rounded-xl border border-[#1E2B3A] bg-[#101926]">
          <svg viewBox="0 0 200 96" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path
              d="M18 78 C 60 70, 70 30, 110 34 S 170 20, 184 14"
              fill="none"
              stroke="#38A3FF"
              strokeWidth="2.5"
              strokeDasharray="5 4"
              strokeLinecap="round"
            />
            <circle cx="18" cy="78" r="4" fill="#38A3FF" />
            <circle cx="110" cy="34" r="5" fill="#0B0F15" stroke="#38A3FF" strokeWidth="2" />
            <circle cx="184" cy="14" r="4" fill="#E6EDF5" />
          </svg>
          <span className="absolute bottom-2 left-2.5 font-mono text-[8.5px] text-[#38A3FF]">LIVE TRACKING</span>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-[#1B2430] bg-[#10151E] px-2.5 py-2">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-[#38A3FF]" aria-hidden="true" />
            <span className="text-[10px] text-slate-200">Rider entered pickup zone</span>
          </div>
          <span className="font-mono text-[8.5px] text-slate-400">Geo-fence</span>
        </div>

        {/* Chat bubbles */}
        <div className="space-y-1.5 rounded-xl border border-[#1B2430] bg-[#10151E] p-2.5">
          <div className="flex items-center gap-1.5">
            <MessageCircle className="h-3 w-3 text-[#38A3FF]" aria-hidden="true" />
            <span className="font-mono text-[8.5px] text-slate-400">IN-APP CHAT</span>
          </div>
          <p className="w-fit max-w-[80%] rounded-lg bg-[#1A2433] px-2 py-1 text-[9.5px] text-slate-200">
            On my way to you
          </p>
          <p className="ml-auto w-fit max-w-[80%] rounded-lg bg-[#0468D7] px-2 py-1 text-[9.5px] text-white">
            Great, I&apos;m at the gate
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}

function GreamitMockup() {
  return (
    <PhoneFrame label="Phone preview of Greamit interest-based social feed">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-tight text-white">Greamit</span>
          <Sparkles className="h-3.5 w-3.5 text-[#38A3FF]" aria-hidden="true" />
        </div>

        {/* Interest chips */}
        <div className="flex flex-wrap gap-1.5">
          {['Tech', 'Design', 'Music', 'Sports'].map((tag, idx) => (
            <span
              key={tag}
              className={`rounded-full border px-2 py-0.5 font-mono text-[8.5px] ${
                idx === 0
                  ? 'border-[#38A3FF]/60 bg-[#38A3FF]/15 text-[#38A3FF]'
                  : 'border-[#222D3C] text-slate-400'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Feed posts */}
        {['For your interests', 'From people you follow'].map((caption, idx) => (
          <div key={caption} className="rounded-xl border border-[#1B2430] bg-[#10151E] p-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-4 w-4 rounded-full bg-[#1A2433]" />
              <span className="h-1.5 w-14 rounded bg-slate-700" />
            </div>
            <div className={`mt-2 rounded-md bg-[#1A2433] ${idx === 0 ? 'h-14' : 'h-8'}`} />
            <div className="mt-1.5 flex items-center justify-between">
              <span className="font-mono text-[8.5px] text-slate-400">{caption}</span>
              <Heart className="h-3 w-3 text-[#38A3FF]" aria-hidden="true" />
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center gap-1.5 rounded-lg bg-[#0468D7] py-1.5 text-[10px] font-medium text-white">
          <Users className="h-3 w-3" aria-hidden="true" />
          <span>Create &amp; share</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function StriitMockup() {
  return (
    <PhoneFrame label="Phone preview of Striit parking assistance app">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-tight text-white">Striit</span>
          <Car className="h-3.5 w-3.5 text-[#38A3FF]" aria-hidden="true" />
        </div>

        <div className="rounded-xl border border-[#1D2D40] bg-[#101926] p-3">
          <p className="font-mono text-[8.5px] text-[#38A3FF]">PARKING NEARBY</p>
          <p className="mt-1 text-[11px] font-semibold text-white">Find a spot that fits your budget</p>
          {/* Parking bay grid */}
          <div className="mt-2.5 grid grid-cols-4 gap-1" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, idx) => (
              <span
                key={idx}
                className={`h-5 rounded-sm border ${
                  idx === 2 || idx === 5
                    ? 'border-[#38A3FF] bg-[#38A3FF]/20'
                    : 'border-[#222D3C] bg-[#121822]'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          {[
            { label: 'Signed in securely', note: 'Firebase Auth' },
            { label: 'Spot availability', note: 'Real-time' },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-lg border border-[#1B2430] bg-[#10151E] px-2.5 py-2"
            >
              <span className="text-[10px] text-slate-200">{row.label}</span>
              <span className="font-mono text-[8.5px] text-[#38A3FF]">{row.note}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 rounded-lg border border-[#1B2430] bg-[#10151E] px-2.5 py-2">
            <Bell className="h-3 w-3 shrink-0 text-[#38A3FF]" aria-hidden="true" />
            <span className="text-[10px] text-slate-200">Notifications when it matters</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function EmcPortalMockup() {
  return (
    <div
      role="img"
      aria-label="Browser preview of EMC Portal web app built with Jaspr and Google Sheets"
      className="mx-auto w-full max-w-[300px] select-none overflow-hidden rounded-xl border border-line-strong bg-[#0D1117] shadow-sm"
    >
      {/* Minimal browser chrome */}
      <div className="flex items-center justify-between border-b border-[#1E2631] bg-[#131922] px-3 py-2">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-slate-600" />
          <span className="h-2 w-2 rounded-full bg-slate-600" />
          <span className="h-2 w-2 rounded-full bg-slate-600" />
        </div>
        <span className="truncate font-mono text-[9.5px] text-slate-400">
          emc-portal · github.io
        </span>
        <span className="font-mono text-[9px] text-[#38A3FF]">Jaspr</span>
      </div>

      {/* Browser viewport */}
      <div className="space-y-2.5 p-3.5 text-[#E6EDF5]">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] text-[#38A3FF]">DART WEB · GOOGLE SHEETS</p>
            <p className="mt-0.5 text-xs font-semibold">Daily Teacher Reminders</p>
          </div>
          <Send className="h-3.5 w-3.5 text-[#38A3FF]" aria-hidden="true" />
        </div>

        <div className="space-y-1.5">
          {[
            { row: 'Sheet sync', status: 'Connected' },
            { row: 'Timetable parser', status: 'Daily' },
            { row: 'WhatsApp dispatch', status: 'Automated' },
          ].map((item) => (
            <div
              key={item.row}
              className="flex items-center justify-between rounded-lg border border-[#1E2631] bg-[#121822] px-2.5 py-2"
            >
              <span className="text-[10.5px] text-slate-200">{item.row}</span>
              <span className="font-mono text-[9px] text-[#38A3FF]">{item.status}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-[#1E2631] pt-2 font-mono text-[9px] text-slate-400">
          Static build · Hosted on GitHub Pages
        </div>
      </div>
    </div>
  );
}

export function DeviceMockup({ mockupId }: DeviceMockupProps) {
  switch (mockupId) {
    case 'nology-mobile':
      return <NologyMobileMockup />;
    case 'kabsa':
      return <KabsaMockup />;
    case 'nesterverify':
      return <NesterVerifyMockup />;
    case 'whoosh':
      return <WhooshMockup />;
    case 'greamit':
      return <GreamitMockup />;
    case 'striit':
      return <StriitMockup />;
    case 'emc-portal':
      return <EmcPortalMockup />;
    case 'runway':
      return <RunwayMockup />;
  }
}
