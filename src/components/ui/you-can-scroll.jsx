import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

/**
 * YouCanScroll — Pinned kinetic word scroller.
 * "you can [design / prototype / build / ship...]"
 *
 * Fix: reliable itemHeight via ResizeObserver after mount,
 * correct scroll distance, and proper cleanup.
 */
export default function YouCanScroll({ words = null }) {
  const wrapperRef  = useRef(null); // outer spacer that holds the scroll height
  const stickyRef   = useRef(null); // the visually sticky card
  const listRef     = useRef(null); // the <ul> being translated
  const [activeIndex, setActiveIndex] = useState(0);

  const defaultWords = [
    "design.",
    "prototype.",
    "solve.",
    "build.",
    "develop.",
    "debug.",
    "learn.",
    "cook.",
    "ship.",
    "prompt.",
    "collaborate.",
    "create.",
    "inspire.",
    "innovate.",
    "test.",
    "optimize.",
    "teach.",
    "visualize.",
    "transform.",
    "scale.",
    "deploy SaaS.",
  ];

  const wordList = words || defaultWords;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const sticky  = stickyRef.current;
    const list    = listRef.current;
    if (!wrapper || !sticky || !list) return;

    // Wait one tick so layout is painted
    let ctx;
    const raf = requestAnimationFrame(() => {
      const items = list.querySelectorAll("li");
      if (!items.length) return;

      // Measure real rendered height of one item
      const itemH = items[0].getBoundingClientRect().height;
      if (!itemH) return;

      const totalScroll = (wordList.length - 1) * itemH;

      // Set the wrapper tall enough to hold the scroll
      wrapper.style.height = `calc(100vh + ${totalScroll}px)`;

      ctx = gsap.context(() => {
        gsap.to(list, {
          y: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: `+=${totalScroll}`,
            pin: sticky,
            pinSpacing: false,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                wordList.length - 1,
                Math.floor(self.progress * wordList.length)
              );
              setActiveIndex(idx);
            },
          },
        });
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, []); // run once on mount

  return (
    /* Outer wrapper — sets the scroll height; the sticky card sits inside */
    <div ref={wrapperRef} className="relative w-full">
      <div
        ref={stickyRef}
        className="relative w-full h-[85vh] sm:h-[90vh] bg-[#0E0E0E] text-[#FCFBF8] flex flex-col justify-between overflow-hidden border border-white/10 rounded-sm select-none py-10 sm:py-16 px-6 sm:px-12 lg:px-20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Top Architecture Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 text-xs font-mono text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EE4326] animate-pulse" />
            <span className="tracking-widest uppercase text-white/80">
              EvoCopilot // Kinetic Action Flow
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-xs bg-[#EE4326]/10 text-[#EE4326] border border-[#EE4326]/30">
              {activeIndex + 1} / {wordList.length}
            </span>
            <span className="tracking-widest uppercase hidden sm:inline text-white/40">
              Scroll to Advance
            </span>
          </div>
        </div>

        {/* Main Kinetic Centre Stage */}
        <div className="my-auto flex flex-col md:flex-row items-baseline md:items-center justify-center gap-3 sm:gap-6 py-6 sm:py-10">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial-serif font-normal tracking-tight text-white/50 shrink-0">
            you can&nbsp;
          </h2>

          {/* Masked single-line word window */}
          <div className="relative h-16 sm:h-24 md:h-28 overflow-hidden flex items-start border-l-2 border-[#EE4326] pl-4 sm:pl-6">
            <ul
              ref={listRef}
              className="flex flex-col list-none p-0 m-0 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial-serif italic font-normal tracking-tight"
            >
              {wordList.map((text, i) => {
                const isActive = i === activeIndex;
                return (
                  <li
                    key={i}
                    className={`h-16 sm:h-24 md:h-28 flex items-center transition-all duration-300 ${
                      isActive
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-[#EE4326] via-[#F48A25] to-[#EE4326] font-semibold scale-105"
                        : "text-white/20 scale-95"
                    }`}
                  >
                    {text}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Telemetry Bar */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
          <span className="uppercase text-white/60">BV(DU)COEP PUNE CAMPUS</span>
          <span className="uppercase tracking-widest text-[#EE4326]">
            IDEAS &rarr; INTELLIGENCE &rarr; IMPACT
          </span>
        </div>
      </div>
    </div>
  );
}
