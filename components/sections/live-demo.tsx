"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { calm, Words } from "@/components/motion";
import Image from "next/image";
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

export function LiveDemo() {
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

  return (
    <section id="demo" ref={ref} className="relative mt-24 h-[360vh] px-3 sm:mt-32 sm:px-4">
      <div className="sticky top-3 h-[calc(100svh-24px)] sm:top-4 sm:h-[calc(100svh-32px)]">
        <div className="frame grain h-full text-white">
          <Image src="/media/meadow.jpg" alt="" fill sizes="100vw" quality={80} className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(10_12_8/0.55),rgb(10_12_8/0.35)_40%,rgb(10_12_8/0.5))]" />

          <div className="relative z-[1] mx-auto flex h-full max-w-[1240px] flex-col justify-center px-3 pb-4 pt-20 sm:px-10 sm:pb-8 sm:pt-28">
            <div className="flex items-end justify-between gap-6">
              <h2
                aria-label="See it answer a system design interview."
                className="headline max-w-[18ch] text-[clamp(1.75rem,3.4vw,3rem)]"
              >
                <Words as="span" text="See it answer" />{" "}
                <Words as="span" delay={0.2} className="accent text-white/75" text="a system design interview." />
              </h2>
              <p className="meta hidden items-center gap-2 text-white/75 md:flex">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-red-400" />
                Rec {lines.length ? `00:${String(8 + lines.length * 7).padStart(2, "0")}` : "00:00"} · Northwind Labs
              </p>
            </div>

            <div className="mt-5 grid min-h-0 gap-2 sm:mt-8 sm:gap-4 lg:grid-cols-[1fr_440px]">
              {/* Transcript: frosted and secondary, so the Halo panel is the richest object in the frame */}
              <div className="frost flex h-[17svh] flex-col rounded-[22px] p-4 sm:h-[36svh] sm:p-6 lg:h-[440px]">
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

              <HaloPanel status={current && shown < len(current) ? "Answering" : "Listening"} className="lg:h-[440px]">
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
