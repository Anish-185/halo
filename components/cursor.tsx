"use client";

import { useEffect, useRef } from "react";

/** A halo ring that trails the pointer and swells over anything clickable; buttons lean toward it. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    let x = -100, y = -100, cx = x, cy = y, raf = 0;
    let pulled: HTMLElement | null = null;

    const release = () => {
      if (pulled) pulled.style.translate = "";
      pulled = null;
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as Element;
      el.toggleAttribute("data-hover", !!t.closest("a, button, summary, [role=radio]"));
      // Magnetic pills: the button drifts a quarter of the way toward the pointer
      const btn = t.closest<HTMLElement>(".btn");
      if (btn !== pulled) release();
      if (btn) {
        const r = btn.getBoundingClientRect();
        btn.style.translate = `${(x - r.left - r.width / 2) * 0.25}px ${(y - r.top - r.height / 2) * 0.3}px`;
        pulled = btn;
      }
    };
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const hide = () => (el.style.opacity = "0");
    const show = () => (el.style.opacity = "1");
    addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", hide);
    document.documentElement.addEventListener("pointerenter", show);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.documentElement.removeEventListener("pointerenter", show);
      release();
    };
  }, []);

  return <div ref={ref} className="cursor hidden [@media(pointer:fine)]:block" aria-hidden />;
}
