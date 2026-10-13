import Image from "next/image";
import { Intro, Reveal } from "@/components/motion";
import { HaloMark } from "@/components/icons";

// Placeholder people and quotes for the mock site.
const quotes = [
  {
    quote:
      "I used to freeze on system design questions. With Halo the outline was already there, so I could actually think out loud.",
    name: "Daniel Okafor",
    role: "Software engineer",
    tone: "from-[#8b9cf5] to-[#4a5bd0]",
    outcome: "Offer accepted",
    surfaced: "Token bucket per key, Redis counters, 429 + Retry-After",
  },
  {
    quote: "It pulled up our SOC 2 answer and the right pricing tier before the buyer finished the question.",
    name: "Lena Brandt",
    role: "Account executive",
    tone: "from-[#ffb07a] to-[#ff6a1f]",
    outcome: "Deal closed",
    surfaced: "SSO is on Team. SOC 2 Type II report ready to send.",
  },
  {
    quote: "The notes alone are worth it. I leave every meeting with the decisions written down and nothing to chase.",
    name: "Sofia Marín",
    role: "Product manager",
    tone: "from-[#f0a0c8] to-[#b05a86]",
    outcome: "Zero follow-ups missed",
    surfaced: "3 decisions, 4 action items, sent at 17:46",
  },
];

function Person({ q }: { q: (typeof quotes)[number] }) {
  return (
    <figcaption className="flex items-center gap-3">
      <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${q.tone} text-[12px] font-medium text-white`}>
        {q.name
          .split(" ")
          .map((w) => w[0])
          .join("")}
      </span>
      <span className="text-[14px] leading-tight">
        <span className="block font-medium">{q.name}</span>
        <span className="meta text-[10.5px] text-ink/55">{q.role}</span>
      </span>
    </figcaption>
  );
}

/** What Halo actually showed them: a tiny slice of the product inside each story. */
function Surfaced({ text }: { text: string }) {
  return (
    <div className="device flex items-start gap-2.5 rounded-2xl px-3.5 py-3 text-[13px] leading-snug">
      <HaloMark size={14} className="mt-0.5 shrink-0" />
      <span className="text-white/85">{text}</span>
    </div>
  );
}

export function Testimonials() {
  const [lead, ...rest] = quotes;
  return (
    <section id="stories" className="px-3 sm:px-4">
      <div className="frame frame-in grain">
        <Image src="/media/blossom.jpg" alt="" fill sizes="100vw" quality={80} className="-z-10 object-cover object-[60%_40%]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(255_244_246/0.55),rgb(255_244_246/0.15)_45%,rgb(255_244_246/0.35))]" />

        <div className="relative z-[1] mx-auto max-w-[1240px] px-5 py-20 sm:px-10 sm:py-28">
          <Intro title="What changes after the first call." />

          <div className="mt-14 grid gap-3 sm:mt-20 lg:grid-cols-[1.35fr_1fr]">
            <Reveal className="h-full">
              <figure className="flex h-full flex-col gap-8 rounded-[28px] bg-white/60 p-7 backdrop-blur-2xl sm:p-10">
                <span className="meta w-fit rounded-full bg-ink px-3 py-1.5 text-[10.5px] text-white">{lead.outcome}</span>
                <blockquote className="accent text-[clamp(1.85rem,3.4vw,3rem)] leading-[1.12] text-ink">“{lead.quote}”</blockquote>
                <div className="mt-auto grid items-end gap-5 pt-4 sm:grid-cols-[auto_1fr]">
                  <Person q={lead} />
                  <div className="sm:max-w-[22rem] sm:justify-self-end">
                    <Surfaced text={lead.surfaced} />
                  </div>
                </div>
              </figure>
            </Reveal>

            <div className="grid gap-3">
              {rest.map((q, i) => (
                <Reveal key={q.name} delay={0.12 * (i + 1)} className="h-full">
                  <figure className="flex h-full flex-col justify-between gap-6 rounded-[28px] bg-white/60 p-7 backdrop-blur-2xl">
                    <span className="meta w-fit rounded-full bg-ink px-3 py-1.5 text-[10.5px] text-white">{q.outcome}</span>
                    <blockquote className="accent text-[1.35rem] leading-[1.3] text-ink">“{q.quote}”</blockquote>
                    <Surfaced text={q.surfaced} />
                    <Person q={q} />
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
