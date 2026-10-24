"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Pane } from "tweakpane";

export default function ScrollAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const config = {
      theme: "dark",
      animate: true,
      snap: true,
      start: gsap.utils.random(0, 100, 1),
      end: gsap.utils.random(900, 1000, 1),
      scroll: true,
      debug: false,
    };

    let ctrl;
    try {
      ctrl = new Pane({ title: "Config", expanded: false });
    } catch {
      /* pane initialization fallback */
    }

    let items, scrollerScrub, dimmerScrub, chromaEntry, chromaExit;

    const update = () => {
      document.documentElement.dataset.theme = config.theme;
      document.documentElement.dataset.syncScrollbar = config.scroll;
      document.documentElement.dataset.animate = config.animate;
      document.documentElement.dataset.snap = config.snap;
      document.documentElement.dataset.debug = config.debug;
      document.documentElement.style.setProperty("--start", config.start);
      document.documentElement.style.setProperty("--hue", config.start);
      document.documentElement.style.setProperty("--end", config.end);

      if (!config.animate) {
        chromaEntry?.scrollTrigger?.disable(true, false);
        chromaExit?.scrollTrigger?.disable(true, false);
        dimmerScrub?.disable(true, false);
        scrollerScrub?.disable(true, false);
        if (items) gsap.set(items, { opacity: 1 });
        gsap.set(document.documentElement, { "--chroma": 0 });
      } else {
        if (items) gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) });
        dimmerScrub?.enable(true, true);
        scrollerScrub?.enable(true, true);
        chromaEntry?.scrollTrigger?.enable(true, true);
        chromaExit?.scrollTrigger?.enable(true, true);
      }
    };

    if (ctrl) {
      ctrl.addBinding(config, "animate", { label: "Animate" });
      ctrl.addBinding(config, "snap", { label: "Snap" });
      ctrl.addBinding(config, "start", { label: "Hue Start", min: 0, max: 1000, step: 1 });
      ctrl.addBinding(config, "end", { label: "Hue End", min: 0, max: 1000, step: 1 });
      ctrl.addBinding(config, "scroll", { label: "Scrollbar" });
      ctrl.addBinding(config, "debug", { label: "Debug" });
      ctrl.addBinding(config, "theme", {
        label: "Theme",
        options: { System: "system", Light: "light", Dark: "dark" },
      });
      ctrl.on("change", update);
    }

    if (containerRef.current) {
      items = gsap.utils.toArray(containerRef.current.querySelectorAll("ul li"));
      if (items.length > 0) {
        gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) });

        const dimmer = gsap.timeline()
          .to(items.slice(1), { opacity: 1, stagger: 0.5 })
          .to(items.slice(0, items.length - 1), { opacity: 0.2, stagger: 0.5 }, 0);

        dimmerScrub = ScrollTrigger.create({
          trigger: items[0],
          endTrigger: items[items.length - 1],
          start: "center center",
          end: "center center",
          animation: dimmer,
          scrub: 0.2,
        });

        const scroller = gsap.timeline().fromTo(
          document.documentElement,
          { "--hue": config.start },
          { "--hue": config.end, ease: "none" }
        );

        scrollerScrub = ScrollTrigger.create({
          trigger: items[0],
          endTrigger: items[items.length - 1],
          start: "center center",
          end: "center center",
          animation: scroller,
          scrub: 0.2,
        });

        chromaEntry = gsap.fromTo(
          document.documentElement,
          { "--chroma": 0 },
          {
            "--chroma": 0.3,
            ease: "none",
            scrollTrigger: {
              scrub: 0.2,
              trigger: items[0],
              start: "center center+=40",
              end: "center center",
            },
          }
        );

        chromaExit = gsap.fromTo(
          document.documentElement,
          { "--chroma": 0.3 },
          {
            "--chroma": 0,
            ease: "none",
            scrollTrigger: {
              scrub: 0.2,
              trigger: items[items.length - 2],
              start: "center center",
              end: "center center-=40",
            },
          }
        );
      }
    }

    update();

    return () => {
      ctrl?.dispose();
      dimmerScrub?.kill();
      scrollerScrub?.kill();
      chromaEntry?.kill();
      chromaExit?.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full text-[#FCFBF8] select-none py-12">
      <header className="mb-10 text-center">
        <h1
          className="font-editorial-serif font-normal text-4xl sm:text-6xl md:text-7xl tracking-tight text-white/90 leading-tight"
        >
          you can<br />scroll.
        </h1>
      </header>
      <main className="max-w-4xl mx-auto px-4">
        <section className="my-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-editorial-serif text-white/40 mb-6">
            <span aria-hidden="true">you can&nbsp;</span>
            <span className="sr-only">you can ship things.</span>
          </h2>
          <ul
            aria-hidden="true"
            className="flex flex-col items-center gap-3 list-none p-0 m-0"
            style={{ "--count": 22 }}
          >
            {[
              "design.","prototype.","solve.","build.","develop.","debug.","learn.","cook.","ship.","prompt.",
              "collaborate.","create.","inspire.","follow.","innovate.","test.","optimize.","teach.","visualize.",
              "transform.","scale.","do it."
            ].map((text, i) => (
              <li
                key={i}
                style={{ "--i": i }}
                className="text-3xl sm:text-5xl md:text-6xl font-editorial-serif italic font-normal tracking-tight text-white transition-opacity duration-300"
              >
                {text}
              </li>
            ))}
          </ul>
        </section>
        <section className="text-center my-12">
          <h2 className="text-3xl sm:text-5xl font-editorial-serif italic text-[#EE4326]">fin.</h2>
        </section>
      </main>
      <footer className="text-center font-mono text-xs text-white/40 border-t border-white/10 pt-6">
        ʕ⊙ᴥ⊙ʔ jh3yy &copy; 2024
      </footer>
    </div>
  );
}
