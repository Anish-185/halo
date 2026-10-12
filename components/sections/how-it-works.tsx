"use client";

import { Intro, Reveal } from "@/components/motion";
import { fields } from "@/components/fields";
import { HaloMark, HiddenBadge, Icon } from "@/components/halo-ui";

function ReadyVisual() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between rounded-full bg-white/[0.07] px-3 py-2">
        <span className="flex items-center gap-2 text-[12.5px] font-medium text-white">
          <HaloMark size={14} />
          Ready for your call
        </span>
        <span className="flex gap-1 text-[11px] text-white/55">
          {["⌘", "⇧", "H"].map((k) => (
            <kbd key={k} className="rounded-md bg-white/10 px-1.5 py-0.5 font-sans">
              {k}
            </kbd>
          ))}
        </span>
      </div>
      <div className="mt-3 flex-1 rounded-xl border border-dashed border-white/12 p-3">
        <div className="grid h-full grid-cols-2 gap-2">
          <div className="rounded-lg bg-[radial-gradient(circle_at_30%_20%,#5d7b8c,#24323c)]" />
          <div className="rounded-lg bg-[radial-gradient(circle_at_70%_20%,#8a7360,#30281f)]" />
        </div>
      </div>
      <HiddenBadge className="mt-3 self-start" />
    </div>
  );
}

const bars = [6, 14, 22, 12, 28, 18, 9, 24, 30, 16, 8, 20, 26, 12, 6, 18, 24, 10, 16, 8];

function ListenVisual() {
  return (
    <div className="flex flex-1 flex-col justify-center gap-6">
      <div className="flex h-16 items-center gap-[5px] px-1" aria-hidden>
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-[3px] flex-1 rounded-full bg-gradient-to-t from-ember/40 to-ember"
            style={{ height: `${h * 1.6}px`, opacity: 0.35 + (h / 30) * 0.65 }}
          />
        ))}
      </div>
      <div className="space-y-2.5 text-[12.5px] leading-snug">
        <p className="text-white/50">
          <span className="text-white/35">You </span>I led the move to queued retries last spring.
        </p>
        <p className="text-white/90">
          <span className="text-white/45">Maya </span>Nice. What would you change if you did it again?
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ember/15 px-2.5 py-1 text-[11px] text-ember">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-ember" />
          Question detected
        </span>
      </div>
    </div>
  );
}

function AnswerVisual() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <p className="mb-3 text-[12px] leading-snug text-white/50">
        <span className="text-white/35">They asked </span>What would you change if you did it again?
      </p>
      <div className="rounded-2xl bg-white/[0.07] p-3.5">
        <p className="text-[13px] font-medium text-white">Ship the dashboards first.</p>
        <ul className="mt-2 space-y-1.5 text-[12.5px] text-white/75">
          {[
            "We fixed failures before we could see them",
            "Earlier metrics would have saved two weeks",
            "Say it plainly. It shows judgment.",
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-ember/80" />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-white/45">
        <span className="flex items-center gap-1.5">
          <Icon.check />
          Drawn from your notes
        </span>
        <span>0.7s</span>
      </div>
    </div>
  );
}

const steps = [
  {
    title: "Launch the overlay",
    body: "Halo docks at the edge of your screen, hidden from screen share and recordings. Toggle it with ⌘⇧H.",
    Visual: ReadyVisual,
  },
  {
    title: "It transcribes both sides",
    body: "Live speech-to-text for you and every other speaker. Questions are detected the moment they are asked.",
    Visual: ListenVisual,
  },
  {
    title: "The answer streams in",
    body: "Structured talking points in under a second, grounded in your resume, notes and documents.",
    Visual: AnswerVisual,
  },
];

// Fragments of a transcript, scattered in columns like words caught mid-air
const words = [
  "how",
  "would",
  "you",
  "design",
  "a",
  "rate",
  "limiter",
  "per",
  "key",
  "redis",
  "429",
  "retry",
  "after",
  "burst",
];
const columns = Array.from({ length: 11 }, (_, i) => {
  const w = words[(i * 5) % words.length] + " " + words[(i * 3 + 2) % words.length];
  return { text: w.split(""), left: (i * 37 + 7) % 96, top: 42 + ((i * 53 + 11) % 50), delay: (i % 5) * -1.7 };
});

function Glyphs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {columns.map((c, i) => (
        <div
          key={i}
          className="glyph meta absolute flex flex-col items-center leading-[1.35] text-white/30"
          style={{ left: `${c.left}%`, top: `${c.top}%`, animationDelay: `${c.delay}s` }}
        >
          {c.text.map((ch, j) => (
            <span key={j}>{ch === " " ? "\u00a0" : ch}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="px-3 pt-24 sm:px-4 sm:pt-32">
      <div className="frame grain" style={fields.sky}>
        <Glyphs />
        <div aria-hidden className="absolute inset-0 z-0 bg-[linear-gradient(180deg,transparent_45%,rgb(12_32_84/0.4))]" />
        <div className="relative z-[1] mx-auto max-w-[1240px] px-5 py-20 sm:px-10 sm:py-28">
          <Intro
            light
            label="How it works"
            title="From question to answer"
            accent="in under a second."
            body="Halo runs next to your call app. No bot joins the meeting, and nothing appears on screen share."
          />
          <ol className="mt-14 grid gap-3 sm:mt-20 md:grid-cols-3">
            {steps.map(({ title, body, Visual }, i) => (
              <li key={title}>
                <Reveal delay={i * 0.12} className="h-full">
                  <div className="frost flex h-full flex-col rounded-[26px] p-2.5">
                    <div className="device edge-light flex min-h-[16rem] flex-col rounded-[18px] p-4">
                      <Visual />
                    </div>
                    <div className="px-3.5 pb-4 pt-6 text-white">
                      <span className="meta text-white/70">0{i + 1}</span>
                      <h3 className="title mt-2">{title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-white/80">{body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
