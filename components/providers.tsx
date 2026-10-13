"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { Cursor } from "@/components/cursor";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09, anchors: { offset: -24 } });
    return () => lenis.destroy();
  }, []);

  // reducedMotion="user": Motion drops transforms and keeps opacity when the OS asks for less motion.
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <Cursor />
    </MotionConfig>
  );
}
