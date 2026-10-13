"use client";

import { useEffect, useRef } from "react";

/*
 * Generative backgrounds drawn from sound and light: voice ridgelines, a listening dot field,
 * and the halo ring as a shader. Each canvas fills its parent, renders at device pixel ratio,
 * only animates while on screen, and draws a single still frame when reduced motion is on.
 */

/**
 * Watches frame intervals and reports true once frames have run long (under ~45 fps) for a
 * sustained stretch. Raster cost lands after our draw calls, so the interval is the honest signal.
 */
function slowFrames() {
  let score = 0;
  return (dt: number) => {
    score = Math.max(0, score + (dt > 22 ? 1 : -1));
    if (score < 12) return false;
    score = 0;
    return true;
  };
}

/** How long the fields take to follow the pointer (time constant). Lower is snappier. */
const EASE_MS = 60;

type Frame = { w: number; h: number; t: number; px: number; py: number; still: boolean };

function useCanvas(draw: (c: CanvasRenderingContext2D, f: Frame) => void) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  useEffect(() => {
    drawRef.current = draw;
  });

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const f: Frame = { w: 0, h: 0, t: 0, px: -1e4, py: -1e4, still };
    // The pointer is kept in viewport coordinates and mapped onto the canvas each frame, so the field
    // still lands under the cursor after a scroll without mouse movement
    let cx = -1e4, cy = -1e4, raf = 0, visible = false, t0 = performance.now(), last = t0;

    // Start sharp; if this device can't keep up (often a software-rendered canvas), drop to 1x for good
    let dpr = Math.min(devicePixelRatio, 2);
    const isSlow = slowFrames();
    const size = () => {
      const r = canvas.getBoundingClientRect();
      f.w = r.width;
      f.h = r.height;
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (still) drawRef.current(ctx, f);
    };
    const tick = (now: number) => {
      f.t = (now - t0) / 1000;
      const r = canvas.getBoundingClientRect();
      const tx = cx - r.left, ty = cy - r.top;
      // Ease toward the pointer with a fixed 60 ms time constant: soft, but caught up in ~0.2 s at any frame rate
      const dt = now - last;
      const k = f.px < -1e3 ? 1 : 1 - Math.exp(-dt / EASE_MS);
      last = now;
      f.px += (tx - f.px) * k;
      f.py += (ty - f.py) * k;
      drawRef.current(ctx, f);
      if (dpr > 1 && isSlow(dt)) {
        dpr = 1;
        size();
      }
      if (visible) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      cx = e.clientX;
      cy = e.clientY;
    };
    const ro = new ResizeObserver(size);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && !still;
      cancelAnimationFrame(raf);
      if (visible) {
        last = performance.now();
        t0 = last - f.t * 1000;
        raf = requestAnimationFrame(tick);
      }
    });
    ro.observe(canvas);
    io.observe(canvas);
    addEventListener("pointermove", move);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      removeEventListener("pointermove", move);
    };
  }, []);

  return ref;
}

const fill = "pointer-events-none absolute inset-0 -z-10 h-full w-full";

/** Stacked voice waveforms, like ridges seen from above. They swell where the pointer is. */
export function Ridgelines({ ink = "#11120f", line = "rgb(233 231 225 / 0.5)", hot = "#ff7a2e", rows = 34 }) {
  const ref = useCanvas((c, { w, h, t, px, py }) => {
    c.fillStyle = ink;
    c.fillRect(0, 0, w, h);
    const top = h * 0.18, gap = (h * 0.86 - top) / rows;
    // The row nearest the pointer is the one "speaking"
    const hotRow = Math.round((py - top) / gap);
    for (let i = 0; i < rows; i++) {
      const y0 = top + i * gap;
      c.beginPath();
      c.moveTo(0, y0);
      for (let x = 0; x <= w; x += 6) {
        const u = x / w;
        const env = Math.exp(-((u - 0.5) ** 2) / 0.045); // loudest in the middle
        const voice =
          Math.sin(x * 0.021 + t * 1.3 + i * 1.7) * 0.5 +
          Math.sin(x * 0.047 - t * 0.9 + i * 0.6) * 0.3 +
          Math.sin(x * 0.11 + t * 2.1 + i * 3.1) * 0.2;
        const near = Math.exp(-((x - px) ** 2) / 9000 - ((y0 - py) ** 2) / 12000);
        const amp = gap * (0.6 + env * 3.2 + near * 4) * (0.6 + 0.4 * Math.sin(t * 0.7 + i));
        c.lineTo(x, y0 - Math.abs(voice) * amp);
      }
      // Fill down to the next row's baseline: that ridge's own fill hides everything below it,
      // so the rows tile the area without each one repainting to the bottom
      const below = i === rows - 1 ? h : y0 + gap + 1;
      c.lineTo(w, below);
      c.lineTo(0, below);
      c.closePath();
      c.fillStyle = ink;
      c.fill();
      c.strokeStyle = i === hotRow ? hot : line;
      c.lineWidth = i === hotRow ? 1.6 : 1;
      c.stroke();
    }
  });
  return <canvas ref={ref} aria-hidden className={fill} />;
}

