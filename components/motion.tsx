"use client";

import { motion, type HTMLMotionProps } from "motion/react";

export const calm = [0.22, 1, 0.36, 1] as const;

/** Fade-and-rise once, when the element scrolls into view. */
export function Reveal({
  delay = 0,
  y = 28,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      // No filter here: a filter on the wrapper would stop backdrop blur on glass inside it
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.2, ease: calm, delay }}
      {...props}
    />
  );
}

/** Headline whose words slide up out of a mask, one after another. */
export function Words({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
  onView = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p" | "span";
  onView?: boolean;
}) {
  const M = motion[Tag];
  const words = text.split(" ");
  const trigger = onView
    ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
    : { animate: "show" };
  return (
    <M className={className} initial="hide" {...trigger} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          {/* Padding + negative margin give descenders room inside the mask */}
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{ hide: { y: "110%" }, show: { y: 0 } }}
              transition={{ duration: 1.1, ease: calm, delay: delay + i * 0.05 }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </M>
  );
}

/** Section header: one big headline, optional copy beside it. */
export function Intro({
  title,
  body,
  light = false,
  center = false,
}: {
  title: string;
  body?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-[46rem] text-center" : body ? "grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-16" : ""}>
      <Words text={title} className={`headline ${light ? "text-white" : ""}`} />
      {body && (
        <Reveal delay={0.2} y={12} className={center ? "" : "md:pb-2"}>
          <p className={`lede max-w-[30rem] ${center ? "mx-auto mt-5" : ""} ${light ? "text-white/80" : "text-ink/70"}`}>{body}</p>
        </Reveal>
      )}
    </div>
  );
}

/** A plain section on the stone page. */
export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={className}>
      <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-10 sm:py-32">{children}</div>
    </section>
  );
}
