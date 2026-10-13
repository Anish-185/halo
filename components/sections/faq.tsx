import { Reveal, Section, Words } from "@/components/motion";
import { Icon } from "@/components/icons";

const faqs = [
  [
    "Can the other people on the call see Halo?",
    "No. Halo's window is excluded from screen sharing and screen recording on both Mac and Windows, so only you can see it.",
  ],
  [
    "Which apps does it work with?",
    "Zoom, Google Meet, Microsoft Teams, Webex, Slack huddles, and any other app that plays audio on your computer. There is nothing to install inside the call.",
  ],
  [
    "Does Halo record my calls?",
    "Audio is transcribed as it happens and then discarded. You decide whether transcripts and notes are kept, and you can delete them any time.",
  ],
  [
    "How fast are the answers?",
    "Usually under a second after a question ends. Longer answers keep writing while you start talking.",
  ],
  [
    "Can I give it my own material?",
    "Yes. Add a resume, price sheet, product docs or notes, and Halo will shape its answers around them.",
  ],
  ["Can I cancel anytime?", "Yes. Plans are month to month, and you keep access until the end of the period you paid for."],
];

export function Faq() {
  return (
    <Section id="faq">
      <div className="grid gap-10 md:grid-cols-[1fr_1.35fr] md:gap-16">
        <div>
          <Words text="Questions about Halo." className="headline" />
          <p className="mt-6 max-w-[22rem] text-[15px] leading-relaxed text-muted">
            Anything else? Write to support@halo.example and a person will reply within a day.
          </p>
        </div>
        <Reveal delay={0.15} className="rounded-[28px] bg-white/70 px-6 sm:rounded-[36px] sm:px-9">
          {faqs.map(([q, a], i) => (
            <details key={q} className={`group ${i ? "border-t border-ink/10" : ""}`}>
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-[17px] tracking-[-0.01em]">
                {q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone text-ink transition-transform duration-500 ease-calm group-open:rotate-45">
                  <Icon.plus />
                </span>
              </summary>
              <p className="max-w-[40rem] pb-6 text-[15.5px] leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
