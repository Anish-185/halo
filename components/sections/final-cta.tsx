import Image from "next/image";
import { Ridgelines } from "@/components/generative";
import { Reveal, Words } from "@/components/motion";
import { Icon, Logo, Pill } from "@/components/icons";

const columns = [
  ["Product", [["How it works", "#how"], ["Features", "#features"], ["Use cases", "#use-cases"], ["Pricing", "#pricing"]]],
  ["Company", [["Customers", "#stories"], ["Careers", "#top"], ["Contact", "#faq"]]],
  ["Legal", [["Privacy", "#faq"], ["Terms", "#faq"], ["Security", "#faq"]]],
] as const;

// A torn paper edge (generated once), so the page appears to rip open onto the meadow below
const tear = "M0 0 H1440 V46 L1440 46 L1439.1 47.5 L1420.4 50.9 L1406.8 57.7 L1388.3 53.8 L1371.7 46.4 L1352.9 54.6 L1339.2 52.3 L1318.8 46.2 L1309.6 43.8 L1299.9 49.6 L1288.1 55.4 L1266.3 47.3 L1253.1 38.8 L1236.0 29.3 L1225.6 32.5 L1219.1 40.6 L1204.8 42.9 L1187.0 48.0 L1168.1 42.0 L1146.3 34.7 L1136.8 27.7 L1118.3 29.4 L1099.9 27.3 L1088.1 32.2 L1070.9 35.7 L1049.3 27.7 L1042.9 25.5 L1034.5 22.9 L1013.3 20.3 L1004.7 27.4 L994.5 19.4 L986.8 20.2 L973.1 26.0 L951.2 24.9 L943.2 16.3 L931.7 16.3 L923.3 18.6 L903.3 14 L891.5 16.0 L883.1 21.2 L876.2 28.8 L867.6 30.5 L860.6 34.8 L844.4 42.4 L832.0 49.8 L813.3 52.3 L794.8 45.5 L787.9 37.6 L772.0 33.5 L755.0 32.1 L739.9 22.0 L727.2 22.5 L717.0 30.1 L703.3 27.0 L693.6 30.6 L685.1 35.6 L665.0 25.7 L652.3 26.7 L632.5 29.4 L612.4 21.7 L599.2 18.6 L579.3 24.4 L569.3 24.7 L551.0 30.1 L543.1 37.3 L529.7 43.0 L513.0 52.1 L502.5 54.9 L480.6 49.4 L463.4 46.8 L446.8 55.4 L425.6 56.8 L412.3 51.1 L396.8 49.9 L385.8 46.5 L370.6 39.1 L353.9 33.4 L340.1 41.3 L322.0 47.7 L314.1 49.4 L303.5 40.3 L283.5 35.4 L268.3 33.9 L251.1 37.9 L240.3 31.4 L225.0 31.1 L212.1 33.4 L202.8 28.8 L195.8 35.9 L183.9 34.1 L168.6 30.4 L149.5 35.3 L141.6 38.1 L131.0 44.3 L124.2 37.2 L111.9 27.1 L90.7 24.0 L81.2 19.5 L61.9 24.6 L54.5 24.2 L41.5 30.7 L27.4 38.5 L15.6 46.5 L8.4 45.8 L0 42.8 Z";

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

      <footer className="relative isolate mt-24 overflow-hidden text-white sm:mt-32">
        <Image src="/media/hills.jpg" alt="" fill sizes="100vw" quality={80} className="-z-10 object-cover object-[center_60%]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(8_20_10/0.62),rgb(8_20_10/0.35)_50%,rgb(8_20_10/0.15))]" />
        <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[60px] w-full drop-shadow-[0_6px_8px_rgb(0_0_0/0.18)] sm:h-[80px]">
          <path d={tear} fill="var(--color-stone)" />
        </svg>

        <div className="mx-auto max-w-[1240px] px-5 pt-36 sm:px-10 sm:pt-44">
          <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
            <div>
              <Logo className="text-white" />
              <p className="mt-4 max-w-[22rem] text-[15px] leading-relaxed text-white/80">
                Real-time answers for interviews, sales calls, meetings and lectures.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {columns.map(([head, links]) => (
                <div key={head}>
                  <p className="meta text-white/60">{head}</p>
                  <ul className="mt-4 space-y-2.5 text-[15px] text-white/90">
                    {links.map(([l, h]) => (
                      <li key={l}>
                        <a href={h} className="hover:text-white hover:underline">
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="meta mt-16 flex flex-col justify-between gap-2 border-t border-white/25 pt-6 text-[10.5px] text-white/85 sm:flex-row">
            <span>© 2026 Halo. A design concept.</span>
            <span>Photos: Unsplash. Film: Mixkit. See CREDITS.md</span>
          </div>
        </div>
        {/* Giant wordmark, cropped by the page edge */}
        <p aria-hidden className="rise-in pointer-events-none mt-14 select-none text-center text-[34vw] font-semibold leading-[0.72] tracking-[-0.06em] text-white/85 [margin-bottom:-0.12em]">
          Halo
        </p>
      </footer>
    </>
  );
}
