import { useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { EMAIL, socials } from "../data";
import Magnetic from "./Magnetic";
import { usePrefersReducedMotion, useReveal } from "../lib/hooks";
import { SectionLabel, SplitWords } from "./Editorial";

const ICONS: Record<string, IconType> = {
  github: SiGithub,
  linkedin: FaLinkedinIn,
};

const TOPICS = ["WEB APP", "MOBILE APP", "LANDING PAGE", "FULL STACK BUILD", "FULL-TIME ROLE"];

const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

type Status = "idle" | "sending" | "sent" | "error";

const Field = ({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) => (
  <label htmlFor={id} className="block">
    <span className="label mb-2 block text-cream/45">{label.toLowerCase()}</span>
    {children}
  </label>
);

const inputCls =
  "w-full border border-line bg-ink-2/60 px-4 py-3 font-body text-sm text-cream outline-none transition-colors duration-300 placeholder:text-cream/25 focus:border-ember/70";

export default function Contact() {
  const headRef = useReveal<HTMLDivElement>();
  const formRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const valid = useMemo(
    () => name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(email) && msg.trim().length > 8,
    [name, email, msg]
  );

  const steps = useMemo(
    () =>
      Number(name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(email)) +
      1 +
      Number(msg.trim().length > 8),
    [name, email, msg]
  );

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!valid || status === "sending") return;
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          name,
          from_name: name,
          email,
          from_email: email,
          reply_to: email,
          to_email: EMAIL,
          topic,
          title: `[${topic}] New project — ${name}`,
          subject: `[${topic}] New project — ${name}`,
          message: msg,
          time: new Date().toISOString(),
        },
        { publicKey: EMAILJS.publicKey }
      );
      setStatus("sent");
      setName("");
      setEmail("");
      setMsg("");
      window.setTimeout(() => setStatus("idle"), 10000);
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const toTop = () => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });

  return (
    <footer
      id="contact"
      className="grid-bg relative z-10 overflow-hidden border-t border-line pb-8 pt-20 sm:pt-24 md:pt-32 lg:pt-36"
    >
      <span
        aria-hidden="true"
        className="display pointer-events-none absolute -bottom-4 left-0 select-none whitespace-nowrap text-[24vw] leading-none text-cream/[0.022] sm:-bottom-8"
      >
        khubaib — khubaib
      </span>

      <div className="wrap relative">
        {/* heading */}
        <div ref={headRef} className="reveal">
          <SectionLabel n="07">say hi anytime</SectionLabel>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6 sm:mt-7 sm:gap-8">
            <h2 className="display t-1 max-w-4xl">
              <SplitWords text="bring me the difficult one." accent={["difficult"]} />
            </h2>
            <div className="flex items-center gap-3 border border-ember/30 bg-ember/[0.07] px-4 py-2.5">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-ember" />
              <span className="label text-ember">available for projects — 2026</span>
            </div>
          </div>
        </div>

        {/* direct line band */}
        <div className="mt-10 border border-line bg-ink/50 sm:mt-12">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <span className="label text-cream/35">direct line</span>
            <button
              onClick={copyEmail}
              data-cursor
              className="label flex items-center gap-2 text-cream/45 transition-colors duration-300 hover:text-ember"
            >
              {copied ? "✓ copied" : "copy address"}
            </button>
          </div>
          <Magnetic strength={0.06} className="block w-full">
            <a
              href={`mailto:${EMAIL}`}
              data-cursor="SAY HI"
              className="mail-band group flex w-full items-center justify-between gap-5 px-5 py-7 sm:px-7 sm:py-9"
            >
              <span className="mail-band-fill" aria-hidden="true" />
              <span className="mail-band-t display min-w-0 break-all text-[clamp(1.25rem,4.4vw,3.1rem)] leading-[1.05] text-cream">
                {EMAIL}
              </span>
              <svg
                viewBox="0 0 24 24"
                className="mail-band-t h-7 w-7 shrink-0 text-ember transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-9 sm:w-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Magnetic>
        </div>

        {/* form + rail */}
        <div ref={formRef} className="reveal mt-4 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <form onSubmit={submit} className="border border-line bg-ink/60 p-5 sm:p-6 md:p-8">
            <div className="mb-7 flex items-center justify-between border-b border-line pb-4">
              <span className="label text-cream/45">~/new-project.brief</span>
              <span className="label flex items-center gap-2.5 text-cream/30">
                <span className="tabular-nums">
                  {String(steps).padStart(2, "0")}/03
                </span>
                <span className="flex gap-1" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={`h-[3px] w-6 transition-colors duration-500 ${
                        i < steps ? "bg-ember" : "bg-line"
                      }`}
                    />
                  ))}
                </span>
              </span>
            </div>

            <p className="label mb-4 flex items-center gap-3 text-ember">
              <span>01</span>
              <span className="h-px w-6 bg-ember/50" />
              <span className="text-cream/45">who's asking</span>
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="YOUR NAME" id="c-name">
                <input
                  id="c-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className={inputCls}
                  required
                />
              </Field>
              <Field label="EMAIL" id="c-email">
                <input
                  id="c-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ada@company.com"
                  className={inputCls}
                  required
                />
              </Field>
            </div>

            <div className="mt-8">
              <p className="label mb-4 flex items-center gap-3 text-ember">
                <span>02</span>
                <span className="h-px w-6 bg-ember/50" />
                <span className="text-cream/45">what's the scope</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    data-cursor
                    onClick={() => setTopic(t)}
                    className={`label border px-3 py-2 transition-all duration-300 ${
                      topic === t
                        ? "border-ember bg-ember text-ink"
                        : "border-line text-cream/55 hover:border-ember/50 hover:text-cream"
                    }`}
                  >
                    {t.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="label mb-4 flex items-center gap-3 text-ember">
                <span>03</span>
                <span className="h-px w-6 bg-ember/50" />
                <span className="text-cream/45">the brief</span>
              </p>
              <Field label="TELL ME EVERYTHING" id="c-msg">
                <textarea
                  id="c-msg"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  rows={5}
                  placeholder="What are you building, the stack you have in mind, timeline and budget — the messier the better."
                  className={`${inputCls} resize-none`}
                  required
                />
              </Field>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <span className="label text-cream/35" role="status" aria-live="polite">
                {status === "sent" ? (
                  <span className="text-ember">✓ brief sent — i'll reply within 24h</span>
                ) : status === "error" ? (
                  <span className="text-ember">
                    couldn't send —{" "}
                    <a href={`mailto:${EMAIL}`} className="underline">
                      email me directly
                    </a>
                  </span>
                ) : (
                  `${msg.length} chars · ${valid ? "ready" : "awaiting input"}`
                )}
              </span>
              <button
                type="submit"
                data-cursor
                disabled={!valid || status === "sending"}
                className={`label group flex items-center gap-3 px-6 py-3.5 transition-all duration-300 ${
                  valid && status !== "sending"
                    ? "bg-ember text-ink hover:bg-ember-soft"
                    : "cursor-not-allowed border border-line text-cream/25"
                }`}
              >
                {status === "sending" ? "sending…" : "send brief"}
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </form>

          {/* rail */}
          <div className="flex flex-col gap-4">
            <div className="dot-matrix flex flex-1 flex-col border border-line bg-ink/55 p-6">
              <p className="label text-ember">how i work</p>
              <p className="mt-4 text-sm leading-relaxed text-cream/60">
                Tell me what you're building and where it's stuck. I'll come back with a
                straight answer on scope, approach and timing — no pitch deck.
              </p>

              <ol className="mt-7 space-y-4">
                {[
                  "you send the brief",
                  "i reply within 24 hours with scope and questions",
                  "we agree the plan and start",
                ].map((s, i) => (
                  <li key={s} className="flex gap-3.5">
                    <span className="label shrink-0 pt-[3px] tabular-nums text-ember/70">
                      0{i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-cream/55">{s}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-auto space-y-px pt-8">
                {[
                  ["RESPONSE", "< 24 HOURS"],
                  ["MODE", "REMOTE / HYBRID"],
                  ["BUILDS", "WEB & MOBILE"],
                  ["BOOKING", "OPEN — 2026"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="spec-row flex items-baseline justify-between gap-4 border-t border-line py-3"
                  >
                    <span className="label text-cream/35">{k.toLowerCase()}</span>
                    <span className="label text-right text-cream/85">{v.toLowerCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* social cards */}
        <div ref={gridRef} className="reveal mt-16">
          <div className="mb-5 flex items-center justify-between border-b border-line pb-3">
            <span className="label text-ember">( elsewhere )</span>
            <span className="label text-cream/30">{socials.length} channels</span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {socials.map((s, i) => {
              const Icon = ICONS[s.key];
              return (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="tech-card group flex items-center gap-4 border border-line bg-ink p-4 md:p-5"
                  style={{ "--brand": s.brand, "--d": `${i * 0.05}s` } as CSSProperties}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line">
                    <Icon className="tech-icon h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="display t-4 text-cream">{s.label.toLowerCase()}</span>
                      <span className="label text-cream/40">{s.handle.toLowerCase()}</span>
                    </span>
                    <span className="label mt-1 block text-cream/35">{s.meta.toLowerCase()}</span>
                  </span>
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-cream/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              );
            })}
          </div>
        </div>

        {/* footer bar */}
        <div className="label mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-cream/40">
          <span>© 2026 muhammad khubaib — designed &amp; built by me</span>
          <Magnetic strength={0.35}>
            <button
              onClick={toTop}
              data-cursor
              className="flex items-center gap-2 text-cream/60 transition-colors hover:text-ember"
              aria-label="Back to top"
            >
              back to top
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
