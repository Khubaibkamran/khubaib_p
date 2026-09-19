import { useEffect, useState } from "react";

const NAME = "muhammad khubaib";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [typed, setTyped] = useState("");
  const [n, setN] = useState(0);
  const [exit, setExit] = useState(false);
  const [gone, setGone] = useState(false);

  // type the name out, character by character
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTyped(NAME);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(NAME.slice(0, i));
      if (i >= NAME.length) window.clearInterval(id);
    }, 62);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduced ? 250 : 1900;
    let raf = 0;
    let t1 = 0;
    let t2 = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 2.4);
      setN(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setExit(true);
        t1 = window.setTimeout(onDone, reduced ? 120 : 750);
        t2 = window.setTimeout(() => setGone(true), reduced ? 200 : 1000);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[90] flex flex-col justify-between bg-ink p-4 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] sm:p-6 md:p-10 ${
        exit ? "-translate-y-full" : ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(255,106,26,0.14),transparent_62%)]" />

      <div className="label relative flex items-start justify-between text-cream/40">
        <span>portfolio — vol. 09</span>
        <span>2026</span>
      </div>

      {/* typing mark */}
      <div className="relative flex flex-col items-center justify-center gap-5 px-2">
        <span className="display text-[clamp(2.5rem,9vw,6rem)] leading-none tracking-tight">
          <span className="text-cream">mk</span>
          <span className="text-ember">.</span>
        </span>

        <p className="label flex min-h-[1.2em] items-center text-cream/70">
          <span className="tracking-[0.3em]">{typed}</span>
          <span className="type-caret ml-1 inline-block h-[1em] w-[7px] bg-ember align-middle" />
        </p>
      </div>

      <div className="relative">
        <div className="mb-3 flex items-end justify-between">
          <p className="label text-ember">full stack · web &amp; mobile</p>
          <span className="display text-3xl leading-none text-cream/80 sm:text-5xl">
            {String(n).padStart(3, "0")}
          </span>
        </div>
        <div className="relative h-px w-full bg-line">
          <div
            className="absolute inset-y-0 left-0 bg-ember transition-[width] duration-100 ease-linear"
            style={{ width: `${n}%` }}
          />
        </div>
      </div>
    </div>
  );
}
