"use client";

import { useEffect, useState } from "react";

/** A live local-time readout, rendered only on the client to avoid a hydration mismatch. */
export function Clock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const id = setInterval(tick, 1000);
    const first = setTimeout(tick, 0);
    return () => {
      clearInterval(id);
      clearTimeout(first);
    };
  }, []);
  return (
    <span className={`meta tabular-nums ${className}`} suppressHydrationWarning>
      {now ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }) : "--:--:--"}
    </span>
  );
}
