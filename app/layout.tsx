import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Newsreader } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], axes: ["opsz"] });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], style: "italic", axes: ["opsz"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Halo | Real-time AI answers for every call",
  description:
    "Halo transcribes your calls live, detects every question, and shows the answer in an overlay that stays invisible to screen share. For interviews, sales calls, meetings and lectures.",
};

export const viewport: Viewport = {
  themeColor: "#e9e7e1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable} ${mono.variable}`}>
      <body>
        {/* Intro: CSS only, so it plays before hydration and can never get stuck */}
        <div className="intro" aria-hidden>
          <svg viewBox="0 0 100 100">
            <defs>
              <linearGradient id="intro-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f6c590" />
                <stop offset="0.55" stopColor="#f0b27a" />
                <stop offset="1" stopColor="#5f8aa0" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="49"
              fill="none"
              stroke="url(#intro-ring)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              transform="rotate(-90 50 50)"
              className="draw"
              style={{ animationDuration: "1s" }}
            />
          </svg>
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
