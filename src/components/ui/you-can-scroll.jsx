import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * YouCanScroll — Kinetic word scroller.
 *
 * Strategy: CSS `position:sticky` for the card + a scroll event
 * listener to compute which word to highlight.  No GSAP, no ScrollTrigger,
 * no overflow dependency.  Works in every browser / every container.
 *
 * The outer wrapper is made tall enough so the section can be scrolled
 * through all words while the card stays stuck.
 */
export default function YouCanScroll({ words = null }) {
  const wrapperRef  = useRef(null);
  const cardRef     = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
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
  const SCROLL_PER_WORD = 120; // px of scroll per word step
  const totalExtraScroll = wordList.length * SCROLL_PER_WORD;

  /* ── Mobile detection ──────────────────────────────────── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Desktop: scroll listener ──────────────────────────── */
  useEffect(() => {
    if (isMobile) return;

    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      // How far we've scrolled INTO the wrapper past the top of viewport
      const scrolled = -rect.top;
      if (scrolled < 0) return; // haven't reached section yet

      const idx = Math.min(
        wordList.length - 1,
        Math.max(0, Math.floor(scrolled / SCROLL_PER_WORD))
      );
      setActiveIndex(idx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, wordList.length]);

  /* ── Mobile: auto-cycle ────────────────────────────────── */
  useEffect(() => {
    if (!isMobile) return;
    const t = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % wordList.length);
    }, 1100);
    return () => clearInterval(t);
  }, [isMobile, wordList.length]);

  /* ── Shared card UI ────────────────────────────────────── */
  const Card = (
    <div
      ref={cardRef}
      className="w-full bg-[#0E0E0E] text-[#FCFBF8] flex flex-col justify-between border-y border-white/10 select-none py-8 sm:py-14 px-5 sm:px-12 lg:px-20"
      style={{ height: "80vh", minHeight: 340, maxHeight: 680 }}
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
      <div className="my-auto flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-4">
        {/* Static prefix */}
        <span className="text-3xl sm:text-5xl md:text-7xl font-editorial-serif font-normal tracking-tight text-white/40 shrink-0 whitespace-nowrap">
          you can&nbsp;
        </span>

        {/* Sliding word window */}
        <div
          className="relative overflow-hidden border-l-2 border-[#EE4326] pl-3 sm:pl-6"
          style={{ height: "clamp(2.8rem, 10vw, 6.5rem)" }}
        >
          <ul
            className="flex flex-col list-none p-0 m-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              transform: `translateY(calc(-${activeIndex} * clamp(2.8rem, 10vw, 6.5rem)))`,
            }}
          >
            {wordList.map((text, i) => (
              <li
                key={i}
                style={{ height: "clamp(2.8rem, 10vw, 6.5rem)" }}
                className={`flex items-center text-3xl sm:text-5xl md:text-7xl font-editorial-serif italic font-normal tracking-tight transition-colors duration-300 whitespace-nowrap ${
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

  /* Mobile: just render the card normally (auto-cycling, no sticky needed) */
  if (isMobile) {
    return <div className="w-full">{Card}</div>;
  }

  /*
   * Desktop: wrapper is tall enough to scroll through all words.
   * Card is CSS sticky so it stays visible while the section scrolls.
   * No GSAP, no overflow dependency.
   */
  return (
    <div
      ref={wrapperRef}
      style={{ height: `calc(80vh + ${totalExtraScroll}px)` }}
      className="relative w-full"
    >
      {/* Sticky card — sticks to top of viewport while wrapper scrolls */}
      <div className="sticky top-0 w-full" style={{ height: "80vh" }}>
        {Card}
      </div>
    </div>
  );
}
