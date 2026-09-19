import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useReveal } from "../lib/hooks";
import { Aside, SectionLabel, SplitWords } from "./Editorial";

type Service = {
  n: string;
  title: string;
  note: string;
  desc: string;
  items: string[];
  stack: string;
  timeline: string;
};

const services: Service[] = [
  {
    n: "01",
    title: "websites",
    note: "designed, built, launched",
    desc: "The public face of the thing — fast, considered, and yours to edit without calling me.",
    items: ["marketing sites", "landing pages", "cms builds", "web apps"],
    stack: "next.js · sanity · vercel",
    timeline: "2 — 5 weeks",
  },
  {
    n: "02",
    title: "product interfaces",
    note: "the screens people live in",
    desc: "Dense, working software — tables, filters, states and every empty case designed, not skipped.",
    items: ["saas dashboards", "design systems", "data tables & charts", "onboarding flows"],
    stack: "react · typescript · tanstack",
    timeline: "4 — 12 weeks",
  },
  {
    n: "03",
    title: "full stack builds",
    note: "front to database, one pair of hands",
    desc: "Schema to pixel with nothing lost in the handoff, because there is no handoff.",
    items: ["node & express apis", "postgres / mongo schemas", "auth & billing", "file & media pipelines"],
    stack: "node · postgres · prisma",
    timeline: "6 — 16 weeks",
  },
  {
    n: "04",
    title: "performance & a11y",
    note: "make it fast, make it usable",
    desc: "Measured, not guessed. I bring receipts — before and after, on real devices.",
    items: ["core web vitals", "bundle surgery", "wcag audits", "seo foundations"],
    stack: "lighthouse · axe · webpagetest",
    timeline: "1 — 3 weeks",
  },
  {
    n: "05",
    title: "rescue & refactor",
    note: "for the codebase nobody wants to open",
    desc: "Inherited something frightening? I map it, test it, then change it in daylight.",
    items: ["legacy migrations", "code review", "test coverage", "ci/cd setup"],
    stack: "vitest · playwright · github actions",
    timeline: "3 — 10 weeks",
  },
  {
    n: "06",
    title: "ongoing support",
    note: "i don't disappear after launch",
    desc: "A standing slot in my week — features, fixes and the judgement calls in between.",
    items: ["retainers", "feature work", "embedded in your team", "mentoring"],
    stack: "whatever you already run",
    timeline: "monthly, rolling",
  },
];

export default function Services() {
  const headRef = useReveal<HTMLDivElement>();
  const bodyRef = useReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const s = services[active];

  const onKeyDown = (e: KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    const step = map[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + services.length) % services.length;
    setActive(next);
    tabsRef.current?.querySelectorAll("button")[next]?.focus();
  };

  return (
    <section
      id="services"
      className="relative z-10 border-t border-line bg-ink/65 py-20 sm:py-24 md:py-32 lg:py-36"
    >
      <div className="wrap">
        <div ref={headRef} className="reveal mb-10 sm:mb-12 md:mb-16">
          <SectionLabel n="02">start here</SectionLabel>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6 sm:mt-7 sm:gap-8">
            <h2 className="display t-1 max-w-3xl">
              <SplitWords text="anything, within reason." accent={["reason"]} />
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-cream/50">
              <Aside>reason negotiable</Aside>
              <br />
              websites, apps, dashboards and the systems behind them — designed and built under
              one roof. no handoffs, no lost context.
            </p>
          </div>
        </div>

        <div ref={bodyRef} className="reveal grid border border-line lg:grid-cols-[minmax(0,34%)_1fr]">
          {/* ---------- index ---------- */}
          <div className="flex flex-col border-b border-line lg:border-b-0 lg:border-r">
            <div className="label flex items-center justify-between border-b border-line px-5 py-3 text-cream/30">
              <span>capability index</span>
              <span className="tabular-nums">{services.length} lines</span>
            </div>

            <div
              ref={tabsRef}
              role="tablist"
              aria-label="services"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="relative"
            >
              {services.map((it, i) => {
              const on = i === active;
              return (
                <button
                  key={it.n}
                  role="tab"
                  aria-selected={on}
                  tabIndex={on ? 0 : -1}
                  data-cursor
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`svc-tab group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-500 ${
                    on ? "is-on bg-ember/[0.06]" : "hover:bg-cream/[0.015]"
                  } ${i ? "border-t border-line" : ""}`}
                >
                  <span
                    className={`label shrink-0 tabular-nums transition-colors duration-500 ${
                      on ? "text-ember" : "text-cream/30"
                    }`}
                  >
                    {it.n}
                  </span>
                  <span
                    className={`display min-w-0 flex-1 truncate text-[clamp(1.05rem,2vw,1.5rem)] transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                      on ? "translate-x-1 text-cream" : "text-cream/45 group-hover:translate-x-1"
                    }`}
                  >
                    {it.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-px shrink-0 bg-ember transition-all duration-500 ${
                      on ? "w-6 opacity-100" : "w-2 opacity-0"
                    }`}
                  />
                </button>
                );
              })}
            </div>

            <div className="mt-auto border-t border-line px-5 py-5">
              <p className="label text-cream/30">not on the list?</p>
              <p className="mt-2 text-sm leading-relaxed text-cream/55">
                Odd problems welcome — <Aside>that's usually the fun part</Aside>
              </p>
            </div>
          </div>

          {/* ---------- detail ---------- */}
          <div
            role="tabpanel"
            aria-label={s.title}
            className="dot-matrix relative min-h-[26rem] overflow-hidden p-6 sm:p-8 md:p-10"
          >
            <span
              aria-hidden="true"
              className="display pointer-events-none absolute -right-2 -top-8 select-none text-[11rem] leading-none text-cream/[0.03] sm:text-[15rem]"
            >
              {s.n}
            </span>

            <div key={s.n} className="svc-panel relative flex h-full flex-col">
              <p className="label text-ember">{s.note}</p>

              <h3 className="display mt-3 text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[0.95]">
                {s.title}
              </h3>

              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cream/60 md:text-base">
                {s.desc}
              </p>

              <div className="mt-7 grid gap-px border border-line bg-line sm:grid-cols-2">
                {s.items.map((it, i) => (
                  <span
                    key={it}
                    style={{ animationDelay: `${120 + i * 70}ms` }}
                    className="svc-item flex items-baseline gap-3 bg-ink px-4 py-3.5"
                  >
                    <span className="label shrink-0 text-ember/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="label text-cream/70">{it}</span>
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-8">
                <div className="flex flex-wrap gap-x-10 gap-y-4">
                  <span className="block">
                    <span className="label block text-cream/30">typical stack</span>
                    <span className="label mt-1.5 block text-cream/75">{s.stack}</span>
                  </span>
                  <span className="block">
                    <span className="label block text-cream/30">timeline</span>
                    <span className="label mt-1.5 block text-cream/75">{s.timeline}</span>
                  </span>
                </div>

                <a
                  href="#contact"
                  data-cursor
                  className="label group flex items-center gap-3 border border-line px-5 py-3 text-cream/75 transition-colors duration-300 hover:border-ember/60 hover:text-ember"
                >
                  brief me on this
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
