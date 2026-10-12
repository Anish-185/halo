import { useId } from "react";

/* ───────── Brand ───────── */

export function HaloMark({ size = 20, className = "" }: { size?: number; className?: string }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6c590" />
          <stop offset="0.55" stopColor="#f0b27a" />
          <stop offset="1" stopColor="#5f8aa0" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="8.25" fill="none" stroke={`url(#${id})`} strokeWidth="3" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[17px] font-semibold tracking-[-0.02em] ${className}`}>
      <HaloMark size={20} />
      Halo
    </span>
  );
}

/* ───────── Icons (1.5px stroke, 16px grid) ───────── */

const icon = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const Icon = {
  eyeOff: () => (
    <svg {...icon}>
      <path d="M2 2l12 12M6.6 3.3A6.6 6.6 0 0 1 8 3.2c3.6 0 5.8 3.3 6.3 4.8-.2.6-.8 1.6-1.6 2.5M4.1 4.6C2.9 5.5 2 6.9 1.7 8c.5 1.5 2.7 4.8 6.3 4.8 1 0 1.9-.3 2.7-.7" />
      <path d="M6.6 6.7a2 2 0 0 0 2.8 2.8" />
    </svg>
  ),
  mic: () => (
    <svg {...icon}>
      <rect x="5.5" y="1.75" width="5" height="8" rx="2.5" />
      <path d="M3 7.75a5 5 0 0 0 10 0M8 12.75v1.5" />
    </svg>
  ),
  cam: () => (
    <svg {...icon}>
      <rect x="1.75" y="4" width="9" height="8" rx="2" />
      <path d="M10.75 7l3.5-2v6l-3.5-2" />
    </svg>
  ),
  share: () => (
    <svg {...icon}>
      <rect x="1.75" y="2.75" width="12.5" height="9" rx="1.75" />
      <path d="M8 9.5V5.5M6 7.25L8 5.25l2 2M5.5 14h5" />
    </svg>
  ),
  check: () => (
    <svg {...icon}>
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  ),
  lock: () => (
    <svg {...icon}>
      <rect x="3" y="7" width="10" height="7.25" rx="2" />
      <path d="M5.25 7V5a2.75 2.75 0 0 1 5.5 0v2" />
    </svg>
  ),
  doc: () => (
    <svg {...icon}>
      <path d="M4 1.75h5l3.25 3.25v9.25H4zM9 1.75V5h3.25M6 8.5h4M6 11h4" />
    </svg>
  ),
  arrow: () => (
    <svg {...icon}>
      <path d="M3.5 8h9M8.5 4l4 4-4 4" />
    </svg>
  ),
  plus: () => (
    <svg {...icon}>
      <path d="M8 3v10M3 8h10" />
    </svg>
  ),
  apple: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden fill="currentColor">
      <path d="M11.2 8.5c0-1.6 1.3-2.4 1.4-2.4-.8-1.1-1.9-1.3-2.4-1.3-1-.1-2 .6-2.5.6s-1.3-.6-2.2-.6C4.4 4.8 3.3 5.5 2.7 6.5c-1.2 2.1-.3 5.2.9 6.9.6.8 1.2 1.7 2.1 1.7.8 0 1.2-.5 2.2-.5s1.3.5 2.2.5c.9 0 1.5-.8 2-1.7.6-.9.9-1.8.9-1.9 0 0-1.8-.7-1.8-3zM9.6 3.6c.4-.6.8-1.4.7-2.2-.7 0-1.5.5-2 1-.4.5-.8 1.3-.7 2.1.8.1 1.5-.4 2-.9z" />
    </svg>
  ),
};

/** Pill link; with `arrow` it carries a circled arrow, the page's signature button. */
export function Pill({
  href,
  children,
  tone = "light",
  arrow = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark" | "ghost";
  arrow?: boolean;
  className?: string;
}) {
  const tones = {
    light: "bg-white text-ink hover:bg-white/90",
    dark: "bg-ink text-white hover:bg-ink/85",
    ghost: "border border-white/35 bg-white/10 text-white backdrop-blur-xl hover:bg-white/20",
  };
  return (
    <a href={href} className={`btn ${arrow ? "btn-arrow" : ""} ${tones[tone]} ${className}`}>
      {children}
      {arrow && (
        <span className={`flex h-9 w-9 items-center justify-center rounded-full ${tone === "dark" ? "bg-white text-ink" : "bg-ink text-white"}`}>
          <Icon.arrow />
        </span>
      )}
    </a>
  );
}
