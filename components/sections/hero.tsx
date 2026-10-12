"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BgVideo } from "@/components/bg-video";
import { calm, Words } from "@/components/motion";
import { Icon, Pill } from "@/components/icons";
import { Answer, Asked, CallWindow, HaloPanel, HiddenBadge, Tiles, useStream } from "@/components/halo-ui";

const q = "Walk me through a project you're proud of.";
const lead = "Lead with the payments migration. Big stakes, clear result.";
const points = [
  "Situation: old billing failed 2% of renewals every month",
  "Action: you led four engineers to move retries onto a queue",
  "Result: failures fell to 0.3%, about $1.2M a year recovered",
];
const total = [lead, ...points].join("").length;
const apps = ["Zoom", "Google Meet", "Microsoft Teams", "Slack", "Webex"];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: calm, delay },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const shotY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const [streamRef, shown] = useStream<HTMLDivElement>(total, { delay: 2400, cps: 48 });

  return (
    <section id="top" ref={ref} className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="frame grain pb-[220px] text-ink sm:pb-[340px]">
        <motion.div style={{ y: bgY }} className="absolute inset-x-0 -top-[4%] -bottom-[16%] -z-10">
          <BgVideo name="mist" priority />
          {/* Morning-mist veil: keeps ink type crisp over the bright sky, lets the ridges show below */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(244_245_243/0.82),rgb(244_245_243/0.55)_38%,rgb(244_245_243/0.1)_62%,rgb(10_20_14/0.18))]" />
        </motion.div>

        <div className="relative z-[1] mx-auto grid max-w-[1240px] gap-10 px-5 pt-36 sm:px-10 sm:pt-48 lg:grid-cols-[1.6fr_1fr] lg:items-end lg:gap-16">
          <div>
            <motion.p {...rise(0.2)} className="meta flex items-center gap-2 text-ink/60">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-flame" />
              Real-time answers for live calls
            </motion.p>
            <h1 aria-label="Answers before they finish asking." className="display mt-6">
              <Words as="span" onView={false} delay={0.25} text="Answers before" />
              <br />
              <Words as="span" onView={false} delay={0.45} className="accent text-ink/55" text="they finish asking." />
            </h1>
          </div>
          <motion.div {...rise(0.7)} className="lg:pb-3">
            <p className="lede max-w-[28rem] text-ink/75">
              Halo transcribes your call, detects each question, and writes the answer in an overlay only you can see.
              Nothing joins the meeting. Nothing shows on screen share.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <Pill href="#download" arrow tone="dark">
                <Icon.apple />
                Download for Mac
              </Pill>
              <Pill href="#demo">
                Watch a live call
              </Pill>
            </div>
          </motion.div>
        </div>
      </div>

      {/* The product breaks out of the frame onto the page: it is the subject, the scene is the stage */}
      <motion.div style={{ y: shotY }} className="relative z-10 mx-auto -mt-[190px] max-w-[1160px] px-2 sm:-mt-[300px] sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
          transition={{ duration: 1.8, ease: calm, delay: 1.0 }}
          className="lg:mr-[240px]"
        >
          <CallWindow caption={q} />
        </motion.div>

        <motion.div
          ref={streamRef}
          initial={{ opacity: 0, y: 24, scale: 0.94, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
          transition={{ duration: 1.6, ease: calm, delay: 1.8 }}
          className="relative z-10 mx-auto -mt-10 w-full max-w-[410px] origin-top sm:-mt-36 lg:absolute lg:right-8 lg:top-[14%] lg:mt-0"
        >
          <HaloPanel>
            <Asked q={q} />
            <Answer lead={lead} points={points} shown={shown} />
            <Tiles
              items={[
                ["Source", "Resume.pdf"],
                ["Answered in", "0.8 s"],
              ]}
            />
            <div className="mt-3">
              <HiddenBadge />
            </div>
          </HaloPanel>
        </motion.div>
      </motion.div>

      <motion.div {...rise(1.2)} className="mx-auto mt-14 flex max-w-[1240px] flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 sm:mt-20">
        <span className="meta text-muted">Works in</span>
        {apps.map((a) => (
          <span key={a} className="text-[17px] font-medium tracking-[-0.02em] text-ink/45">
            {a}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