/**
 * The hero: the halo ring rising like a sun over a range of voice ridgelines, in perspective.
 * A flame sky over ink water with flame ridgelines; it rises once after load, and the ridges
 * swell where the pointer is.
 */
export function Horizon({ rows = 22, horizonAt = 0.6, sunX = 0.6 }) {
  const ref = useCanvas((c, { w, h, t, px, py, still }) => {
    const ink = "#11120f";
    c.fillStyle = "#ff7a2e";
    c.fillRect(0, 0, w, h);

    const horizon = h * horizonAt;
    const R = Math.min(w * 0.22, h * 0.27);
    const k = still ? 1 : Math.min(1, Math.max(0, (t - 1.2) / 3.4));
    const rise = 1 - (1 - k) ** 3;
    const sx = w * sunX;
    const sy = horizon + R * 1.05 - rise * R * 0.95;

    // A pale bloom of light around the sun on the flame sky
    const glow = c.createRadialGradient(sx, sy, R * 0.4, sx, sy, R * 2.6);
    glow.addColorStop(0, `rgb(255 222 190 / ${0.12 + rise * 0.4})`);
    glow.addColorStop(1, "rgb(255 222 190 / 0)");
    c.fillStyle = glow;
    c.fillRect(sx - R * 2.6, sy - R * 2.6, R * 5.2, R * 5.2);

    // The ring, a pale sun on the flame sky, breathing slightly
    // Soft light around the ring from a few wide, faint strokes (canvas shadowBlur is far too slow per frame)
    const rr = R + Math.sin(t * 1.1) * 2;
    c.beginPath();
    c.arc(sx, sy, rr, 0, 6.2832);
    for (const [width, a] of [[34, 0.05], [18, 0.09], [9, 0.16]]) {
      c.lineWidth = width;
      c.strokeStyle = `rgb(255 240 225 / ${a * 1.6})`;
      c.stroke();
    }
    c.strokeStyle = "#f6f5f1";
    c.lineWidth = 3.5;
    c.stroke();

    // Ridges from far to near; each fills below itself so nearer ranges hide farther ones (and the sun)
    for (let i = 0; i < rows; i++) {
      const d = i / (rows - 1);
      const y0 = horizon + (h - horizon) * d ** 1.6;
      const next = i === rows - 1 ? h + 10 : horizon + (h - horizon) * ((i + 1) / (rows - 1)) ** 1.6 + 1;
      c.beginPath();
      c.moveTo(-10, y0);
      for (let x = -10; x <= w + 10; x += 6) {
        const env = 0.25 + Math.exp(-(((x - sx) / w) ** 2) / 0.05); // peaks gather under the sun
        const voice =
          Math.sin(x * 0.013 + t * 0.6 + i * 1.9) * 0.55 +
          Math.sin(x * 0.031 - t * 0.45 + i * 0.7) * 0.3 +
          Math.sin(x * 0.083 + t * 1.2 + i * 2.3) * 0.15;
        const near = Math.exp(-((x - px) ** 2) / 12000 - ((y0 - py) ** 2) / 9000);
        const amp = (10 + d * 95) * env + near * 50;
        c.lineTo(x, y0 - Math.abs(voice) * amp);
      }
      // Tile down to the next row; its own fill takes over from there
      c.lineTo(w + 10, next);
      c.lineTo(-10, next);
      c.closePath();
      c.fillStyle = ink;
      c.fill();
      const hot = Math.abs(y0 - py) < (h - horizon) / rows && px > 0 && px < w;
      c.strokeStyle = hot ? "#f6f5f1" : `rgb(255 122 46 / ${0.3 + d * 0.6})`;
      c.lineWidth = hot ? 1.5 : 1;
      c.stroke();
    }
  });
  return <canvas ref={ref} aria-hidden className={fill} />;
}

