"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { HaloMark, Icon } from "@/components/icons";

export { HaloMark, Icon, Logo } from "@/components/icons";

/* ───────── Streaming text ───────── */

/** Reveal `lines` progressively; `count` is characters shown across all lines. */
export function sliceLines(lines: string[], count: number) {
  let left = count;
  return lines.map((l) => {
    const s = l.slice(0, Math.max(0, left));
    left -= l.length;
    return s;
  });
}

/** Counts up characters at a reading pace once the element is in view. */
export function useStream<T extends Element>(total: number, { delay = 600, cps = 55 } = {}) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now() + delay;
    const tick = (t: number) => {
      const next = reduce ? total : Math.min(total, Math.max(0, Math.floor(((t - t0) / 1000) * cps)));
      setN(next);
      if (next < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, total, delay, cps]);

  return [ref, n] as const;
}

/* ───────── Halo overlay window ───────── */

export function HaloPanel({
  children,
  status = "Listening",
  className = "",
}: {
  children: React.ReactNode;
  status?: string;
  className?: string;
}) {
  return (
    <div className={`relative isolate ${className}`}>
      {/* The halo: a soft warm glow the panel floats on */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 -z-10 translate-y-5 rounded-[28px] bg-[linear-gradient(140deg,#f6c590,#f0b27a_40%,#8fb3c4)] opacity-80 blur-[48px]"
      />
      <div className="glass-dark edge-light flex h-full flex-col rounded-[22px] p-4 text-left sm:p-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[13px] font-semibold tracking-[-0.01em] text-white">
            <HaloMark size={16} />
            Halo
          </span>
          <span className="flex items-center gap-1.5 text-[12px] text-white/60">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-ember" />
            {status}
          </span>
        </div>
        <div className="mt-4 flex flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}

export function Asked({ q }: { q: string }) {
  return (
    <div className="rounded-xl bg-white/[0.06] px-3.5 py-3">
      <p className="text-[11.5px] font-medium text-white/45">They asked</p>
      <p className="mt-1 text-[14px] leading-snug text-white/90">{q}</p>
    </div>
  );
}

/** Text that types in place: the unrevealed rest is kept invisible so the layout never shifts. */
function Typed({ full, shown, cursor }: { full: string; shown: string; cursor: boolean }) {
  return (
    <>
      {shown}
      {cursor && <span className="caret text-ember" />}
      <span className="invisible">{full.slice(shown.length)}</span>
    </>
  );
}

/** An answer: lead sentence plus bullets, revealed by `shown` characters. */
export function Answer({ lead, points, shown }: { lead: string; points: string[]; shown?: number }) {
  const all = [lead, ...points];
  const vis = sliceLines(all, shown ?? Infinity);
  const cursorAt = vis.findIndex((v, i) => v.length < all[i].length);
  return (
    <div className="mt-4 space-y-2.5 text-[14px] leading-[1.5] text-white/85">
      <p className="font-medium text-white">
        <Typed full={lead} shown={vis[0]} cursor={cursorAt === 0} />
      </p>
      <ul className="space-y-1.5">
        {points.map((p, i) => (
          <li key={i} className="flex gap-2.5">
            <span
              className={`mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-ember/80 transition-opacity duration-500 ${
                vis[i + 1] ? "opacity-100" : "opacity-0"
              }`}
            />
            <span>
              <Typed full={p} shown={vis[i + 1]} cursor={cursorAt === i + 1} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Readout tiles, like a weather widget's: small facts about the answer. */
export function Tiles({ items }: { items: [string, string][] }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {items.map(([k, v]) => (
        <div key={k} className="rounded-xl bg-white/[0.06] px-3 py-2.5">
          <p className="meta text-[10.5px] text-white/45">{k}</p>
          <p className="mt-1 text-[13px] text-white/90">{v}</p>
        </div>
      ))}
    </div>
  );
}

export function HiddenBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] px-2.5 py-1 text-[11.5px] text-white/60 ${className}`}
    >
      <Icon.eyeOff />
      Hidden from screen share
    </span>
  );
}

/* ───────── Video call window ───────── */

function Tile({
  name,
  role,
  initials,
  tone,
  speaking = false,
}: {
  name: string;
  role?: string;
  initials: string;
  tone: string;
  speaking?: boolean;
}) {
  return (
    <div
      className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl ${tone} ${
        speaking ? "ring-2 ring-ember/70 ring-offset-0" : ""
      }`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-[15px] font-semibold text-white/90 backdrop-blur-md sm:h-20 sm:w-20 sm:text-2xl">
        {initials}
      </span>
      <span className="absolute bottom-2 left-2 rounded-md bg-black/35 px-2 py-0.5 text-[11px] text-white/90 backdrop-blur-md sm:bottom-3 sm:left-3 sm:text-[12px]">
        {name}
        {role && <span className="hidden text-white/55 sm:inline"> {role}</span>}
      </span>
    </div>
  );
}

export function CallWindow({ caption, className = "" }: { caption: string; className?: string }) {
  return (
    <div className={`glass-dark edge-light overflow-hidden rounded-[20px] sm:rounded-[26px] ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-white/20" />
        <span className="h-3 w-3 rounded-full bg-white/20" />
        <span className="h-3 w-3 rounded-full bg-white/20" />
        <span className="ml-3 truncate text-[12px] text-white/50">Final round, Northwind Labs</span>
        <span className="ml-auto hidden items-center gap-1.5 text-[12px] text-white/45 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
          32:14
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 p-2 sm:gap-3 sm:p-3">
        <Tile
          name="Maya Chen"
          role="Engineering Manager"
          initials="MC"
          tone="bg-[radial-gradient(120%_120%_at_30%_20%,#6f8ea0,#2b3c48_70%)]"
          speaking
        />
        <Tile
          name="You"
          initials="AK"
          tone="bg-[radial-gradient(120%_120%_at_70%_20%,#a08670,#3b3129_70%)]"
        />
      </div>
      <div className="hidden items-center justify-between gap-3 px-4 pb-4 pt-1 sm:flex sm:px-5">
        <p className="min-w-0 flex-1 truncate text-[12.5px] text-white/70 sm:text-[13px]">
          <span className="text-white/40">Maya: </span>
          {caption}
        </p>
        <div className="flex shrink-0 items-center gap-1.5 text-white/70">
          {[Icon.mic, Icon.cam, Icon.share].map((I, i) => (
            <span key={i} className="hidden h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] sm:flex">
              <I />
            </span>
          ))}
          <span className="flex h-8 items-center rounded-full bg-[#d9534f]/90 px-3 text-[12px] font-medium text-white">
            Leave
          </span>
        </div>
      </div>
    </div>
  );
}
