import { useEffect, useRef, useState } from "react";
import { projects } from "../data";
import { useReveal } from "../lib/hooks";
import { Aside, SectionLabel, SplitWords } from "./Editorial";

export default function Works() {
  const headRef = useReveal<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);
  const [fine, setFine] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!fine) return;
    let raf = 0;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mouse.current = { ...pos };
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const loop = () => {
      pos.x += (mouse.current.x - pos.x) * 0.1;
      pos.y += (mouse.current.y - pos.y) * 0.1;
      const tilt = (mouse.current.x - pos.x) * 0.045;
      if (previewRef.current)
        previewRef.current.style.transform = `translate3d(${pos.x + 30}px, ${pos.y - 145}px, 0) rotate(${tilt}deg)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [fine]);

  return (
    <section id="work" className="relative z-10 bg-ink/70 py-20 sm:py-24 md:py-32 lg:py-36">
      <div className="wrap">
        <div ref={headRef} className="reveal mb-10 sm:mb-12 md:mb-16">
          <SectionLabel n="01">selected work</SectionLabel>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6 sm:mt-7 sm:gap-8">
            <h2 className="display t-1 max-w-3xl">
              <SplitWords text="work that ships." accent={["ships"]} />
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-cream/50">
              products · platforms · interfaces
              <br />
              <Aside>selected, and all live</Aside>
            </p>
          </div>
        </div>

        <div className="border-t border-line">
          {projects.map((p, i) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.title} — open live site`}
              data-cursor="view"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="idx-row group block border-b border-line"
            >
              <span className="sweep" aria-hidden="true" />
              <div className="row-inner grid grid-cols-[30px_1fr_auto] items-center gap-3 px-1 py-5 sm:grid-cols-[46px_1fr_auto] sm:gap-4 sm:py-6 lg:grid-cols-[80px_1fr_0.9fr_auto_46px] lg:gap-8 lg:py-8">
                <span className="label opacity-45">{p.index}</span>
                <div className="min-w-0">
                  <h3 className="r-title display t-2">{p.title.toLowerCase()}</h3>
                  <span className="label mt-1.5 block opacity-55 lg:hidden">
                    {p.category.toLowerCase()}
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2 lg:hidden">
                    {p.tags.map((t) => (
                      <span key={t} className="label border border-current/20 px-2 py-0.5 opacity-55">
                        {t.toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="hidden flex-col gap-2 lg:flex">
                  <span className="label opacity-60">{p.category.toLowerCase()}</span>
                  <p className="max-w-sm text-[13px] leading-relaxed opacity-55">{p.blurb}</p>
                </div>
                <span className="label flex flex-col items-end gap-1.5 self-start pt-1 opacity-55 sm:self-center sm:pt-0">
                  <span>{p.year}</span>
                  <span className="text-ember">live ↗</span>
                </span>
                <span className="r-arrow hidden lg:block">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              <div className="relative h-40 overflow-hidden sm:h-56 lg:hidden">
                <img src={p.image} alt={`${p.title} preview`} loading="lazy" className="duotone h-full w-full object-cover" />
                <span className="duotone-overlay" aria-hidden="true" />
              </div>
            </a>
          ))}
        </div>

        <p className="label mt-6 text-cream/30">
          every project above is live — more in the archive on request
        </p>
      </div>

      <div
        ref={previewRef}
        className={`pointer-events-none fixed left-0 top-0 z-40 hidden opacity-0 transition-opacity duration-300 lg:block ${
          active !== null ? "opacity-100" : ""
        }`}
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        <div className="relative h-[290px] w-[420px] overflow-hidden border border-line bg-ink-2 shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
          {projects.map((p, i) => (
            <img
              key={p.title}
              src={p.image}
              alt=""
              draggable={false}
              loading="lazy"
              className={`duotone absolute inset-0 h-full w-full object-cover transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            />
          ))}
          <span className="duotone-overlay" aria-hidden="true" />
          <div className="label absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink/85 px-4 py-3 text-cream/80">
            <span>{active !== null ? projects[active].category.toLowerCase() : ""}</span>
            <span className="text-ember">{active !== null ? projects[active].year : ""}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
