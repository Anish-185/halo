// A live feed of what Halo is answering right now (illustrative), scrolling past like a wire ticker.
const feed = [
  ["Interview", "Walk me through a project you're proud of", "0.8 s"],
  ["Sales", "Why are you more expensive than Northbeam?", "0.6 s"],
  ["Lecture", "Difference between precision and recall?", "0.7 s"],
  ["Interview", "How would you design a rate limiter?", "0.9 s"],
  ["Meeting", "Where did we land on the Q3 hiring plan?", "0.5 s"],
  ["Sales", "Do you support SSO on the Team plan?", "0.4 s"],
  ["Interview", "Tell me about a time you disagreed with your manager", "0.8 s"],
  ["Lecture", "Can you give an example of Bayes' rule?", "0.7 s"],
];

function Row() {
  return (
    <>
      {feed.map(([kind, q, t], i) => (
        <span key={i} className="flex shrink-0 items-center gap-3 pr-10">
          <span className="meta rounded-full border border-ink/15 px-2.5 py-1 text-[10.5px] text-ink/60">{kind}</span>
          <span className="accent text-[1.35rem] text-ink">“{q}”</span>
          <span className="meta flex items-center gap-1.5 text-[11px] text-flame">
            <span className="h-1.5 w-1.5 rounded-full bg-flame" />
            Answered {t}
          </span>
        </span>
      ))}
    </>
  );
}

export function Ticker() {
  return (
    <section aria-label="Questions Halo is answering" className="mt-20 overflow-hidden border-y border-ink/10 py-5 sm:mt-28">
      <div className="marquee flex w-max">
        <Row />
        <div aria-hidden className="flex">
          <Row />
        </div>
      </div>
    </section>
  );
}
