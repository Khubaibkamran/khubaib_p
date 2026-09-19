import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "../lib/hooks";

/** Section label: "01 — selected work" */
export const SectionLabel = ({ n, children }: { n: string; children: ReactNode }) => (
  <p className="label flex items-center gap-3 text-ember">
    <span>{n}</span>
    <span className="h-px w-8 bg-ember/50" />
    <span className="text-cream/50">{children}</span>
  </p>
);

/** Parenthetical serif aside, Kott-style: "( selected, and shipped )" */
export const Aside = ({ children }: { children: ReactNode }) => (
  <span className="serif-note text-cream/45">( {children} )</span>
);

/**
 * Splits a string into words and reveals them one by one from
 * behind a mask when scrolled into view.
 */
export function SplitWords({
  text,
  className = "",
  stagger = 0.045,
  delay = 0,
  accent,
}: {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  /** words listed here render in the outlined ember style */
  accent?: string[];
}) {
  const ref = useReveal<HTMLSpanElement>(0.2);
  const words = text.split(" ");
  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((w, i) => {
        const isAccent = accent?.includes(w.replace(/[.,]/g, ""));
        return (
          <span key={`${w}-${i}`} className="word mr-[0.24em]">
            <span
              style={{ "--wd": `${delay + i * stagger}s` } as CSSProperties}
              className={isAccent ? "font-outline-ember" : undefined}
            >
              {w}
            </span>
          </span>
        );
      })}
    </span>
  );
}

/** Thin rule that draws itself left-to-right on entry */
export const DrawRule = ({ className = "" }: { className?: string }) => {
  const ref = useReveal<HTMLSpanElement>(0.5);
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`rule-draw block h-px w-full bg-line ${className}`}
    />
  );
};
