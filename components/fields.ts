import type { CSSProperties } from "react";

// Grainy colour fields drawn from the reference moodboard. Pair with `grain` for texture.
const f = (background: string): CSSProperties => ({ background });

export const fields = {
  // pale sky, like a blurred window at noon
  sky: f(
    "radial-gradient(60% 70% at 12% 20%, #24479f 0%, transparent 70%), radial-gradient(45% 50% at 88% 12%, #cfe0ef 0%, transparent 70%), radial-gradient(50% 60% at 60% 45%, #6fa7d6 0%, transparent 70%), linear-gradient(160deg, #2d55ad 0%, #4f86c8 55%, #3a6db8 100%)",
  ),
  // deep green into cream, like light through leaves
  meadow: f(
    "radial-gradient(60% 55% at 22% 35%, #f3ecd6 0%, transparent 70%), radial-gradient(70% 70% at 80% 75%, #0f5c45 0%, transparent 70%), radial-gradient(60% 60% at 70% 20%, #e9e3c8 0%, transparent 65%), linear-gradient(150deg, #2f7a5c, #0d4a37)",
  ),
  // sunrise orange, soft and warm
  soleil: f(
    "radial-gradient(70% 70% at 70% 75%, #ff7a1a 0%, transparent 70%), radial-gradient(60% 60% at 20% 20%, #f4e6dc 0%, transparent 70%), radial-gradient(50% 50% at 85% 25%, #f7c39e 0%, transparent 70%), linear-gradient(160deg, #f6d8c2, #ff9a4d)",
  ),
  // sun yellow on clear blue
  bloom: f(
    "radial-gradient(45% 55% at 55% 40%, #f6c33a 0%, transparent 70%), radial-gradient(50% 50% at 25% 70%, #fbe7b0 0%, transparent 70%), radial-gradient(70% 80% at 0% 50%, #4b8fc9 0%, transparent 70%), linear-gradient(135deg, #8cc0e6, #dbe9f2)",
  ),
  // cyan with a magenta bloom, a little electric
  signal: f(
    "radial-gradient(40% 55% at 50% 50%, #e7a6f0 0%, transparent 70%), radial-gradient(40% 40% at 35% 70%, #c58ae8 0%, transparent 70%), linear-gradient(135deg, #3cc4f5, #5ac8f7)",
  ),
  // time of day, for the use case cards
  morning: f("radial-gradient(80% 50% at 50% 80%, #f2c27a 0%, transparent 70%), linear-gradient(180deg, #6c86a8 0%, #a9b6c4 55%, #e9c48f 100%)"),
  afternoon: f("radial-gradient(70% 60% at 30% 70%, #2e8fa8 0%, transparent 70%), linear-gradient(180deg, #8ccbe0 0%, #3d9ab4 60%, #1d6f86 100%)"),
  evening: f("radial-gradient(50% 35% at 50% 62%, #ffb36b 0%, transparent 70%), linear-gradient(180deg, #e79aa6 0%, #c66f6f 45%, #3b2a3c 100%)"),
  night: f("radial-gradient(60% 40% at 70% 20%, #6c6fd6 0%, transparent 70%), linear-gradient(180deg, #2a2f63 0%, #1b1d3d 60%, #0f1024 100%)"),
};
