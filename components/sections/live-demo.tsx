"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { calm, Words } from "@/components/motion";
import { HaloShader, NightSea, VoiceWave } from "@/components/generative";
import { Answer, Asked, HaloPanel, HiddenBadge } from "@/components/halo-ui";

/* `at` values are positions (0–1) through the pinned scroll distance. */
const transcript = [
  {
    who: "Maya",
    text: "Thanks for making time today. Let's go straight into system design.",
    at: 0.02,
  },
  { who: "You", text: "Sounds good, I'm ready.", at: 0.07 },
  {
    who: "Maya",
    text: "How would you design a rate limiter for our public API?",
    at: 0.12,
  },
  {
    who: "You",
    text: "I'd start with what we're protecting, and who we don't want to punish.",
    at: 0.34,
  },
  {
    who: "You",
    text: "A token bucket per API key, with the counters in Redis…",
    at: 0.42,
  },
  {
    who: "Maya",
    text: "Makes sense. And what happens if Redis goes down?",
    at: 0.54,
  },
  {
    who: "You",
    text: "Then we fail open for reads and closed for writes, and here's why.",
    at: 0.8,
  },
];

const answers = [
  {
    q: "How would you design a rate limiter for our public API?",
    lead: "Start with the goal: protect the API without punishing good clients.",
    points: [
      "Token bucket per API key, counters kept in Redis",
      "Refill rate comes from the customer's plan, short bursts allowed",
      "Return 429 with a Retry-After header so clients back off cleanly",
      "Ask them: per-endpoint limits, or is per-key enough?",
    ],
    from: 0.15,
    to: 0.4,
  },
  {
    q: "What happens if Redis goes down?",
    lead: "Fail open for reads, fail closed for writes.",
    points: [
      "Keep a small in-memory bucket on each node as a fallback",
      "Alert on fallback mode, never fail silently",
      "Tradeoff to name: brief over-allowance beats a full outage",
    ],
    from: 0.57,
    to: 0.78,
  },
];

const len = (a: (typeof answers)[number]) => [a.lead, ...a.points].join("").length;

// ponytail: temporary side-by-side of background options; keep the chosen one and delete the rest
type Variant = "ring" | "wave" | "words" | "night";
const labels: Record<Variant, string> = {
  ring: "Halo ring",
  wave: "Option 1: live voice waveform",
  words: "Option 2: giant spoken question",
  night: "Option 3: night after the sunset",
};

/** Roughly how long (in scroll progress) a line takes to say, so the background can follow who is talking. */
const sayFor = (text: string) => 0.015 + text.length * 0.0006;

