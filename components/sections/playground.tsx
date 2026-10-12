"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { fields } from "@/components/fields";
import { Intro } from "@/components/motion";
import { Answer, Asked, HaloPanel, Tiles } from "@/components/halo-ui";
import { Note } from "@/components/flair";

const prompts = [
  {
    chip: "Biggest weakness?",
    q: "What would you say is your biggest weakness?",
    lead: "Name a real one, then show the fix in motion.",
    points: ["Used to over-polish before sharing work", "Now ships a rough draft by day two for feedback", "Last launch: review cycles cut from 3 to 1"],
    source: "Your notes",
    time: "0.7 s",
  },
  {
    chip: "Pricing objection",
    q: "Honestly, this feels expensive for a team our size.",
    lead: "Agree on the number, move to cost per outcome.",
    points: ["40 seats on Team is $1,600 a month", "Saves ~6 hours per rep each week on prep", "Offer a 30-day pilot on 10 seats"],
    source: "Pricing 2026.pdf",
    time: "0.6 s",
  },
  {
    chip: "Explain Big-O",
    q: "Can you explain the time complexity of your solution?",
    lead: "O(n log n) time, O(n) space. Say why in one breath.",
    points: ["Sorting dominates at n log n", "Single pass merge afterward is O(n)", "Could drop to O(n) with a hash map if order doesn't matter"],
    source: "Screen: solution.py",
    time: "0.9 s",
  },
  {
    chip: "Why this company?",
    q: "Why do you want to work here specifically?",
    lead: "Tie their mission to one thing you've already built.",
    points: ["Their API-first payments push matches your migration work", "You've used their SDK in a side project", "Ask about the reliability team's roadmap"],
    source: "Resume.pdf",
    time: "0.8 s",
  },
  {
    chip: "Summarize the call",
    q: "Can someone recap what we decided today?",
    lead: "Three decisions, two owners, one open question.",
    points: ["Ship v2 onboarding on Nov 3, owner Priya", "Pause the referral test until data is clean", "Open: who owns the EU pricing page?"],
    source: "Live transcript",
    time: "0.5 s",
  },
];

const length = (p: (typeof prompts)[number]) => [p.lead, ...p.points].join("").length;

export function Playground() {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const p = prompts[i];

  // Restream whenever the question changes (or first comes into view)
  useEffect(() => {
    if (!inView) return;
    const total = length(prompts[i]);
    let raf = 0;
    const t0 = performance.now() + 450;
    const tick = (t: number) => {
      const n = reduce ? total : Math.min(total, Math.max(0, Math.floor(((t - t0) / 1000) * 60)));
      setShown(n);
      if (n < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [i, inView, reduce]);

  return (
    <section id="try" className="px-3 sm:px-4">
      <div className="frame grain" style={fields.soleil}>
        <div className="relative z-[1] mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1fr_460px] lg:gap-20">
          <div>
            <Intro label="Try it" title="Ask it" accent="something hard." />
            <p className="lede mt-6 max-w-[28rem] text-ink/75">
              Pick a question someone might throw at you. Halo answers the way it would on a real call.
            </p>
            <div role="radiogroup" aria-label="Sample questions" className="mt-9 flex flex-wrap gap-2">
              {prompts.map((x, n) => (
                <button
                  key={x.chip}
                  role="radio"
                  aria-checked={n === i}
                  onPointerDown={() => setI(n)}
                  onClick={() => setI(n)}
                  className={`btn h-11 px-4 text-[14.5px] ${
                    n === i ? "bg-ink text-white" : "bg-white/55 text-ink backdrop-blur-xl hover:bg-white/80"
                  }`}
                >
                  {x.chip}
                </button>
              ))}
            </div>
            <Note dir="down-right" className="mt-10 hidden text-ink/70 lg:flex">
              go on, try another
            </Note>
          </div>

          <div ref={ref} aria-live="polite">
            <HaloPanel status={shown < length(p) ? "Answering" : "Ready"}>
              <div className="grid">
                {/* Reserve the tallest answer's height so the panel never jumps */}
                {prompts.map((x) => (
                  <div key={x.chip} className="invisible col-start-1 row-start-1" aria-hidden>
                    <Asked q={x.q} />
                    <Answer lead={x.lead} points={x.points} />
                    <Tiles items={[["Source", x.source], ["Answered in", x.time]]} />
                  </div>
                ))}
                <div className="col-start-1 row-start-1">
                  <Asked q={p.q} />
                  <Answer lead={p.lead} points={p.points} shown={shown} />
                  <Tiles items={[["Source", p.source], ["Answered in", p.time]]} />
                </div>
              </div>
            </HaloPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
