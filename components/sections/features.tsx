"use client";

import { Intro, Reveal, Section } from "@/components/motion";
import { fields } from "@/components/fields";
import { HaloMark, Icon } from "@/components/halo-ui";

function MiniCall({ withHalo }: { withHalo: boolean }) {
  return (
    <div className="relative aspect-[16/10] rounded-xl bg-white/[0.05] p-2">
      <div className="grid h-full grid-cols-2 gap-1.5">
        <div className="rounded-lg bg-[radial-gradient(circle_at_30%_20%,#5d7b8c,#24323c)]" />
        <div className="rounded-lg bg-[radial-gradient(circle_at_70%_20%,#8a7360,#30281f)]" />
      </div>
      {withHalo && (
        <div className="absolute right-3 top-3 w-[46%] rounded-lg border border-white/10 bg-[#0d1318]/90 p-2 shadow-xl backdrop-blur">
          <div className="flex items-center gap-1 text-[9px] font-semibold text-white">
            <HaloMark size={9} /> Halo
          </div>
          <div className="mt-1.5 space-y-1">
            <div className="h-1 w-full rounded bg-white/50" />
            <div className="h-1 w-4/5 rounded bg-white/25" />
            <div className="h-1 w-3/5 rounded bg-white/25" />
          </div>
        </div>
      )}
    </div>
  );
}

function Invisible() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5">
      {[
        ["What you see", true],
        ["What they see", false],
      ].map(([label, halo]) => (
        <figure key={label as string}>
          <MiniCall withHalo={halo as boolean} />
          <figcaption className="mt-2.5 text-[12px] text-white/55">{label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function Transcript() {
  return (
    <div className="space-y-2 text-[12.5px] leading-snug">
      <p className="text-white/45">
        <span className="text-white/30">Lena </span>We’d need SSO before rolling out.
      </p>
      <p className="text-white/90">
        <span className="text-ember">Sam </span>Is that on the Team plan or extra?
      </p>
      <p className="text-white/45">
        <span className="text-white/30">Lena </span>Asking for our security review<span className="caret" />
      </p>
    </div>
  );
}

function Speed() {
  return (
    <div className="pt-1">
      <div className="relative h-1.5 rounded-full bg-white/10">
        <div className="absolute inset-y-0 left-0 w-[22%] rounded-full bg-ember" />
      </div>
      <div className="mt-3 flex justify-between text-[11.5px] text-white/50">
        <span>Question ends</span>
        <span className="text-ember">Answer, 0.8s</span>
        <span>4s</span>
      </div>
    </div>
  );
}

function Screen() {
  const code = ["function merge(a, b) {", "  const out = [];", "  while (a.length && b.length)", "    out.push(a[0] < b[0] ? a.shift() : b.shift());", "  return out;", "}"];
  return (
    <div className="overflow-hidden font-mono text-[11px] leading-[1.7] text-white/60">
      {code.map((c, i) => (
        <div key={i} className={`truncate whitespace-pre rounded px-1.5 ${i === 4 ? "bg-ember/15 text-white" : ""}`}>
          {c}
        </div>
      ))}
      <p className="mt-2 font-sans text-[12px] text-ember">Missing the leftovers: return out.concat(a, b)</p>
    </div>
  );
}

function Material() {
  return (
    <div className="flex flex-wrap gap-2">
      {["Resume.pdf", "Pricing 2026.pdf", "Product notes", "Case studies"].map((f) => (
        <span key={f} className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-3 py-1.5 text-[12px] text-white/80">
          <Icon.doc />
          {f}
        </span>
      ))}
      <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-white/20 px-3 py-1.5 text-[12px] text-white/50">
        <Icon.plus />
        Add
      </span>
    </div>
  );
}

function Notes() {
  return (
    <div className="space-y-2.5 text-[12.5px]">
      <p className="font-medium text-white">Acme renewal, Tuesday</p>
      {["Send SOC 2 report to Lena", "Quote Team plan for 40 seats", "Follow up Friday"].map((t, i) => (
        <p key={t} className="flex items-center gap-2 text-white/70">
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-[5px] border ${
              i === 0 ? "border-ember bg-ember text-graphite" : "border-white/25"
            }`}
          >
            {i === 0 && <Icon.check />}
          </span>
          {t}
        </p>
      ))}
    </div>
  );
}

function Privacy() {
  return (
    <div className="space-y-2.5 text-[12.5px] text-white/75">
      {[
        ["Keep transcripts", true],
        ["Use my calls for training", false],
      ].map(([label, on]) => (
        <div key={label as string} className="flex items-center justify-between rounded-xl bg-white/[0.06] px-3 py-2.5">
          {label}
          <span className={`flex h-5 w-9 items-center rounded-full p-0.5 ${on ? "justify-end bg-ember" : "bg-white/15"}`}>
            <span className="h-4 w-4 rounded-full bg-white shadow" />
          </span>
        </div>
      ))}
    </div>
  );
}

const features = [
  {
    title: "Invisible on screen share",
    body: "The overlay is excluded from screen sharing and recording at the system level. The other side sees your call, never Halo.",
    Visual: Invisible,
    span: "md:col-span-4",
    field: fields.meadow,
    light: true,
  },
  {
    title: "Live transcript",
    body: "Speaker-labeled transcription for every voice on the call.",
    Visual: Transcript,
    span: "md:col-span-2",
    field: fields.bloom,
  },
  {
    title: "Answers in under a second",
    body: "Answers start streaming about 0.8 seconds after the question ends.",
    Visual: Speed,
    span: "md:col-span-2",
    field: fields.soleil,
  },
  {
    title: "Sees your screen too",
    body: "Reads the code, slides or docs on your screen and answers about them.",
    Visual: Screen,
    span: "md:col-span-2",
    field: fields.signal,
  },
  {
    title: "Knows your material",
    body: "Upload a resume, price sheet or notes. Answers use your facts and numbers.",
    Visual: Material,
    span: "md:col-span-2",
    field: fields.sky,
    light: true,
  },
  {
    title: "Notes after every call",
    body: "Summary, decisions and action items, sent the moment the call ends.",
    Visual: Notes,
    span: "md:col-span-3",
    field: fields.bloom,
  },
  {
    title: "Private by default",
    body: "Audio is processed in real time and never stored. Your calls are never used to train models.",
    Visual: Privacy,
    span: "md:col-span-3",
    field: fields.meadow,
    light: true,
  },
];

export function Features() {
  return (
    <Section id="features">
      <Intro
        label="Features"
        title="What Halo knows"
        accent="while you talk."
        body="Halo combines what is being said, what is on your screen and what you have uploaded, then answers while the call is still going."
      />
      <div className="mt-14 grid grid-cols-1 gap-3 sm:mt-20 md:grid-cols-6">
        {features.map(({ title, body, Visual, span, field, light }, i) => (
          <Reveal key={title} delay={(i % 3) * 0.1} className={`frame grain flex min-h-[25rem] flex-col ${span}`} style={field}>
            <div className={`relative z-[1] p-6 sm:p-8 ${light ? "text-white" : "text-ink"}`}>
              <h3 className="title">{title}</h3>
              <p className={`mt-2 max-w-[30rem] text-[15px] leading-relaxed ${light ? "text-white/75" : "text-ink/70"}`}>{body}</p>
            </div>
            {/* The product peeks up from the bottom edge of the card */}
            <div className="relative z-[1] mt-auto px-5 sm:px-8">
              <div className="device edge-light translate-y-3 rounded-t-[18px] p-5 pb-8">
                <Visual />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
