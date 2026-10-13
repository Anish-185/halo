# Halo: marketing site concept

A mock landing page for a fictional AI call copilot. Next.js 16, Tailwind CSS 4, Motion, Lenis.

## Open the website

You need [Node.js](https://nodejs.org) 20.9 or newer (it comes with npm) and Git.

1. Get the code. The repository is private, so your GitHub account needs access:

   ```bash
   git clone https://github.com/Anish-185/halo.git
   cd halo
   ```

2. Install the dependencies (once, or after pulling changes that touch `package.json`):

   ```bash
   npm install
   ```

3. Start the site:

   ```bash
   npm run dev
   ```

4. Open **http://localhost:3000** in your browser. Edits to the code reload the page automatically. Stop the server with `Ctrl+C`.

If port 3000 is already in use, pick another one with `npm run dev -- -p 3100` and open http://localhost:3100 instead.

To run the faster production version (what visitors would get), build it first:

```bash
npm run build
npm start         # http://localhost:3000
```

The page is best viewed in a desktop browser with a mouse: the backgrounds react to the pointer. It also works on phones, and it respects your system's reduced-motion setting.

## How the page is put together

- `app/page.tsx` lists the sections in order. Each section lives in `components/sections/`.
- `app/layout.tsx` holds the intro: the halo ring draws itself and opens like an iris onto the page, in CSS only.
- `components/generative.tsx` draws the backgrounds in code: the sunrise horizon in the hero, voice ridgelines (how it works, final CTA) and a pointer-reactive dot field (playground, footer). Canvases only animate while on screen, follow the pointer with a 60 ms ease (`EASE_MS`), and drop to a lower resolution on devices that can't keep up.
- `components/halo-ui.tsx` contains the product mockups: overlay window, call window, and streaming answers.
- `components/motion.tsx` has the reveal primitives; `components/cursor.tsx` the halo cursor and magnetic buttons. All motion respects `prefers-reduced-motion`: Lenis, the intro and the cursor are off, canvases draw one still frame, and Motion keeps only fades.
- Materials (`frame`, `grain`, `smoke`, `glass-dark`, `device`, `edge-light`), type (`display`, `headline`, the serif `accent` for spoken words, mono `meta`) and buttons live in `app/globals.css`. The palette is ink, paper and flame; the only photograph is the cherry blossom behind the customer stories. The graphite Halo windows are always the richest object in each frame.

Media sources are listed in `CREDITS.md`.
