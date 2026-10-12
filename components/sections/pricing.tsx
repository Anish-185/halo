import { Intro, Reveal, Section } from "@/components/motion";
import { Icon, Pill } from "@/components/icons";
import { fields } from "@/components/fields";

const tiers = [
  {
    name: "Free",
    price: "$0",
    per: "forever",
    blurb: "For trying Halo on a few calls.",
    cta: "Start free",
    items: ["10 answers a day", "Live transcript", "Works in every call app", "Hidden from screen share"],
  },
  {
    name: "Pro",
    price: "$24",
    per: "per month",
    blurb: "For people who spend their days on calls.",
    cta: "Get Pro",
    items: ["Unlimited answers", "Sees your screen", "Add your resume and notes", "Notes after every call", "Priority speed"],
    featured: true,
  },
  {
    name: "Team",
    price: "$40",
    per: "per person, monthly",
    blurb: "For sales and recruiting teams.",
    cta: "Talk to us",
    items: ["Everything in Pro", "Shared playbooks and talk tracks", "SSO and admin controls", "Team usage insights"],
  },
];

export function Pricing() {
  return (
    <Section id="pricing">
      <Intro
        label="Pricing"
        title="Start free."
        accent="Upgrade when it earns its place."
        body="10 free answers a day. Pro adds unlimited answers, screen context and call notes."
      />
      <div className="mt-14 grid items-stretch gap-3 sm:mt-20 lg:grid-cols-3">
        {tiers.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.12} className="h-full">
            {t.featured ? (
              <div className="frame grain h-full p-2" style={fields.soleil}>
                <Tier t={t} />
              </div>
            ) : (
              <div className="h-full rounded-[28px] bg-white/70 p-2 sm:rounded-[36px]">
                <Tier t={t} />
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Tier({ t }: { t: (typeof tiers)[number] }) {
  const dark = t.featured;
  return (
    <div className={`relative z-[1] flex h-full flex-col rounded-[22px] p-6 sm:rounded-[30px] sm:p-8 ${dark ? "device edge-light" : ""}`}>
      <div className="flex items-center justify-between">
        <h3 className="title">{t.name}</h3>
        {dark && <span className="meta -rotate-6 rounded-full bg-flame px-3 py-1.5 text-[10.5px] text-white shadow-[0_8px_20px_-8px_rgb(255_122_46/0.8)]">Most chosen</span>}
      </div>
      <p className={`mt-2 text-[15px] ${dark ? "text-white/60" : "text-muted"}`}>{t.blurb}</p>
      <p className="mt-10 flex items-baseline gap-3">
        <span className="text-[3.5rem] font-light leading-none tracking-[-0.05em] tabular-nums">{t.price}</span>
        <span className={`meta text-[10.5px] ${dark ? "text-white/55" : "text-muted"}`}>{t.per}</span>
      </p>
      <ul className={`mt-8 flex-1 space-y-3 text-[15px] ${dark ? "text-white/85" : "text-ink/80"}`}>
        {t.items.map((it) => (
          <li key={it} className="flex items-center gap-3">
            <span className={dark ? "text-ember" : "text-flame"}>
              <Icon.check />
            </span>
            {it}
          </li>
        ))}
      </ul>
      <Pill href="#download" arrow tone={dark ? "light" : "dark"} className="mt-10 w-full shrink-0 justify-between pl-6">
        {t.cta}
      </Pill>
    </div>
  );
}
