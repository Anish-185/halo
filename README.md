# Halo: marketing site concept

A mock landing page for a fictional AI call copilot. Next.js 16, Tailwind CSS 4, Motion, Lenis.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## How the page is put together

- `app/page.tsx` lists the sections in order. Each section lives in `components/sections/`.
- `components/bg-video.tsx` plays the looping mist scene in the hero. `components/generative.tsx` draws the other backgrounds in code: voice ridgelines (how it works, final CTA), the halo-ring WebGL shader (live demo) and a pointer-reactive dot field (playground).
- `components/halo-ui.tsx` contains the product mockups: overlay window, call window, and streaming answers.
- `components/motion.tsx` has the reveal primitives. All motion respects `prefers-reduced-motion`: Lenis is disabled, background videos are replaced by their posters, and Motion keeps only fades.
- Materials (`frame`, `grain`, `frost`, `smoke`, `glass-dark`, `device`, `edge-light`), type (`display`, `headline`, the serif `accent`, mono `meta`) and buttons live in `app/globals.css`. Scenery is kept to the hero, the customer stories and the footer; everything between is ink, paper and flame, with generated textures and flat sun-and-moon posters for the use cases. The graphite Halo windows are always the richest object in each frame.

Media sources and the encoding pipeline are listed in `CREDITS.md`.
