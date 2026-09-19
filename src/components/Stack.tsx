import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { categories, learning, principles, skills, type Cat } from "../data";
import { useReveal } from "../lib/hooks";
import { Aside, SectionLabel, SplitWords } from "./Editorial";

type Filter = "ALL" | Cat;
const FILTERS: Filter[] = ["ALL", ...categories];

export default function Stack() {
  const headRef = useReveal<HTMLDivElement>();
  const leftRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  const [filter, setFilter] = useState<Filter>("ALL");

  const visible = useMemo(
    () => (filter === "ALL" ? skills : skills.filter((g) => g.cat === filter)),
    [filter]
  );

  const counts = useMemo(() => {
    const all = skills.flatMap((g) => g.items);
    return {
      total: all.length,
      avg: Math.round(all.reduce((a, b) => a + b.pct, 0) / all.length),
    };
  }, []);

  return (
    <section id="stack" className="grid-bg relative z-10 border-t border-line py-20 sm:py-24 md:py-32 lg:py-36">
      <div className="wrap">
        <div
          ref={headRef}
          className="reveal mb-12 flex flex-wrap items-end justify-between gap-8 md:mb-16"
        >
          <div>
            <SectionLabel n="05">stack &amp; capabilities</SectionLabel>
            <h2 className="display t-1 mt-6 sm:mt-7">
              <SplitWords text="things i build with." accent={["with"]} />
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4">
            <p className="max-w-xs text-sm leading-relaxed text-cream/50">
              the tools i reach for, and how confident i am in each.{" "}
              <Aside>self-reported, honestly</Aside>
            </p>
            <div className="label flex gap-px border border-line bg-line">
              <span className="bg-ink px-4 py-2.5 text-cream/50">{counts.total} skills</span>
              <span className="bg-ink px-4 py-2.5 text-ember">avg {counts.avg}</span>
            </div>
          </div>
        </div>

        {/* filter bar */}
        <div className="mb-10 flex flex-wrap items-center gap-2 border-y border-line py-4">
          <span className="label mr-2 text-cream/35">filter:</span>
          {FILTERS.map((f) => (
            <button
              key={f}
              data-cursor
              onClick={() => setFilter(f)}
              className={`label border px-3.5 py-2 transition-all duration-300 ${
                filter === f
                  ? "border-ember bg-ember text-ink"
                  : "border-line text-cream/55 hover:border-ember/50 hover:text-cream"
              }`}
            >
              {f.toLowerCase()}
            </button>
          ))}
          <span className="label ml-auto text-cream/30">
            {visible.length} group{visible.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* principles column */}
          <div ref={leftRef} className="reveal lg:sticky lg:top-28 lg:self-start">
            <h3 className="display t-3 text-cream">
              three rules i <span className="text-ember">won't</span> break
            </h3>
            <div className="mt-8">
              {principles.map((p) => (
                <div key={p.n} className="rule-row group relative border-t border-line py-6">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-px w-0 bg-ember transition-all duration-700 ease-out group-hover:w-full"
                  />
                  <div className="flex items-baseline gap-4">
                    <span className="display text-xl text-cream/15 transition-colors duration-300 group-hover:text-ember/70">
                      {p.n}
                    </span>
                    <h4 className="display t-4 transition-transform duration-500 group-hover:translate-x-1.5">
                      {p.title.toLowerCase()}
                    </h4>
                  </div>
                  <p className="mt-2 pl-10 text-sm leading-relaxed text-cream/55">{p.text}</p>
                </div>
              ))}
              <div className="border-t border-line" />
            </div>

            <div className="mt-8 border border-line bg-ink/60 p-5">
              <p className="label text-cream/45">currently learning</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {learning.map((l) => (
                  <span
                    key={l}
                    className="label border border-dashed border-ember/35 px-2.5 py-1 text-ember/85"
                  >
                    {l.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* skill matrix */}
          <div ref={gridRef} className="reveal grid gap-8 sm:grid-cols-2">
            {visible.map((g, gi) => (
              <div
                key={g.group}
                className="skill-group border border-line bg-ink/50 p-5 md:p-6"
                style={{ "--d": `${gi * 0.05}s` } as CSSProperties}
              >
                <div className="mb-5 flex items-center justify-between border-b border-line pb-3">
                  <h3 className="label text-ember">{g.group.toLowerCase()}</h3>
                  <span className="label text-cream/30">{g.cat.toLowerCase()}</span>
                </div>
                <div className="space-y-4">
                  {g.items.map((s, i) => (
                    <div key={s.name} className="skill-row group">
                      <div className="label flex items-baseline justify-between gap-3">
                        <span className="text-cream/75 transition-colors duration-300 group-hover:text-cream">
                          {s.name.toLowerCase()}
                        </span>
                        <span className="tabular-nums text-ember">{s.pct}</span>
                      </div>
                      <div className="relative mt-2 h-[3px] overflow-hidden bg-line">
                        <span
                          className="bar-fill"
                          style={
                            { "--w": `${s.pct}%`, "--d": `${0.1 + i * 0.07}s` } as CSSProperties
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
