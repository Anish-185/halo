"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Intro } from "@/components/motion";
import { Answer, Asked, HaloPanel } from "@/components/halo-ui";

const cases = [
  {
    name: "Interviews",
    blurb: "Behavioral and technical questions, answered with your real experience in a clear structure.",
    app: "Google Meet",
    time: "09:30",
    sky: "morning",
    q: "Tell me about a time you disagreed with your manager.",
    lead: "Use the launch-date story. Disagree, commit, show the result.",
    points: [
      "You pushed to delay launch by a week for load testing",
      "Brought data: p95 latency doubled at 3x traffic",
      "Shipped a week late with zero incidents in month one",
    ],
  },
  {
    name: "Sales calls",
    blurb: "Pricing, objections and competitor questions handled while the buyer is still talking.",
    app: "Zoom",
    time: "14:00",
    sky: "afternoon",
    q: "Why are you more expensive than Northbeam?",
    lead: "Reframe on total cost, not seat price.",
    points: [
      "Setup is included; theirs is a $9k services package",
      "Customers cut reporting time by about six hours a week",
      "Offer a 30-day pilot on their own data",
    ],
  },
  {
    name: "Meetings",
    blurb: "Context on names, numbers and past decisions, plus a tidy list of who owes what.",
    app: "Microsoft Teams",
    time: "17:45",
    sky: "evening",
    q: "Where did we land on the Q3 hiring plan?",
    lead: "Approved on Sept 4: two engineers, one designer.",
    points: [
      "Design role is paused until the brand review closes",
      "Priya owns the engineering job posts",
      "Budget check-in is set for Oct 20",
    ],
  },
  {
    name: "Lectures",
    blurb: "Definitions, worked examples and clean notes while the professor keeps moving.",
    app: "Zoom",
    time: "21:00",
    sky: "night",
    q: "What's the difference between precision and recall?",
    lead: "Precision: how many flagged items were right. Recall: how many right items were flagged.",
    points: [
      "Spam filter: high precision means few real emails lost",
      "Cancer screening: favor recall, missing a case costs more",
      "F1 balances the two as a harmonic mean",
    ],
  },
];

/**
 * A day in one scroll: on large screens the section pins and the cards slide sideways from
 * morning to night. Smaller screens keep a native swipeable row.
 */
/*
 * Flat posters of the day: one sun crossing the sky. It rises low on the left, stands high at
 * noon, sinks on the right in the evening and turns to a pale moon at night.
 */
const skies = {
  morning: { bg: "bg-[#f6f5f1]", text: "text-ink", soft: "text-ink/65", disc: "bg-flame left-[-18%] top-[34%] w-[78%]" },
  afternoon: { bg: "bg-flame", text: "text-ink", soft: "text-ink/70", disc: "bg-[#f6f5f1] left-[30%] top-[-14%] w-[58%]" },
  evening: { bg: "bg-[#b8401a]", text: "text-white", soft: "text-white/75", disc: "bg-flame right-[-22%] top-[30%] w-[82%]" },
  night: {
    bg: "bg-ink",
    text: "text-white",
    soft: "text-white/65",
    disc: "bg-[#e9e7e1] right-[10%] top-[8%] w-[22%] shadow-[inset_-14px_6px_0_0_#11120f]",
  },
};

export function UseCases() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Slide the track until its right edge meets the viewport's right edge
  const transform = useTransform(scrollYProgress, (v) => `translateX(calc(${-v * 100}% + ${v * 100}vw))`);

  return (
    <section id="use-cases" ref={ref} className="relative lg:h-[300vh]">
      <div className="py-24 sm:py-32 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0">
        <motion.div
          style={{ transform }}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 max-lg:transform-none! sm:px-10 lg:w-max lg:overflow-visible"
        >
          <div className="w-[84vw] shrink-0 snap-center self-center sm:w-[60vw] lg:w-[34vw] lg:pr-12">
            <Intro title="One overlay for every call of your day." />
            <p className="lede mt-6 max-w-[26rem] text-ink/70">
              Interviews in the morning, a sales call after lunch, the team sync, the evening lecture. Halo adapts its answers to each.
            </p>
          </div>
          {cases.map((c) => {
            const sky = skies[c.sky as keyof typeof skies];
            return (
            <article
              key={c.name}
              className={`frame grain flex min-h-[36rem] w-[84vw] shrink-0 snap-center flex-col p-4 sm:w-[60vw] lg:h-[78svh] lg:max-h-[46rem] lg:w-[26vw] lg:min-w-[22rem] ${sky.bg} ${sky.text}`}
            >
              <span aria-hidden className={`absolute aspect-square rounded-full ${sky.disc}`} />
              <div className={`relative z-[1] flex items-center justify-between px-2 pt-1 ${sky.soft}`}>
                <span className="meta tabular-nums">{c.time}</span>
                <span className="meta">{c.app}</span>
              </div>
              <h3 className="relative z-[1] mt-8 px-2 text-[clamp(2.5rem,4vw,3.75rem)] font-[450] leading-[0.95] tracking-[-0.05em]">{c.name}</h3>
              <p className={`relative z-[1] mt-3 max-w-[26ch] px-2 text-[15px] leading-relaxed ${sky.soft}`}>{c.blurb}</p>
              <div className="relative z-[1] mt-auto pt-8">
                <HaloPanel status="Answering">
                  <Asked q={c.q} />
                  <Answer lead={c.lead} points={c.points.slice(0, 2)} />
                </HaloPanel>
              </div>
            </article>
            );
          })}
        </motion.div>
        <div className="mx-auto mt-8 hidden h-[3px] w-40 overflow-hidden rounded-full bg-ink/10 lg:block">
          <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left rounded-full bg-ink" />
        </div>
      </div>
    </section>
  );
}
