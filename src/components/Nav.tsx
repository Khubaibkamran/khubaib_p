import { useCallback, useEffect, useRef, useState } from "react";
import { EMAIL } from "../data";

const links: [string, string][] = [
  ["work", "#work"],
  ["services", "#services"],
  ["about", "#about"],
  ["career", "#career"],
  ["contact", "#contact"],
];

/** Thin ring that fills as the page scrolls */
const ProgressRing = () => {
  const ref = useRef<SVGCircleElement>(null);
  const C = 2 * Math.PI * 9;
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.min(1, window.scrollY / Math.max(1, max));
      if (ref.current) ref.current.style.strokeDashoffset = String(C * (1 - p));
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
  }, [C]);

  return (
    <svg viewBox="0 0 22 22" className="h-[22px] w-[22px] -rotate-90" aria-hidden="true">
      <circle cx="11" cy="11" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cream/15" />
      <circle
        ref={ref}
        cx="11"
        cy="11"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray={C}
        strokeDashoffset={C}
        className="text-ember"
      />
    </svg>
  );
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 30);
      if (window.scrollY < window.innerHeight * 0.5) setActive("");
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const ids = links.map(([, h]) => h.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /** slide the highlight to whichever link is hovered, else the active one */
  const movePill = useCallback(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;
    const target = hovered ?? active;
    const el = target
      ? nav.querySelector<HTMLAnchorElement>(`[data-href="${target}"]`)
      : null;
    if (!el) {
      pill.classList.remove("on");
      return;
    }
    pill.classList.add("on");
    pill.style.width = `${el.offsetWidth}px`;
    pill.style.transform = `translateX(${el.offsetLeft}px)`;
  }, [hovered, active]);

  useEffect(() => {
    movePill();
    window.addEventListener("resize", movePill);
    return () => window.removeEventListener("resize", movePill);
  }, [movePill]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] px-[clamp(0.6rem,2.5vw,1.6rem)] pt-[clamp(0.5rem,1.6vw,1rem)]">
        <div
          className={`nav-shell mx-auto flex max-w-[1500px] items-center justify-between gap-4 border px-4 sm:px-5 ${
            scrolled
              ? "border-ember/20 bg-ink/85 py-2.5 shadow-[0_18px_50px_-30px_rgba(255,106,26,0.8)] backdrop-blur-xl"
              : "border-transparent py-3.5"
          }`}
        >
          {/* mark */}
          <a
            href="#top"
            data-cursor
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="display text-xl leading-none tracking-tight">
              mk<span className="text-ember">.</span>
            </span>
            <span className="hidden h-4 w-px bg-line sm:block" />
            <span className="label hidden text-cream/35 transition-colors duration-300 group-hover:text-cream/70 sm:block">
              vol. 09
            </span>
          </a>

          {/* links */}
          <nav
            ref={navRef}
            aria-label="Primary"
            onMouseLeave={() => setHovered(null)}
            className="relative hidden items-center lg:flex"
          >
            <span ref={pillRef} className="nav-pill" aria-hidden="true" />
            {links.map(([l, h], i) => (
              <a
                key={l}
                href={h}
                data-cursor
                data-href={h}
                data-active={active === h}
                onMouseEnter={() => setHovered(h)}
                className={`nav-item label relative z-10 flex items-center gap-1.5 px-4 py-2.5 transition-colors duration-300 ${
                  active === h ? "text-ember" : "text-cream/60 hover:text-cream"
                }`}
              >
                <span className="nav-num tabular-nums text-ember/60">0{i + 1}</span>
                {l}
              </a>
            ))}
          </nav>

          {/* right rail */}
          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden items-center gap-2.5 border border-ember/25 bg-ember/[0.07] px-3.5 py-2 xl:flex">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-ember" />
              <span className="label text-cream/75">open to work — 2026</span>
            </div>

            <a
              href={`mailto:${EMAIL}`}
              data-cursor
              className="label hidden bg-ember px-4 py-2.5 text-ink transition-colors duration-300 hover:bg-ember-soft sm:block"
            >
              say hi
            </a>

            <span className="hidden lg:block">
              <ProgressRing />
            </span>

            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative -mr-1 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <span
                className={`h-px w-6 bg-cream transition-transform duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-cream transition-transform duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* mobile sheet */}
      <div
        className={`fixed inset-0 z-[55] flex flex-col justify-center overflow-y-auto bg-ink/95 px-6 py-24 backdrop-blur-xl transition-opacity duration-500 sm:px-10 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="ambient absolute" aria-hidden="true" />
        <div className="relative border-t border-line">
          {links.map(([l, h], i) => (
            <a
              key={l}
              href={h}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className={`display flex items-center justify-between border-b border-line py-4 text-[2rem] transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] sm:text-5xl ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              {l}
              <span className="label text-ember">0{i + 1}</span>
            </a>
          ))}
        </div>
        <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="label text-cream/40">remote — available worldwide</p>
          <a href={`mailto:${EMAIL}`} className="label bg-ember px-4 py-2.5 text-ink">
            say hi
          </a>
        </div>
      </div>
    </>
  );
}
