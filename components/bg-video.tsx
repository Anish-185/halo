"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Looping scenic video. The poster (its first frame) sits underneath, so nothing flashes blank;
 * the video only loads near the viewport, pauses off-screen, and is skipped
 * entirely when the OS asks for reduced motion.
 */
export function BgVideo({ name, priority = false }: { name: "dawn" | "dusk"; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [near, setNear] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNear(true);
        const v = video.current;
        if (!v) return;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "60% 0px" },
    );
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" aria-hidden>
      <Image
        src={`/media/${name}-poster.webp`}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        quality={82}
        className="object-cover"
      />
      {near && !reduce && (
        <video
          ref={video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={`/media/${name}-poster.webp`}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={`/media/${name}-1280.mp4`} media="(max-width: 767px)" type="video/mp4" />
          <source src={`/media/${name}-2560.webm`} type='video/webm; codecs="av01.0.12M.08"' />
          <source src={`/media/${name}-2560.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
