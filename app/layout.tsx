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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