/** A dot matrix that listens: dots swell and warm to flame around the pointer, a slow tide runs through. */
export function DotField({ gap = 22, base = "17 18 15", hot = "255 122 46", strength = 1 }) {
  const ref = useCanvas((c, { w, h, t, px, py }) => {
    c.clearRect(0, 0, w, h);
    // Quiet dots are grouped into a few alpha bands so each band is one fill, not thousands
    const bands = Array.from({ length: BANDS }, () => new Path2D());
    const hotDots: [number, number, number, number][] = [];
    for (let y = gap / 2; y < h; y += gap) {
      for (let x = gap / 2; x < w; x += gap) {
        const near = Math.exp(-((x - px) ** 2 + (y - py) ** 2) / 14000);
        const tide = 0.5 + 0.5 * Math.sin(x * 0.012 + y * 0.008 - t * 1.2);
        const r = 1 + tide * 0.7 + near * 5.5;
        if (near > 0.08) hotDots.push([x, y, r, near]);
        else {
          const band = bands[Math.min(BANDS - 1, Math.floor(tide * BANDS))];
          band.moveTo(x + r, y);
          band.arc(x, y, r, 0, 6.2832);
        }
      }
    }
    bands.forEach((p, i) => {
      c.fillStyle = `rgb(${base} / ${(0.2 + ((i + 0.5) / BANDS) * 0.14) * strength})`;
      c.fill(p);
    });
    for (const [x, y, r, near] of hotDots) {
      c.fillStyle = `rgb(${hot} / ${0.35 + near * 0.65})`;
      c.beginPath();
      c.arc(x, y, r, 0, 6.2832);
      c.fill();
    }
  });
  return <canvas ref={ref} aria-hidden className={fill} />;
}
const BANDS = 6;

const frag = `
precision highp float;
uniform vec2 res; uniform float t; uniform float energy; uniform vec2 center; uniform float radius;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+1.), f.x), f.y); }
void main(){
  vec2 uv = (gl_FragCoord.xy - .5*res) / res.y - center;
  float a = atan(uv.y, uv.x), d = length(uv);
  // The ring wobbles like a voice: slow breath plus finer tremor when answering
  float wob = (n(vec2(cos(a)*2.+t*.25, sin(a)*2.-t*.2)) - .5) * .05
            + (n(vec2(a*6.+t*1.4, t)) - .5) * .035 * energy;
  float k = abs(d - radius - wob);
  float core = .0035 / (k + .002);
  float haze = exp(-k * 7.) * (.28 + .22*energy) + exp(-d * 2.6) * .05;
  vec3 ember = vec3(1., .48, .18), warm = vec3(.96, .77, .56), steel = vec3(.37, .54, .63);
  vec3 tint = mix(ember, steel, smoothstep(-.6, .9, sin(a - t*.15)));
  vec3 col = vec3(.067, .071, .059) + tint * haze + mix(tint, warm, .6) * core * (.55 + .45*energy);
  col += (h(gl_FragCoord.xy + fract(t)) - .5) * .045; // grain
  gl_FragColor = vec4(col, 1.);
}`;

/** The halo ring as light: a WebGL shader. `energy` (0–1) makes it burn brighter and tremble. */
export function HaloShader({ energy = 0, center = [0, 0], radius = 0.36 }: { energy?: number; center?: [number, number]; radius?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const target = useRef(energy);
  useEffect(() => {
    target.current = energy;
  }, [energy]);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return; // the frame's ink background stands in
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, "attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}"));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const u = (k: string) => gl.getUniformLocation(prog, k);

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, visible = false, e = target.current, t = 0, last = performance.now();
    const render = () => {
      gl.uniform1f(u("t"), t);
      gl.uniform1f(u("energy"), e);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    let dpr = Math.min(devicePixelRatio, 1.5);
    const isSlow = slowFrames();
    const size = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u("res"), canvas.width, canvas.height);
      // Portrait screens are too narrow for an off-centre ring: centre it and shrink it to fit
      const portrait = canvas.width < canvas.height;
      gl.uniform2f(u("center"), portrait ? 0 : center[0], portrait ? 0.12 : center[1]);
      gl.uniform1f(u("radius"), portrait ? 0.24 : radius);
      render();
    };
    const tick = (now: number) => {
      const dt = now - last;
      t += Math.min(0.05, dt / 1000);
      last = now;
      e += (target.current - e) * (1 - Math.exp(-dt / 400));
      render();
      if (dpr > 0.66 && isSlow(dt)) {
        dpr = dpr > 1 ? 1 : 0.66;
        size();
      }
      if (visible) raf = requestAnimationFrame(tick);
    };
    const ro = new ResizeObserver(size);
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting && !still;
      cancelAnimationFrame(raf);
      last = performance.now();
      if (visible) raf = requestAnimationFrame(tick);
    });
    ro.observe(canvas);
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
    // center/radius are fixed per placement
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={ref} aria-hidden className={fill} />;
}
