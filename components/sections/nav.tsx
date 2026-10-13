"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Logo, Pill } from "@/components/icons";
import { Clock } from "@/components/clock";

const links = [
  ["How it works", "#how"],
  ["Features", "#features"],
  ["Try it", "#try"],
  ["Pricing", "#pricing"],
];

export function Nav() {
  // Tuck away while reading down the page, come back the moment you scroll up
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (Math.abs(y - prev) > 4) setHidden(y > prev && y > 400);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-160%" : "0%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onFocusCapture={() => setHidden(false)}
      className="fixed inset-x-0 top-5 z-50 px-6 sm:top-7 sm:px-10"
    >
      <nav className="smoke mx-auto grid h-14 max-w-[1240px] grid-cols-[1fr_auto_1fr] items-center rounded-full pl-5 pr-1.5 sm:pl-6">
        <ul className="hidden items-center gap-6 text-[14px] text-white/80 md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="transition-colors hover:text-white">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#top" aria-label="Halo home" className="col-start-1 justify-self-start md:col-start-2 md:justify-self-center">
          <Logo className="text-white" />
        </a>
        <div className="col-start-3 flex items-center justify-end gap-4">
          <span className="hidden items-center gap-2 text-white/70 lg:flex">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-flame" />
            <Clock />
          </span>
          <Pill href="#download" arrow className="h-11 text-[14px]">
            Download
          </Pill>
        </div>
      </nav>
    </motion.header>
  );
}
