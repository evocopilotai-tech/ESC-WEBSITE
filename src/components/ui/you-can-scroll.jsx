import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

/**
 * YouCanScroll — Pinned kinetic word scroller.
 * Desktop: proper GSAP pin+scrub.
 * Mobile (<768px): simple auto-cycle animation (no pin — avoids mobile Chrome scroll bugs).
 */
export default function YouCanScroll({ words = null }) {
  const wrapperRef = useRef(null);
  const stickyRef  = useRef(null);
  const listRef    = useRef(null);
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

  /* Detect mobile once on mount */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── DESKTOP: GSAP pin + scrub ─────────────────────────────── */
  useEffect(() => {
    if (isMobile) return; // skip on mobile

    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const sticky  = stickyRef.current;
    const list    = listRef.current;
    if (!wrapper || !sticky || !list) return;

    let ctx;
    const raf = requestAnimationFrame(() => {
      const items = list.querySelectorAll("li");
      if (!items.length) return;

      const itemH = items[0].getBoundingClientRect().height;
      if (!itemH) return;

      const totalScroll = (wordList.length - 1) * itemH;
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
  }, [isMobile]);

  /* ── MOBILE: auto-cycle every 1.2s ─────────────────────────── */
  useEffect(() => {
    if (!isMobile) return;
    const t = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % wordList.length);
    }, 1200);
    return () => clearInterval(t);
  }, [isMobile, wordList.length]);

  /* ── Shared inner card UI ───────────────────────────────────── */
  const Card = (
    <div
      ref={stickyRef}
      className="relative w-full h-[70vh] sm:h-[80vh] bg-[#0E0E0E] text-[#FCFBF8] flex flex-col justify-between overflow-hidden border border-white/10 rounded-sm select-none py-8 sm:py-16 px-5 sm:px-12 lg:px-20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
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

      {/* Kinetic center stage */}
      <div className="my-auto flex flex-col sm:flex-row items-start sm:items-center justify-center gap-2 sm:gap-4 py-4 sm:py-10">
        <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-editorial-serif font-normal tracking-tight text-white/50 shrink-0">
          you can&nbsp;
        </h2>

        {/* Word window */}
        <div className="relative h-12 sm:h-20 md:h-28 overflow-hidden flex items-start border-l-2 border-[#EE4326] pl-3 sm:pl-6">
          <ul
            ref={listRef}
            className="flex flex-col list-none p-0 m-0 text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-editorial-serif italic font-normal tracking-tight"
            style={isMobile ? { transform: `translateY(-${activeIndex * 100}%)`, transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)" } : {}}
          >
            {wordList.map((text, i) => {
              const isActive = i === activeIndex;
              return (
                <li
                  key={i}
                  className={`h-12 sm:h-20 md:h-28 flex items-center transition-all duration-300 ${
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

      {/* Bottom bar */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
        <span className="uppercase text-white/60 text-[10px] sm:text-xs">BV(DU)COEP PUNE</span>
        <span className="uppercase tracking-widest text-[#EE4326] text-[10px] sm:text-xs">
          IDEAS &rarr; IMPACT
        </span>
      </div>
    </div>
  );

  /* On mobile: no wrapper height needed; on desktop: wrapper sets scroll height */
  return isMobile ? (
    <div className="w-full">{Card}</div>
  ) : (
    <div ref={wrapperRef} className="relative w-full">
      {Card}
    </div>
  );
}
