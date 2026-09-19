import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { EMAIL, socials } from "../data";

const ICONS: Record<string, IconType> = {
  github: SiGithub,
  linkedin: FaLinkedinIn,
};

const MailIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="M3 6.5l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Floating dock pinned to the right edge.
 * Collapsed = icon tab; hover/focus slides the labelled panel out.
 * Hidden while the footer contact block is on screen (it has its own grid).
 */
export default function SocialDock() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 2600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;
    const io = new IntersectionObserver(
      (entries) => setHidden(entries[0].isIntersecting),
      { threshold: 0.06 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed right-0 top-1/2 z-[65] hidden -translate-y-1/2 flex-col items-end gap-2 transition-all duration-700 xl:flex ${
        mounted && !hidden
          ? "translate-x-0 opacity-100"
          : "pointer-events-none translate-x-8 opacity-0"
      }`}
    >
      {/* primary CTA tab */}
      <a
        href={`mailto:${EMAIL}`}
        data-cursor
        className="dock-item group flex items-center overflow-hidden rounded-l-lg border border-r-0 border-ember/40 bg-ember text-ink shadow-[0_10px_40px_rgba(255,106,26,0.2)]"
        style={{ "--brand": "#ff6a1a" } as CSSProperties}
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center">
          <MailIcon className="h-[18px] w-[18px]" />
        </span>
        <span className="dock-label whitespace-nowrap font-mono text-[11px] font-medium tracking-[0.18em]">
          LET'S TALK
        </span>
      </a>

      {socials.map((s, i) => {
        const Icon = ICONS[s.key];
        return (
          <a
            key={s.key}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            data-cursor
            aria-label={`${s.label} — ${s.handle}`}
            className="dock-item group flex items-center overflow-hidden rounded-l-lg border border-r-0 border-line bg-ink-2/95 text-cream/70 backdrop-blur"
            style={{ "--brand": s.brand, transitionDelay: `${i * 30}ms` } as CSSProperties}
          >
            <span className="flex h-11 w-12 shrink-0 items-center justify-center">
              <Icon className="dock-icon h-[17px] w-[17px]" />
            </span>
            <span className="dock-label whitespace-nowrap font-mono text-[10px] tracking-[0.2em]">
              {s.handle}
            </span>
          </a>
        );
      })}

      <span className="mt-2 mr-4 font-mono text-[9px] tracking-[0.3em] text-cream/25 [writing-mode:vertical-rl]">
        FIND ME
      </span>
    </div>
  );
}
