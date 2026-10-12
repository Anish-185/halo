import { Logo, Pill } from "@/components/icons";
import { Clock } from "@/components/clock";

const links = [
  ["How it works", "#how"],
  ["Features", "#features"],
  ["Pricing", "#pricing"],
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-5 z-50 px-6 sm:top-7 sm:px-10">
      <nav className="smoke mx-auto grid h-14 max-w-[1240px] grid-cols-[1fr_auto_1fr] items-center rounded-full pl-5 pr-1.5 sm:pl-6">
        <ul className="hidden items-center gap-6 text-[14px] text-white/80 md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="transition-colors hover:text-white">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#top" aria-label="Halo home" className="col-start-1 justify-self-start md:col-start-2 md:justify-self-center">
          <Logo className="text-white" />
        </a>
        <div className="col-start-3 flex items-center justify-end gap-4">
          <span className="hidden items-center gap-2 text-white/70 lg:flex">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-flame" />
            <Clock />
          </span>
          <Pill href="#download" arrow className="h-11 text-[14px]">
            Download
          </Pill>
        </div>
      </nav>
    </header>
  );
}
