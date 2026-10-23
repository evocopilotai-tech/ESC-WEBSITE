import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * YouCanScroll — Kinetic word scroller.
 *
 * Uses CSS sticky container with exact measured/consistent pixel heights
 * for smooth scroll-driven kinetic typography.
 */
export default function YouCanScroll({ words = null }) {
  const wrapperRef = useRef(null);
  const itemMeasureRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemHeight, setItemHeight] = useState(72);
  const [isMobile, setIsMobile] = useState(false);

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

  // Responsive device check & measure item height
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (itemMeasureRef.current) {
        const h = itemMeasureRef.current.getBoundingClientRect().height;
        if (h > 0) setItemHeight(h);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Measure initial rendered item height
  useEffect(() => {
    if (itemMeasureRef.current) {
      const h = itemMeasureRef.current.getBoundingClientRect().height;
      if (h > 0) setItemHeight(h);
    }
  }, [isMobile]);

  // Desktop: scroll listener to calculate active word based on wrapper scroll progress
  useEffect(() => {
    if (isMobile) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const wrapper = wrapperRef.current;
          if (wrapper) {
            const rect = wrapper.getBoundingClientRect();
            const windowH = window.innerHeight;
            // The active scroll range starts when the card sticks (rect.top <= (windowH - cardH) / 2 or rect.top <= 80)
            const scrollDistance = -rect.top;
            const maxScroll = rect.height - windowH;

            if (maxScroll > 0) {
              const progress = Math.min(1, Math.max(0, scrollDistance / maxScroll));
              const targetIndex = Math.min(
                wordList.length - 1,
                Math.floor(progress * wordList.length)
              );
              setActiveIndex(targetIndex);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial sync
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, wordList.length]);

  // Mobile: auto-cycle every 1.2s
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % wordList.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isMobile, wordList.length]);

  const Card = (
    <div
      className="w-full bg-[#0E0E0E] text-[#FCFBF8] flex flex-col justify-between border-y border-white/10 select-none py-6 sm:py-10 lg:py-12 px-5 sm:px-12 lg:px-20 shadow-2xl rounded-sm"
      style={{ minHeight: "360px", height: "55vh", maxHeight: "560px" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#EE4326] animate-pulse" />
          <span className="tracking-widest uppercase text-white/80 text-[10px] sm:text-xs">
            EvoCopilot // Kinetic Action Flow
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[#EE4326]/10 text-[#EE4326] border border-[#EE4326]/30">
            {activeIndex + 1} / {wordList.length}
          </span>
          <span className="hidden sm:inline text-white/40 text-[10px] tracking-widest uppercase">
            {isMobile ? "auto-cycling" : "scroll to advance"}
          </span>
        </div>
      </div>

      {/* Kinetic center stage */}
      <div className="my-auto flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 overflow-hidden py-2">
        {/* Static prefix */}
        <span className="text-3xl sm:text-5xl md:text-7xl font-editorial-serif font-normal tracking-tight text-white/40 shrink-0 whitespace-nowrap">
          you can&nbsp;
        </span>

        {/* Sliding word window */}
        <div
          className="relative overflow-hidden border-l-2 border-[#EE4326] pl-3 sm:pl-6 w-full"
          style={{ height: `${itemHeight}px` }}
        >
          <ul
            className="flex flex-col list-none p-0 m-0 transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `translate3d(0, -${activeIndex * itemHeight}px, 0)`,
            }}
          >
            {wordList.map((text, i) => (
              <li
                key={i}
                ref={i === 0 ? itemMeasureRef : null}
                style={{ height: "clamp(2.8rem, 8vw, 5.5rem)" }}
                className={`flex items-center text-3xl sm:text-5xl md:text-7xl font-editorial-serif italic font-normal tracking-tight transition-colors duration-200 whitespace-nowrap leading-none ${
                  i === activeIndex
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#EE4326] via-[#F48A25] to-[#EE4326]"
                    : "text-white/15"
                }`}
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs font-mono">
        <span className="text-white/50 uppercase">BV(DU)COEP PUNE</span>
        <span className="text-[#EE4326] uppercase tracking-widest">
          IDEAS → IMPACT
        </span>
      </div>
    </div>
  );

  if (isMobile) {
    return <div className="w-full">{Card}</div>;
  }

  // Desktop: Controlled wrapper scroll height (~1200px extra scroll instead of 2500px+),
  // perfectly centered sticky card.
  return (
    <div
      ref={wrapperRef}
      style={{ height: "240vh" }}
      className="relative w-full"
    >
      <div className="sticky top-[18vh] w-full z-10 flex items-center justify-center">
        {Card}
      </div>
    </div>
  );
}

