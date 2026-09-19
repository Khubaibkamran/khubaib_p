import type { CSSProperties } from "react";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { useReveal } from "../lib/hooks";
import { Aside, SectionLabel, SplitWords } from "./Editorial";

const FACTS: [string, string][] = [
  ["BUILDS", "WEB & MOBILE APPS"],
  ["WORKS", "REMOTE / HYBRID"],
  ["LANGUAGES", "ENGLISH · URDU"],
  ["FOCUS", "REACT · REACT NATIVE · NODE"],
];

const ORBIT: { Icon: IconType; label: string }[] = [
  { Icon: SiReact, label: "React" },
  { Icon: SiTypescript, label: "TypeScript" },
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: SiNodedotjs, label: "Node.js" },
  { Icon: SiPostgresql, label: "PostgreSQL" },
  { Icon: SiTailwindcss, label: "Tailwind" },
];

/** Monogram with a slow ring of stack marks orbiting it — no photo, cheap to animate */
const Avatar = () => (
  <div className="avatar-stage dot-matrix relative aspect-square w-full overflow-hidden border border-line bg-ink/50">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,106,26,0.16),transparent_62%)]" />

    <span className="avatar-ring absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-ember/35" />
    <span className="avatar-ring-2 absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/[0.12]" />

    {/* monogram */}
    <div className="absolute left-1/2 top-1/2 flex h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden border border-ember/40 bg-ink/60 shadow-[0_0_60px_-18px_rgba(255,106,26,0.9)] backdrop-blur-sm">
      <span className="display text-[clamp(1.6rem,6vw,3rem)] leading-none text-cream">
        mk<span className="text-ember">.</span>
      </span>
      <span className="avatar-sweep pointer-events-none absolute inset-0" aria-hidden="true" />
    </div>

    {/* orbiting stack marks */}
    <div className="avatar-orbit absolute inset-[11%]">
      {ORBIT.map(({ Icon, label }, i) => {
        const a = (i / ORBIT.length) * 360;
        return (
          <span key={label} className="absolute inset-0" style={{ transform: `rotate(${a}deg)` }}>
            <span
              title={label}
              className="absolute left-1/2 top-0 block"
              style={{ transform: `translate(-50%, -50%) rotate(${-a}deg)` }}
            >
              <span className="avatar-chip flex h-11 w-11 items-center justify-center border border-line bg-ink/90">
                <Icon className="h-[19px] w-[19px] text-cream/55" aria-hidden="true" />
              </span>
            </span>
          </span>
        );
      })}
    </div>

    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line bg-ink/70 px-4 py-3 backdrop-blur-sm">
      <span className="label flex items-center gap-2.5 text-cream/75">
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-ember" />
        muhammad khubaib
      </span>
      <span className="label text-cream/35">full stack</span>
    </div>
  </div>
);

export default function About() {
  const leftRef = useReveal<HTMLDivElement>();
  const rightRef = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative z-10 border-t border-line bg-ink-2/30 py-20 sm:py-24 md:py-32 lg:py-36">
      <div className="wrap grid gap-12 md:gap-14 lg:grid-cols-2 lg:gap-20">
        {/* sticky identity column */}
        <div className="self-start lg:sticky lg:top-28">
          <div ref={leftRef} className="reveal">
            <Avatar />
            <p className="label mt-5 flex justify-between text-cream/40">
              <span>fig. 01 — the stack in orbit</span>
              <span>always spinning</span>
            </p>
          </div>
        </div>

        {/* narrative column */}
        <div ref={rightRef} className="reveal" style={{ "--d": "0.12s" } as CSSProperties}>
          <SectionLabel n="03">the person</SectionLabel>
          <h2 className="display t-1 mt-6 sm:mt-7">
            <SplitWords text="always building, still curious." accent={["curious"]} />
          </h2>

          <div className="mt-8 space-y-5 text-sm leading-relaxed text-cream/60 md:text-base">
            <p>
              I'm Muhammad Khubaib — a{" "}
              <span className="text-cream">full stack frontend software engineer</span> with nine
              years of production experience. I started out hand-coding responsive sites at an
              agency, and now I lead the front-end architecture for a multi-tenant SaaS platform
              used by 40,000+ people a day.
            </p>
            <p>
              I build <span className="text-cream">web apps and mobile apps</span> — pixel-accurate
              React and React Native interfaces, the design systems that keep them consistent, and
              the Node APIs, Postgres schemas and CI pipelines behind them.
            </p>
            <p>
              My bias: <span className="text-cream">the user feels the build.</span> Fast loads,
              accessible markup, and interfaces that behave exactly the way people expect.
            </p>
          </div>

          {/* quick facts */}
          <div className="mt-10 grid grid-cols-2 gap-px border border-line bg-line">
            {FACTS.map(([k, v]) => (
              <div key={k} className="bg-ink-2/60 p-4 md:p-5">
                <p className="label text-cream/40">{k.toLowerCase()}</p>
                <p className="label mt-1.5 text-cream/85">{v.toLowerCase()}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-l-2 border-ember/60 bg-ink/40 py-4 pl-5">
            <p className="serif-note text-lg text-cream/80 md:text-2xl">
              "give me a messy figma file and a deadline — i'll give you something fast,
              accessible, and maintainable."
            </p>
            <p className="label mt-3 text-cream/35">
              <Aside>the whole pitch, really</Aside>
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
