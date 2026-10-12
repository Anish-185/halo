import Image from "next/image";
import { Intro, Reveal } from "@/components/motion";

// Placeholder people and quotes for the mock site.
const quotes = [
  {
    quote:
      "I used to freeze on system design questions. With Halo the outline was already there, so I could actually think out loud.",
    name: "Daniel Okafor",
    role: "Software engineer",
    tone: "from-[#8b9cf5] to-[#4a5bd0]",
  },
  {
    quote:
      "It pulled up our SOC 2 answer and the right pricing tier before the buyer finished the question. Close rate is up this quarter.",
    name: "Lena Brandt",
    role: "Account executive",
    tone: "from-[#ffb07a] to-[#ff6a1f]",
  },
  {
    quote: "The notes alone are worth it. I leave every meeting with the decisions written down and nothing to chase.",
    name: "Sofia Marín",
    role: "Product manager",
    tone: "from-[#f0a0c8] to-[#b05a86]",
  },
];

export function Testimonials() {
  return (
    <section id="stories" className="px-3 sm:px-4">
      <div className="frame grain text-white">
        <Image src="/media/lonetree.jpg" alt="" fill sizes="100vw" quality={80} className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(14_12_10/0.45),rgb(14_12_10/0.2)_45%,rgb(14_12_10/0.55))]" />
        <div className="relative z-[1] mx-auto max-w-[1240px] px-5 py-20 sm:px-10 sm:py-28">
          <Intro light label="Customers" title="What changes" accent="after the first call." />
          <div className="mt-14 grid gap-3 sm:mt-20 md:grid-cols-3">
            {quotes.map((q, i) => (
              <Reveal key={q.name} delay={i * 0.12} className="h-full">
                <figure className="frost flex h-full flex-col justify-between rounded-[26px] p-7 sm:p-8">
                  <blockquote className="accent text-[1.5rem] leading-[1.3] text-white">“{q.quote}”</blockquote>
                  <figcaption className="mt-10 flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${q.tone} text-[12px] font-medium text-white`}
                    >
                      {q.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                    <span className="text-[14px] leading-tight">
                      <span className="block font-medium">{q.name}</span>
                      <span className="meta text-[10.5px] text-white/65">{q.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
