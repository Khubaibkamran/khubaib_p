import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { jobs } from "../data";
import { useReveal } from "../lib/hooks";
import { Aside, SectionLabel, SplitWords } from "./Editorial";

export default function Career() {
  const headRef = useReveal<HTMLDivElement>();
  const bodyRef = useReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const j = jobs[active];
  const current = jobs.find((x) => x.current);

  const onKeyDown = (e: KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + jobs.length) % jobs.length;
    setActive(next);
    railRef.current?.querySelectorAll("button")[next]?.focus();
  };

  return (
    <section
      id="career"
      className="relative z-10 border-t border-line bg-ink-2/30 py-20 sm:py-24 md:py-32 lg:py-36"
    >
      <div className="wrap">
        <div
          ref={headRef}
          className="reveal mb-12 flex flex-wrap items-end justify-between gap-8 md:mb-16"
        >
          <div>
            <SectionLabel n="04">career</SectionLabel>
            <h2 className="display t-1 mt-6 sm:mt-7">
              <SplitWords text="places that kept me busy." accent={["busy"]} />
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <p className="max-w-xs text-sm leading-relaxed text-cream/50">
              the places i’ve built things.{" "}
              <Aside>pick a year to open it</Aside>
            </p>
            {current && (
              <div className="flex items-center gap-3 border border-ember/30 bg-ember/[0.07] px-4 py-2.5">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-ember" />
                <span className="label text-ember">
                  currently @ {current.company.toLowerCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        <div ref={bodyRef} className="reveal">
          {/* ---------- timeline ribbon ---------- */}
          <div
            ref={railRef}
            role="tablist"
            aria-label="career timeline"
            onKeyDown={onKeyDown}
            className="tl-rail relative flex gap-3 overflow-x-auto pb-1 sm:gap-4"
          >
            <span aria-hidden="true" className="tl-track" />
            {jobs.map((job, i) => {
              const on = i === active;
              return (
                <button
                  key={job.company}
                  role="tab"
                  aria-selected={on}
                  tabIndex={on ? 0 : -1}
                  data-cursor
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`tl-node group relative flex min-w-[9.5rem] flex-1 flex-col items-start gap-3 border px-4 pb-4 pt-5 text-left transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] sm:min-w-[11rem] ${
                    on
                      ? "border-ember/50 bg-ember/[0.07]"
                      : "border-line bg-ink/50 hover:border-cream/25"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -top-[7px] left-4 h-3 w-3 rounded-full border transition-all duration-500 ${
                      on ? "border-ember bg-ember" : "border-cream/30 bg-ink"
                    }`}
                  />
                  <span
                    className={`display text-2xl leading-none transition-colors duration-500 sm:text-3xl ${
                      on ? "text-ember" : "text-cream/35"
                    }`}
                  >
                    {job.start}
                  </span>
                  <span
                    className={`label transition-colors duration-500 ${
                      on ? "text-cream" : "text-cream/45"
                    }`}
                  >
                    {job.company.toLowerCase()}
                  </span>
                  {job.current && (
                    <span className="label flex items-center gap-1.5 text-ember">
                      <span className="pulse-dot h-1 w-1 rounded-full bg-ember" />
                      now
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ---------- detail card ---------- */}
          <div className="dot-matrix relative mt-4 overflow-hidden border border-line bg-ink/55 p-5 sm:p-7 md:p-9">
            <span
              aria-hidden="true"
              className="display pointer-events-none absolute -right-3 -top-10 select-none text-[9rem] leading-none text-cream/[0.03] sm:text-[13rem]"
            >
              {j.start}
            </span>

            <div key={j.company} className="svc-panel relative">
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                <div className="min-w-0">
                  <p className="label text-ember">{j.period.toLowerCase()}</p>
                  <h3 className="display mt-2 text-[clamp(1.5rem,3.6vw,2.6rem)] leading-[1.05]">
                    {j.role.toLowerCase()}
                  </h3>
                  <p className="label mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-cream/50">
                    <span className="text-cream/85">{j.company.toLowerCase()}</span>
                    <span className="text-cream/25">/</span>
                    <span>{j.type.toLowerCase()}</span>
                  </p>
                </div>
                {j.current && (
                  <span className="label flex items-center gap-1.5 border border-ember/40 bg-ember/10 px-2.5 py-1.5 text-ember">
                    <span className="pulse-dot h-1 w-1 rounded-full bg-ember" />
                    current
                  </span>
                )}
              </div>

              <p className="mt-6 max-w-2xl border-l border-ember/40 pl-4 text-sm leading-relaxed text-cream/70 md:text-base">
                {j.summary}
              </p>

              <ul className="mt-6 grid gap-px border border-line bg-line lg:grid-cols-2">
                {j.points.map((p, i) => (
                  <li
                    key={p}
                    style={{ animationDelay: `${120 + i * 70}ms` }}
                    className="svc-item flex items-baseline gap-3 bg-ink px-4 py-3.5 text-sm leading-relaxed text-cream/60"
                  >
                    <span className="label shrink-0 tabular-nums text-ember/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {p}
                  </li>
                ))}
                {j.points.length % 2 === 1 && (
                  <li aria-hidden="true" className="hidden bg-ink lg:block" />
                )}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5">
                <span className="label mr-2 text-cream/30">stack</span>
                {j.stack.map((s) => (
                  <span
                    key={s}
                    className="label border border-line px-2.5 py-1 text-cream/60 transition-colors duration-300 hover:border-ember/50 hover:text-cream"
                  >
                    {s.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* summary bar */}
        <div className="mt-4 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {[
            ["ROLES HELD", String(jobs.length).padStart(2, "0")],
            ["CURRENTLY", current ? current.company : "—"],
            ["FOCUS", "REACT / NEXT.JS"],
            ["OPEN TO", "NEW ROLES"],
          ].map(([k, v]) => (
            <div key={k} className="bg-ink/80 p-5">
              <p className="label text-cream/40">{k.toLowerCase()}</p>
              <p className="display mt-2 text-lg text-cream md:text-xl">{v.toLowerCase()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
