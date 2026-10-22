import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

/**
 * YouCanScroll — Pinned kinetic word scroller.
 *
 * Desktop (≥768px): GSAP ScrollTrigger pin + scrub.
 *   - Requires the parent section to have NO overflow:hidden/clip.
 *
 * Mobile (<768px): CSS transform auto-cycle (no GSAP pin needed).
 *   - Avoids mobile Chrome scroll-hijack bugs entirely.
 */
export default function YouCanScroll({ words = null }) {
  const wrapperRef = useRef(null);
  const stickyRef  = useRef(null);
  const listRef    = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

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

  /* ── Detect mobile on resize ─────────────────────────── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── DESKTOP: GSAP pin + scrub ───────────────────────── */
  useEffect(() => {
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const sticky  = stickyRef.current;
    const list    = listRef.current;
    if (!wrapper || !sticky || !list) return;

    let ctx;
    // Use rAF to ensure DOM has painted and measurements are accurate
    const rafId = requestAnimationFrame(() => {
      const items = list.querySelectorAll("li");
      if (!items.length) return;

      const itemH = sticky.offsetHeight / wordList.length;
      const totalScroll = (wordList.length - 1) * sticky.offsetHeight;

      // Set wrapper height so the section is tall enough to scroll through all words
      wrapper.style.height = `calc(100vh + ${totalScroll}px)`;

      ctx = gsap.context(() => {
        gsap.to(list, {
          y: () => -(sticky.offsetHeight * (wordList.length - 1)),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${sticky.offsetHeight * (wordList.length - 1)}`,
            pin: sticky,
            pinSpacing: false,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const idx = Math.min(
                wordList.length - 1,
                Math.floor(self.progress * wordList.length)
              );
              setActiveIndex(idx);
            },
          },
        });
      }, wrapper);
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, [isMobile, wordList.length]);

  /* ── MOBILE: auto-cycle every 1.1s ──────────────────── */
  useEffect(() => {
    if (!isMobile) return;
    const t = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % wordList.length);
    }, 1100);
    return () => clearInterval(t);
  }, [isMobile, wordList.length]);

  /* ── Card UI ─────────────────────────────────────────── */
  const cardContent = (
    <div
      ref={stickyRef}
      className="relative w-full bg-[#0E0E0E] text-[#FCFBF8] flex flex-col justify-between overflow-hidden border-y border-white/10 select-none py-8 sm:py-14 px-5 sm:px-12 lg:px-20"
      style={{ height: "80vh", minHeight: 360, maxHeight: 700 }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-white/50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#EE4326] animate-pulse" />
          <span className="tracking-widest uppercase text-white/80 text-[10px] sm:text-xs">
            EvoCopilot // Kinetic Action Flow
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-xs bg-[#EE4326]/10 text-[#EE4326] border border-[#EE4326]/30">
            {activeIndex + 1} / {wordList.length}
          </span>
          <span className="tracking-widest uppercase hidden sm:inline text-white/40 text-[10px]">
            {isMobile ? "Auto-cycling" : "Scroll to Advance"}
          </span>
        </div>
      </div>

      {/* Kinetic stage */}
      <div className="my-auto flex flex-col sm:flex-row items-start sm:items-center justify-center gap-0 sm:gap-4">
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-editorial-serif font-normal tracking-tight text-white/50 shrink-0">
          you can&nbsp;
        </h2>

        {/* Sliding word window */}
        <div
          className="relative overflow-hidden flex items-start border-l-2 border-[#EE4326] pl-3 sm:pl-6"
          style={{ height: "clamp(3rem, 10vw, 7rem)" }}
        >
          <ul
            ref={listRef}
            className="flex flex-col list-none p-0 m-0"
            style={
              isMobile
                ? {
                    transform: `translateY(-${activeIndex * 100}%)`,
                    transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                  }
                : {}
            }
          >
            {wordList.map((text, i) => {
              const isActive = i === activeIndex;
              return (
                <li
                  key={i}
                  style={{ height: "clamp(3rem, 10vw, 7rem)" }}
                  className={`flex items-center text-3xl sm:text-5xl md:text-7xl font-editorial-serif italic font-normal tracking-tight transition-all duration-300 ${
                    isActive
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[#EE4326] via-[#F48A25] to-[#EE4326]"
                      : "text-white/15"
                  }`}
                >
                  {text}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
        <span className="uppercase text-white/60 text-[10px] sm:text-xs">BV(DU)COEP PUNE</span>
        <span className="uppercase tracking-widest text-[#EE4326] text-[10px] sm:text-xs">
          IDEAS → IMPACT
        </span>
      </div>
    </div>
  );

  /* Mobile: no wrapper needed. Desktop: wrapper sets scroll height for GSAP */
  if (isMobile) {
    return <div className="w-full">{cardContent}</div>;
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      {cardContent}
    </div>
  );
}
