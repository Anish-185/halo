import { Intro, Reveal, Section } from "@/components/motion";
import { fields } from "@/components/fields";
import { Answer, Asked, HaloPanel } from "@/components/halo-ui";

const cases = [
  {
    name: "Interviews",
    blurb: "Behavioral and technical questions, answered with your real experience in a clear structure.",
    app: "Google Meet",
    time: "09:30",
    sky: "morning",
    q: "Tell me about a time you disagreed with your manager.",
    lead: "Use the launch-date story. Disagree, commit, show the result.",
    points: [
      "You pushed to delay launch by a week for load testing",
      "Brought data: p95 latency doubled at 3x traffic",
      "Shipped a week late with zero incidents in month one",
    ],
  },
  {
    name: "Sales calls",
    blurb: "Pricing, objections and competitor questions handled while the buyer is still talking.",
    app: "Zoom",
    time: "14:00",
    sky: "afternoon",
    q: "Why are you more expensive than Northbeam?",
    lead: "Reframe on total cost, not seat price.",
    points: [
      "Setup is included; theirs is a $9k services package",
      "Customers cut reporting time by about six hours a week",
      "Offer a 30-day pilot on their own data",
    ],
  },
  {
    name: "Meetings",
    blurb: "Context on names, numbers and past decisions, plus a tidy list of who owes what.",
    app: "Microsoft Teams",
    time: "17:45",
    sky: "evening",
    q: "Where did we land on the Q3 hiring plan?",
    lead: "Approved on Sept 4: two engineers, one designer.",
    points: [
      "Design role is paused until the brand review closes",
      "Priya owns the engineering job posts",
      "Budget check-in is set for Oct 20",
    ],
  },
  {
    name: "Lectures",
    blurb: "Definitions, worked examples and clean notes while the professor keeps moving.",
    app: "Zoom",
    time: "21:00",
    sky: "night",
    q: "What's the difference between precision and recall?",
    lead: "Precision: how many flagged items were right. Recall: how many right items were flagged.",
    points: [
      "Spam filter: high precision means few real emails lost",
      "Cancer screening: favor recall, missing a case costs more",
      "F1 balances the two as a harmonic mean",
    ],
  },
];

export function UseCases() {
  return (
    <Section id="use-cases">
      <Intro
        label="Use cases"
        title="One overlay"
        accent="for every call of your day."
        body="Interviews in the morning, a sales call after lunch, the team sync, the evening lecture. Halo adapts its answers to each."
      />
      <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:mt-20 sm:px-0 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-4">
        {cases.map((c, i) => (
          <Reveal
            key={c.name}
            delay={i * 0.1}
            className="frame grain flex min-h-[36rem] w-[84vw] shrink-0 snap-center flex-col p-4 text-white sm:w-[60vw] md:w-auto"
            style={fields[c.sky as keyof typeof fields]}
          >
            <div className="relative z-[1] flex items-center justify-between px-2 pt-1 text-white/80">
              <span className="meta tabular-nums">{c.time}</span>
              <span className="meta">{c.app}</span>
            </div>
            <h3 className="accent relative z-[1] mt-10 px-2 text-[2.75rem] leading-[0.95]">{c.name}</h3>
            <p className="relative z-[1] mt-3 max-w-[24ch] px-2 text-[15px] leading-relaxed text-white/80">{c.blurb}</p>
            <div className="relative z-[1] mt-auto pt-8">
              <HaloPanel status="Answering">
                <Asked q={c.q} />
                <Answer lead={c.lead} points={c.points.slice(0, 2)} />
              </HaloPanel>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
