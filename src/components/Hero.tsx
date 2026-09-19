import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import ThreeScene from "./ThreeScene";
import Magnetic from "./Magnetic";
import { Aside } from "./Editorial";
import { EMAIL } from "../data";
import { usePrefersReducedMotion, useScramble } from "../lib/hooks";

/** Scroll-through-page progress, shown as "000" */
const ScrollCounter = () => {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setN(Math.round((window.scrollY / Math.max(1, max)) * 100));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <span className="tabular-nums">{String(n).padStart(3, "0")}</span>;
};

/** One row of the right-hand spec sheet */
const SpecRow = ({
  k,
  children,
  delay,
  start,
}: {
  k: string;
  children: React.ReactNode;
  delay: number;
  start: boolean;
}) => (
  <div
    style={{ transitionDelay: start ? `${delay}ms` : "0ms" }}
    className={`spec-row flex items-baseline justify-between gap-6 border-t border-line py-3 transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
      start ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
    }`}
  >
    <span className="label shrink-0 text-cream/35">{k}</span>
    <span className="label text-right text-cream/80">{children}</span>
  </div>
);

const TICKER = [
  "react",
  "next.js",
  "typescript",
  "node",
  "postgres",
  "three.js",
  "tailwind",
  "react native",
  "design systems",
  "performance",
];

export default function Hero({ start }: { start: boolean }) {
  const role = useScramble("full stack frontend engineer", start, 900);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = stageRef.current;
      if (!el) return;
      const y = window.scrollY;
      if (y < window.innerHeight * 1.3) {
        el.style.transform = `translateY(${y * 0.12}px)`;
        el.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.9)));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const fade = `transition-all duration-1000 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
    start ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
  }`;

  /** a headline line, revealed letter by letter from behind a mask */
  const nameLine = (txt: string, base: number, outline = false) => (
    <span className="block overflow-hidden pb-[0.06em]">
      <span className="block whitespace-nowrap">
        {txt.split("").map((ch, i) => (
          <span
            key={`${txt}-${i}`}
            style={
              {
                transitionDelay: start ? `${base + i * 38}ms` : "0ms",
                "--ci": i,
              } as CSSProperties
            }
            className={`hero-char inline-block ${
              start ? "translate-y-0 opacity-100" : "translate-y-[110%] opacity-0"
            } ${outline ? "font-outline-ember" : ""}`}
          >
            {ch}
          </span>
        ))}
      </span>
    </span>
  );

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <ThreeScene />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.55]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent to-ink" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink via-ink/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_20%,rgba(7,6,5,0.88)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,6,5,0.92)_0%,rgba(7,6,5,0.55)_38%,transparent_68%)]" />

      <div className="wrap relative z-10 flex min-h-[100svh] flex-col pb-6 pt-24 md:pt-28">
        {/* ---------- top rail ---------- */}
        <div
          className={`label flex items-center justify-between gap-4 border-b border-line pb-3 text-cream/40 ${fade}`}
          style={{ transitionDelay: "750ms" }}
        >
          <span>portfolio — vol. 09</span>
          <span className="hidden md:block">web apps · mobile apps</span>
          <span>available — 2026</span>
        </div>

        {/* ---------- stage ---------- */}
        <div
          ref={stageRef}
          className="flex flex-1 items-center py-8 will-change-transform md:py-10"
        >
          <div className="grid w-full gap-10 lg:grid-cols-12 lg:gap-8">
            {/* statement */}
            <div className="lg:col-span-8">
              <div
                className={`mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 md:mb-7 ${fade}`}
                style={{ transitionDelay: "900ms" }}
              >
                <span className="flex items-center gap-2 border border-ember/30 bg-ember/[0.07] px-3 py-1.5">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-ember" />
                  <span className="label text-ember">open to work — 2026</span>
                </span>
                <p className="label text-cream/55">{role}</p>
              </div>

              <h1 className="display hero-name select-none text-[clamp(2.7rem,8.4vw,8.2rem)] leading-[0.86]">
                {nameLine("muhammad", 1050)}
                {nameLine("khubaib.", 1200, true)}
              </h1>

              <p
                className={`mt-6 max-w-xl text-[14px] leading-relaxed text-cream/60 sm:text-[15px] md:mt-8 md:text-lg ${fade}`}
                style={{ transitionDelay: "1450ms" }}
              >
                i build web and mobile apps — interfaces up front, systems underneath.{" "}
                <Aside>still enjoying it</Aside>
              </p>

              <div
                className={`mt-8 flex flex-wrap items-center gap-3 md:mt-10 ${fade}`}
                style={{ transitionDelay: "1550ms" }}
              >
                <Magnetic strength={0.22}>
                  <a
                    href="#work"
                    data-cursor
                    className="label group flex items-center gap-3 bg-ember px-5 py-3.5 text-ink transition-colors duration-300 hover:bg-ember-soft sm:px-6"
                  >
                    see the work
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </Magnetic>
                <Magnetic strength={0.22}>
                  <a
                    href={`mailto:${EMAIL}`}
                    data-cursor
                    className="label group flex items-center gap-3 border border-line px-5 py-3.5 text-cream/80 transition-colors duration-300 hover:border-ember/60 hover:text-cream sm:px-6"
                  >
                    say hi
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 text-ember transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </Magnetic>
              </div>
            </div>

            {/* spec sheet */}
            <aside className="lg:col-span-4 lg:self-end lg:pb-2">
              <p
                className={`label mb-1 text-ember ${fade}`}
                style={{ transitionDelay: "1500ms" }}
              >
                spec sheet
              </p>
              <SpecRow k="status" delay={1560} start={start}>
                <span className="text-ember">available — q1 2026</span>
              </SpecRow>
              <SpecRow k="builds" delay={1640} start={start}>
                web apps · mobile apps
              </SpecRow>
              <SpecRow k="stack" delay={1720} start={start}>
                react · react native · node
              </SpecRow>
              <SpecRow k="ships" delay={1800} start={start}>
                fast, accessible, tested
              </SpecRow>
              <SpecRow k="reply" delay={1880} start={start}>
                within 24 hours
              </SpecRow>
            </aside>
          </div>
        </div>

        {/* ---------- bottom rail ---------- */}
        <div
          className={`flex items-end justify-between gap-6 border-t border-line pt-4 ${fade}`}
          style={{ transitionDelay: "1950ms" }}
        >
          <div className="marquee hero-ticker min-w-0 flex-1 overflow-hidden">
            <div className="marquee-track" aria-hidden="true">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0 items-center">
                  {TICKER.map((w) => (
                    <span key={`${dup}-${w}`} className="label flex items-center text-cream/30">
                      <span className="mx-4 h-1 w-1 rounded-full bg-ember/50" />
                      {w}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-end gap-4 sm:gap-5">
            <div className="hidden items-center gap-3 pb-1.5 sm:flex">
              <span className="label text-cream/40">scroll to inspect</span>
              <span className="relative block h-9 w-px overflow-hidden bg-line">
                <span className="drip absolute inset-0 bg-ember" />
              </span>
            </div>
            <span className="display text-4xl leading-none text-cream/15 sm:text-5xl md:text-6xl">
              <ScrollCounter />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
