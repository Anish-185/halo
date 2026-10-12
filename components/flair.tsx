/** A handwritten-feeling note: serif italic with a drawn arrow. `dir` sets where the arrow points. */
export function Note({
  children,
  dir = "down-right",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  dir?: "down-right" | "down-left" | "up-right";
  delay?: number;
  className?: string;
}) {
  const paths = {
    "down-right": "M6 6 C 30 10, 52 22, 58 52 M50 44 L58 54 L64 43",
    "down-left": "M58 6 C 34 10, 12 22, 6 52 M0 43 L6 54 L14 44",
    "up-right": "M6 54 C 30 50, 52 38, 58 8 M50 16 L58 6 L64 17",
  };
  return (
    <div className={`pointer-events-none flex items-start gap-1 ${className}`} aria-hidden>
      <span className="accent whitespace-nowrap text-[1.35rem] leading-none">{children}</span>
      <svg width="66" height="60" viewBox="0 0 66 60" fill="none" className="mt-2 shrink-0">
        <path
          d={paths[dir]}
          pathLength={1}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="draw"
          style={{ animationDelay: `${delay}s` }}
        />
      </svg>
    </div>
  );
}
