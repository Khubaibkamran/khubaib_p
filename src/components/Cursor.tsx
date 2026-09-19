import { useEffect, useRef, useState } from "react";

/**
 * Minimal precision cursor.
 * - A crisp 5px orange dot sits exactly under the pointer (zero lag).
 * - A thin 30px ring trails softly behind it.
 * - Over [data-cursor] targets the ring grows slightly and a small label pill
 *   appears below-right. No blend modes, no oversized circles.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // fine pointers only, and never override the system cursor for
    // people who asked for reduced motion
    setEnabled(
      window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible(true);
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const loop = () => {
      // tight follow — keeps the ring close so it never feels laggy
      rx += (x - rx) * 0.28;
      ry += (y - ry) * 0.28;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest?.(
        "[data-cursor], a, button, input, textarea, select"
      ) as HTMLElement | null;
      setActive(!!t);
      setLabel(t?.dataset?.cursor || "");
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("mouseover", over);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* trailing ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95]"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s ease" }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color,background-color,opacity] duration-300 ease-out ${
            active
              ? "h-11 w-11 border-ember/80 bg-ember/10"
              : "h-[30px] w-[30px] border-cream/30"
          } ${down ? "scale-90 opacity-70" : ""}`}
        />
      </div>

      {/* precise dot + label */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[96]"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s ease" }}
      >
        <div
          className={`h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember transition-opacity duration-200 ${
            active ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`absolute left-4 top-4 whitespace-nowrap rounded-sm bg-ember px-2 py-1 font-mono text-[9px] font-medium tracking-[0.18em] text-ink transition-all duration-200 ${
            label ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
          }`}
        >
          {label}
        </span>
      </div>
    </>
  );
}