export function LiveDemo({ variant = "ring", id = "demo" }: { variant?: Variant; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [p, setP] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setP(Math.round(v * 500) / 500));

  const lines = transcript.filter((l) => p >= l.at);
  const current = [...answers].reverse().find((a) => p >= a.from);
  const shown = current ? Math.round(Math.min(1, (p - current.from) / (current.to - current.from)) * len(current)) : 0;
  const answering = !!current && shown < len(current);
  const last = lines.at(-1);
  const talking = !!last && p - last.at < sayFor(last.text);
  const maya = [...lines].reverse().find((l) => l.who === "Maya");
  const said = maya ? Math.min(1, (p - maya.at) / sayFor(maya.text)) : 0;

  return (
    <section id={id} ref={ref} className="relative mt-24 h-[360vh] px-3 sm:mt-32 sm:px-4">
      <div className="sticky top-3 h-[calc(100svh-24px)] sm:top-4 sm:h-[calc(100svh-32px)]">
        <div className="frame grain h-full bg-ink text-white">
          {variant === "ring" && <HaloShader energy={answering ? 1 : 0} center={[0.3, -0.04]} radius={0.4} />}
          {variant === "wave" && <VoiceWave level={talking ? 1 : 0} asking={talking && last.who === "Maya" && last.text.endsWith("?")} />}
          {variant === "night" && <NightSea />}
          <div className="relative z-[1] mx-auto flex h-full max-w-[1240px] flex-col justify-center px-3 pb-4 pt-20 sm:px-10 sm:pb-8 sm:pt-28">
            <div className="flex items-end justify-between gap-6">
              {variant === "words" ? (
                // The line being spoken becomes the headline, in the spoken (serif) voice, lit word by word
                <div className="min-w-0">
                  <h2 className="text-[15px] text-white/60">See it answer a system design interview.</h2>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={maya?.text ?? "idle"}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.5, ease: calm }}
                      aria-hidden
                      className="accent mt-2 max-w-[24ch] text-[clamp(1.9rem,4.2vw,4.25rem)] leading-[1.02]"
                    >
                      {(maya?.text ?? "Waiting for the first question…").split(" ").map((w, i, all) => (
                        <span
                          key={i}
                          className="transition-colors duration-300"
                          style={{ color: maya && i < said * all.length ? "#ff7a2e" : "rgb(246 245 241 / 0.22)" }}
                        >
                          {w}{" "}
                        </span>
                      ))}
                    </motion.p>
                  </AnimatePresence>
                </div>
              ) : (
                <Words text="See it answer a system design interview." className="headline max-w-[18ch] text-[clamp(1.75rem,3.6vw,3.5rem)]" />
              )}
              <p className="meta hidden items-center gap-2 text-white/75 md:flex">
                <span className="mr-3 rounded-full bg-flame px-2.5 py-1 text-ink">{labels[variant]}</span>
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-red-400" />
                Rec {lines.length ? `00:${String(8 + lines.length * 7).padStart(2, "0")}` : "00:00"} · Northwind Labs
              </p>
            </div>

            <div className="mt-5 grid min-h-0 gap-2 sm:mt-8 sm:gap-4 lg:grid-cols-[1fr_440px]">
              {/* Transcript: quiet smoked glass, so the Halo panel stays the richest object in the frame */}
              <div className="flex h-[17svh] border border-white/10 bg-white/[0.04] backdrop-blur-md flex-col rounded-[22px] p-4 sm:h-[36svh] sm:p-6 lg:h-[440px]">
                <p className="meta text-white/70">Live transcript</p>
                <div className="relative mt-4 flex flex-1 flex-col justify-end gap-3 overflow-hidden [mask-image:linear-gradient(transparent,black_30%)] sm:gap-4">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.p
                        key={l.text}
                        layout
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: calm }}
                        className={`max-w-[34rem] text-[14px] leading-relaxed sm:text-[17px] ${l.who === "You" ? "text-white/65" : "text-white"}`}
                      >
                        <span className={`meta mr-2 text-[11px] ${l.who === "You" ? "text-white/50" : "text-ember"}`}>
                          {l.who}
                        </span>
                        {l.text}
                      </motion.p>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <HaloPanel status={answering ? "Answering" : "Listening"} className="lg:h-[440px]">
                <div className="relative min-h-[15.5rem] flex-1 sm:min-h-[17rem]">
                  <AnimatePresence mode="wait" initial={false}>
                    {current ? (
                      <motion.div
                        key={current.q}
                        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transitionEnd: { filter: "none" },
                        }}
                        exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                        transition={{ duration: 0.6, ease: calm }}
                      >
                        <Asked q={current.q} />
                        <Answer lead={current.lead} points={current.points} shown={shown} />
                      </motion.div>
                    ) : (
                      <motion.p
                        key="idle"
                        exit={{ opacity: 0 }}
                        className="pt-16 text-center text-[14px] text-white/45"
                      >
                        Waiting for a question…
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div className="mt-auto hidden border-t border-white/[0.07] pt-3 sm:block">
                  <HiddenBadge />
                </div>
              </HaloPanel>
            </div>

            {/* Scroll progress, so the pinned section never feels stuck */}
            <div className="mx-auto mt-4 h-[3px] w-40 shrink-0 overflow-hidden rounded-full bg-white/20 sm:mt-6">
              <div className="h-full origin-left rounded-full bg-white" style={{ transform: `scaleX(${p})` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
