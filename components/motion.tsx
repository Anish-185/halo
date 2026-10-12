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

/** Headline that settles in word by word. */
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
          <motion.span
            className="inline-block"
            variants={{
              hide: { y: "0.5em", opacity: 0, filter: "blur(8px)" },
              show: { y: 0, opacity: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } },
            }}
            transition={{ duration: 1.2, ease: calm, delay: delay + i * 0.06 }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </M>
  );
}

/** Section header: mono label, a headline whose second phrase turns to serif italic, optional copy. */
export function Intro({
  label,
  title,
  accent,
  body,
  light = false,
  center = false,
}: {
  label?: string;
  title: string;
  accent?: string;
  body?: string;
  light?: boolean;
  center?: boolean;
}) {
  const soft = light ? "text-white/65" : "text-ink/45";
  return (
    <div className={center ? "mx-auto max-w-[46rem] text-center" : "grid gap-6 md:grid-cols-[1.25fr_1fr] md:gap-16"}>
      <div>
        {label && <p className={`meta ${light ? "text-white/70" : "text-muted"}`}>{label}</p>}
        <h2 aria-label={accent ? `${title} ${accent}` : title} className={`headline mt-4 ${light ? "text-white" : ""}`}>
          <Words as="span" text={title} />
          {accent && (
            <>
              {" "}
              <Words as="span" delay={0.25} className={`accent ${soft}`} text={accent} />
            </>
          )}
        </h2>
      </div>
      {body && (
        <Reveal delay={0.2} y={12} className={center ? "" : "md:pt-10"}>
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
