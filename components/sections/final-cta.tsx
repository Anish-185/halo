import { DotField, Ridgelines } from "@/components/generative";
import { Clock } from "@/components/clock";
import { Reveal, Words } from "@/components/motion";
import { Icon, Logo, Pill } from "@/components/icons";

const columns = [
  ["Product", [["How it works", "#how"], ["Features", "#features"], ["Use cases", "#use-cases"], ["Pricing", "#pricing"]]],
  ["Company", [["Customers", "#stories"], ["Careers", "#top"], ["Contact", "#faq"]]],
  ["Legal", [["Privacy", "#faq"], ["Terms", "#faq"], ["Security", "#faq"]]],
] as const;

export function FinalCta() {
  return (
    <>
      <section id="download" className="px-3 sm:px-4">
        <div className="frame frame-in grain flex min-h-[86svh] flex-col items-center justify-center bg-flame px-5 py-28 text-center text-ink">
          <Ridgelines ink="#ff7a2e" line="rgb(17 18 15 / 0.28)" hot="#f6f5f1" rows={26} />
          <Words text="Bring Halo to your next call." className="display relative z-[1] max-w-[11ch]" />
          <Reveal delay={0.35} y={14} className="relative z-[1]">
            <p className="lede mx-auto mt-6 max-w-[30rem] text-ink/80">Free for Mac and Windows. Two-minute setup, and no bot joins your meeting.</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-2 sm:flex-row">
              <Pill href="#download" arrow tone="dark">
                <Icon.apple />
                Download for Mac
              </Pill>
              <Pill href="#download">
                Download for Windows
              </Pill>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Night after the flame: an ink panel with a listening dot field, closing on the wordmark */}
      <footer className="relative isolate mx-3 my-3 overflow-hidden rounded-[28px] bg-ink text-white sm:m-4 sm:rounded-[36px]">
        <DotField base="233 231 225" strength={0.55} />
        <div className="mx-auto max-w-[1360px] px-5 pt-16 sm:px-10 sm:pt-24">
          <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
            <div>
              <Logo className="text-white" />
              <p className="mt-4 max-w-[22rem] text-[15px] leading-relaxed text-white/70">
                Real-time answers for interviews, sales calls, meetings and lectures.
              </p>
              <a href="mailto:support@halo.example" className="mt-8 inline-block text-[clamp(1.25rem,2vw,1.75rem)] tracking-[-0.02em] underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-flame">
                support@halo.example
              </a>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {columns.map(([head, links]) => (
                <div key={head}>
                  <p className="meta text-white/45">{head}</p>
                  <ul className="mt-4 space-y-2.5 text-[15px] text-white/85">
                    {links.map(([l, h]) => (
                      <li key={l}>
                        <a href={h} className="transition-colors hover:text-flame">
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="meta mt-16 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-[10.5px] text-white/55 md:grid-cols-4">
            <span>© 2026 Halo. A design concept.</span>
            <span className="flex items-center gap-2">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-flame" />
              Your time <Clock />
            </span>
            <span>Photos: Unsplash. See CREDITS.md</span>
            <a href="#top" className="justify-self-start transition-colors hover:text-white md:justify-self-end">
              Back to top
            </a>
          </div>
        </div>
        {/* Giant wordmark cropped by the panel edge; its "o" is the halo ring itself */}
        <p aria-label="Halo" className="rise-in pointer-events-none mt-12 flex select-none items-baseline justify-center text-[31vw] font-semibold leading-[0.8] tracking-[-0.06em] text-[#e9e7e1] [margin-bottom:-0.1em]">
          <span aria-hidden>Hal</span>
          <svg aria-hidden viewBox="0 0 100 100" className="ring-glow ml-[0.03em] h-[0.565em] w-[0.565em] overflow-visible">
            <defs>
              <linearGradient id="footer-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f6c590" />
                <stop offset="0.55" stopColor="#f0b27a" />
                <stop offset="1" stopColor="#5f8aa0" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42.5" fill="none" stroke="url(#footer-ring)" strokeWidth="15" />
          </svg>
        </p>
      </footer>
    </>
  );
}
