"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const text =
  "Every call has a moment when your mind goes blank. Halo hears the question, finds the answer in your own notes, and puts it in front of you before the pause gets long. Nobody else on the call sees a thing.";
const words = text.split(" ");

/** One word that brightens as the reader's scroll position passes it. */
function Word({ w, i, progress }: { w: string; i: number; progress: MotionValue<number> }) {
  const start = i / words.length;
  const opacity = useTransform(progress, [start, start + 2 / words.length], [0.14, 1]);
  return <motion.span style={{ opacity }}>{w} </motion.span>;
}

export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  return (
    <section aria-label="What Halo does" className="mx-auto max-w-[1360px] px-5 py-28 sm:px-10 sm:py-44">
      <p ref={ref} aria-label={text} className="headline max-w-[21ch] text-[clamp(2.25rem,5.8vw,6rem)] leading-[1.02]">
        <span aria-hidden>
          {words.map((w, i) => (
            <Word key={i} w={w} i={i} progress={scrollYProgress} />
          ))}
        </span>
      </p>
    </section>
  );
}
