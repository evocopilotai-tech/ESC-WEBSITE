import React, { useEffect, useRef, useState } from "react";

/**
 * YouCanScroll — Kinetic word showcase.
 *
 * Designed to fit seamlessly in the page flow with ZERO artificial scroll void / dead space.
 * Features:
 * - Fluid auto-advancing kinetic cycle (like an editorial ticker / kinetic type machine)
 * - Interactive hover / scrub / touch controls so users can pause or scrub
 * - Prev / Next micro-buttons
 * - Direct click-to-word jumping
 * - Crisp, responsive typography that never clips or leaves empty gaps.
 */
export default function YouCanScroll({ words = null }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemHeight, setItemHeight] = useState(72);
  const itemMeasureRef = useRef(null);

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

  // Measure single item height accurately
  useEffect(() => {
    const measure = () => {
      if (itemMeasureRef.current) {
        const h = itemMeasureRef.current.getBoundingClientRect().height;
        if (h > 0) setItemHeight(h);
      }
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Smooth, steady kinetic auto-cycling (stops when hovered or focused)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % wordList.length);
    }, 1400);
    return () => clearInterval(timer);
  }, [isPaused, wordList.length]);

  return (
    <div
      className="w-full bg-[#0E0E0E] text-[#FCFBF8] border-y border-white/10 select-none py-8 sm:py-12 lg:py-14 px-5 sm:px-12 lg:px-20 shadow-2xl relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Background ambient glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#EE4326]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#F48A25]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between pb-4 sm:pb-6 border-b border-white/10 font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#EE4326] animate-pulse" />
          <span className="tracking-widest uppercase text-white/80 text-[10px] sm:text-xs">
            EvoCopilot // Kinetic Action Flow
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Progress counter */}
          <span className="text-[10px] uppercase font-mono px-2.5 py-1 bg-[#EE4326]/10 text-[#EE4326] border border-[#EE4326]/30 rounded-xs">
            {String(activeIndex + 1).padStart(2, '0')} / {String(wordList.length).padStart(2, '0')}
          </span>
          {/* Pause / Play badge */}
          <span className="hidden sm:inline-flex items-center gap-1.5 text-white/40 text-[10px] tracking-widest uppercase">
            <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-[#EE4326]'}`} />
            {isPaused ? "PAUSED // HOVER" : "AUTOPLAYING"}
          </span>
        </div>
      </div>

      {/* Kinetic center stage */}
      <div className="relative z-10 my-8 sm:my-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 overflow-hidden py-1 w-full md:w-auto">
          {/* Static prefix */}
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial-serif font-normal tracking-tight text-white/40 shrink-0 whitespace-nowrap">
            you can&nbsp;
          </span>

          {/* Sliding word window */}
          <div
            className="relative overflow-hidden border-l-2 border-[#EE4326] pl-3 sm:pl-6 w-full"
            style={{ height: `${itemHeight}px` }}
          >
            <ul
              className="flex flex-col list-none p-0 m-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
              style={{
                transform: `translate3d(0, -${activeIndex * itemHeight}px, 0)`,
              }}
            >
              {wordList.map((text, i) => (
                <li
                  key={i}
                  ref={i === 0 ? itemMeasureRef : null}
                  style={{ height: "clamp(3rem, 9vw, 6rem)" }}
                  className={`flex items-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial-serif italic font-normal tracking-tight transition-all duration-300 whitespace-nowrap leading-none ${
                    i === activeIndex
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[#EE4326] via-[#F48A25] to-[#EE4326] opacity-100 scale-100"
                      : "text-white/10 opacity-30 scale-95"
                  }`}
                >
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Micro-interaction controls: Next/Prev buttons + interactive scrubber */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center font-mono">
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev - 1 + wordList.length) % wordList.length)}
            aria-label="Previous word"
            className="p-2 sm:p-2.5 rounded-sm border border-white/15 bg-white/5 hover:bg-[#EE4326] hover:border-[#EE4326] text-white transition-colors cursor-pointer text-xs"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev + 1) % wordList.length)}
            aria-label="Next word"
            className="p-2 sm:p-2.5 rounded-sm border border-white/15 bg-white/5 hover:bg-[#EE4326] hover:border-[#EE4326] text-white transition-colors cursor-pointer text-xs"
          >
            →
          </button>
        </div>
      </div>

      {/* Interactive pill tags to jump directly to any word */}
      <div className="relative z-10 pt-4 pb-2 border-t border-white/5 flex flex-wrap gap-1.5 sm:gap-2">
        {wordList.slice(0, 12).map((word, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`font-mono text-[9px] sm:text-[10px] uppercase px-2 py-0.5 rounded-xs transition-all cursor-pointer ${
              i === activeIndex
                ? "bg-[#EE4326] text-white font-semibold shadow-sm"
                : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10 border border-white/5"
            }`}
          >
            {word.replace('.', '')}
          </button>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 pt-4 mt-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs font-mono">
        <span className="text-white/50 uppercase">BV(DU)COEP PUNE</span>
        <span className="text-[#EE4326] uppercase tracking-widest font-medium">
          IDEAS → IMPACT
        </span>
      </div>
    </div>
  );
}


