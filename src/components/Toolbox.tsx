import { Fragment } from "react";
import type { CSSProperties } from "react";
import {
  SiCss,
  SiFirebase,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpencv,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiTensorflow,
  SiTypescript,
  SiHuggingface,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { useReveal } from "../lib/hooks";
import { Aside, SectionLabel, SplitWords } from "./Editorial";

type Tech = { icon: IconType; name: string; meta: string; level: number; brand: string };
type Group = { tag: string; label: string; techs: Tech[] };

const groups: Group[] = [
  {
    tag: "A",
    label: "LANGUAGES",
    techs: [
      { icon: SiPython, name: "Python", meta: "PRIMARY / ML", level: 96, brand: "#5b9bd6" },
      { icon: SiTypescript, name: "TypeScript", meta: "APP / API", level: 92, brand: "#5a9fd4" },
      { icon: SiJavascript, name: "JavaScript", meta: "EVERYWHERE", level: 90, brand: "#f7df1e" },
      { icon: SiHtml5, name: "HTML5", meta: "STRUCTURE", level: 94, brand: "#e44d26" },
      { icon: SiCss, name: "CSS", meta: "STYLE & LAYOUT", level: 92, brand: "#4d9fd6" },
    ],
  },
  {
    tag: "B",
    label: "FRAMEWORKS & RUNTIMES",
    techs: [
      { icon: SiReact, name: "React", meta: "UI LAYER", level: 94, brand: "#61dafb" },
      { icon: SiNextdotjs, name: "Next.js", meta: "META-FRAMEWORK", level: 86, brand: "#f2ece6" },
      { icon: SiNodedotjs, name: "Node.js", meta: "RUNTIME / API", level: 88, brand: "#6bbf59" },
    ],
  },
  {
    tag: "C",
    label: "AI / ML",
    techs: [
      { icon: SiPytorch, name: "PyTorch", meta: "TRAINING CORE", level: 96, brand: "#ee6c4d" },
      { icon: SiHuggingface, name: "Hugging Face", meta: "MODELS / TRANSFORMERS", level: 92, brand: "#ffd21e" },
      { icon: SiTensorflow, name: "TensorFlow", meta: "TRAIN / SERVE", level: 84, brand: "#f9a825" },
      { icon: SiOpencv, name: "OpenCV", meta: "VISION PIPELINES", level: 84, brand: "#7fbf3f" },
      { icon: SiScikitlearn, name: "scikit-learn", meta: "CLASSICS / BASELINES", level: 82, brand: "#f79341" },
    ],
  },
  {
    tag: "D",
    label: "DATABASES",
    techs: [
      { icon: SiPostgresql, name: "PostgreSQL", meta: "RELATIONAL / FEATURE STORE", level: 88, brand: "#6a9fd8" },
      { icon: SiMongodb, name: "MongoDB", meta: "DOCUMENT", level: 84, brand: "#5cc264" },
      { icon: SiMysql, name: "MySQL", meta: "RELATIONAL", level: 80, brand: "#67a8cf" },
      { icon: SiFirebase, name: "Firebase", meta: "AUTH / RTDB / BFF", level: 82, brand: "#ffca28" },
    ],
  },
];

export default function Toolbox() {
  const headRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  let n = 0;

  return (
    <section className="grid-bg relative z-10 border-t border-line bg-ink-2/30 py-20 sm:py-24 md:py-32 lg:py-36">
      <div className="wrap">
        <div
          ref={headRef}
          className="reveal mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20"
        >
          <div>
            <SectionLabel n="06">the toolbox</SectionLabel>
            <h2 className="display t-1 mt-6 sm:mt-7">
              <SplitWords text="full stack, db to dom." accent={["dom"]} />
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-cream/50">
            from the database to the last pixel — the exact toolkit behind the work.{" "}
            <Aside>official marks, honest numbers</Aside>
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {groups.map((g) => (
            <Fragment key={g.label}>
              <div className="col-span-full flex items-center justify-between border-b border-line pb-3 pt-2">
                <span className="label text-ember">
                  ({g.tag.toLowerCase()}) {g.label.toLowerCase()}
                </span>
                <span className="label text-cream/30">
                  {String(g.techs.length).padStart(2, "0")} units
                </span>
              </div>

              {g.techs.map((t) => {
                n += 1;
                const Icon = t.icon;
                return (
                  <div
                    key={t.name}
                    className="reveal"
                    style={{ "--d": `${(n % 4) * 0.08}s` } as CSSProperties}
                  >
                    <div
                      className="tech-card group h-full border border-line bg-ink p-4 md:p-5"
                      style={{ "--brand": t.brand } as CSSProperties}
                    >
                      <div className="flex items-start justify-between">
                        <Icon className="tech-icon text-4xl md:text-[2.6rem]" aria-hidden="true" />
                        <span className="label pt-1 tabular-nums text-cream/40">{t.level}</span>
                      </div>
                      <p className="display t-4 mt-4 break-words text-cream">
                        {t.name.toLowerCase()}
                      </p>
                      <p className="label mt-1 text-cream/40">{t.meta.toLowerCase()}</p>
                      <div className="relative mt-3.5 h-[2px] overflow-hidden bg-line">
                        <span
                          className="bar-fill"
                          style={
                            {
                              "--w": `${t.level}%`,
                              "--d": `${0.15 + (n % 4) * 0.08}s`,
                            } as CSSProperties
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>

        <p className="label mt-8 text-cream/35">
          + vite · jest · playwright · figma · vercel · github actions — ask for the full manifest
        </p>
      </div>
    </section>
  );
}
