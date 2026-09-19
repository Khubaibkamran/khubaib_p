import { useCallback, useEffect, useRef, useState } from "react";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Works from "./components/Works";
import Services from "./components/Services";
import About from "./components/About";
import Career from "./components/Career";
import Stack from "./components/Stack";
import Toolbox from "./components/Toolbox";
import SocialDock from "./components/SocialDock";
import Contact from "./components/Contact";
import { useLenis } from "./lib/useLenis";

const ScrollProgress = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const s =
        window.scrollY /
        Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (ref.current) ref.current.style.transform = `scaleX(${s})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[75] h-[2px] origin-left bg-ember"
      style={{ transform: "scaleX(0)" }}
    />
  );
};

export default function App() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);
  useLenis();

  return (
    <div className="bg-ink font-body text-cream antialiased">
      <Preloader onDone={onDone} />
      <Cursor />
      <div className="ambient" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Nav />
      <SocialDock />
      <main>
        <Hero start={ready} />
        <Marquee />
        <Works />
        <Services />
        <About />
        <Career />
        <Stack />
        <Toolbox />
        <Marquee
          reverse
          items={[
            "available for projects",
            "frontend & full stack",
            "let's talk",
            "remote / worldwide",
          ]}
        />
      </main>
      <Contact />
    </div>
  );
}
