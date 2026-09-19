import { marqueeItems } from "../data";

const Spark = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-3.5 w-3.5 shrink-0 text-ember md:h-4 md:w-4"
    aria-hidden="true"
  >
    <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
  </svg>
);

export default function Marquee({
  items = marqueeItems,
  reverse = false,
}: {
  items?: string[];
  reverse?: boolean;
}) {
  return (
    <div
      className="marquee relative z-10 overflow-hidden border-y border-line bg-ink-2/60 py-3.5 sm:py-4 md:py-5"
      aria-hidden="true"
    >
      <div className={`marquee-track ${reverse ? "marquee-track-reverse" : ""}`}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {items.map((t, i) => (
              <span
                key={`${t}-${dup}`}
                className="flex items-center gap-4 pr-4 sm:gap-6 sm:pr-6 md:gap-10 md:pr-10"
              >
                <span
                  className={`display whitespace-nowrap text-xl sm:text-2xl md:text-4xl ${
                    i % 2 ? "stroke-text" : "text-cream"
                  }`}
                >
                  {t.toLowerCase()}
                </span>
                <Spark />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
