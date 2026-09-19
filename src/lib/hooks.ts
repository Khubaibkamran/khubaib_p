import { useEffect, useRef, useState } from "react";

/** Live check for prefers-reduced-motion */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

/** Adds .is-visible when the element scrolls into view (once) */
export function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

const SCRAMBLE_CHARS = "▓▒░#%&$@/<>+=*XKRZ";

/** Scramble-decode text effect */
export function useScramble(text: string, start: boolean, delay = 0): string {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState("");

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setOut(text);
      return;
    }
    let raf = 0;
    let frame = 0;
    const total = Math.max(34, text.length * 6);
    const tick = () => {
      frame++;
      const resolved = Math.floor((frame / total) * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === " ") {
          s += " ";
          continue;
        }
        s += i < resolved ? c : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
      }
      setOut(frame >= total ? text : s);
      if (frame < total) raf = requestAnimationFrame(tick);
    };
    const t = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [text, start, delay, reduced]);

  return out;
}

/** Counts up to target when scrolled into view */
export function useCountUp(target: number, duration = 1500) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return { ref, val };
}
