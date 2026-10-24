"use client";

// A portfolio index built as a wheel you turn.
import * as React from "react";
import { cn } from "@/lib/utils";

/* Geometry */
const CARD_H = 0.42;      // taller card on mobile
const CARD_MAX_W = 0.72;  // allow wider card on mobile
const CARD_RATIO = 1.45;
const STEP = 40;
const DRUM = 2.22;
const LENS = 2.7;
const RING_R = 1.14;
const BOW = 1.82;
const TITLE = 0.124;
const INDEX = 0.04;
const CULL = 1.6;

const WHEEL_UNITS = 700;  // easier to scroll on mobile
const DRAG_UNITS = 280;   // more responsive drag on mobile
const SETTLE = 140;
const EASE = 0.12;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const lerp = (a, b, t) => a + (b - a) * t;

const rad = (deg) => (deg * Math.PI) / 180;

const bowAt = (drumDeg, bow) => -bow * (1 - Math.cos(rad(drumDeg)));

function place(ringDeg, drumDeg, ringR, drumR, bow, m) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "Chapter Visuals",
  action = "View",
  className,
  onSelectImage,
  ...props
}) {
  const stageRef = React.useRef(null);
  const wheelRef = React.useRef(null);
  const cardRefs = React.useRef([]);
  const labelRef = React.useRef(null);
  const titleRef = React.useRef(null);

  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => {
      // Fallback minimum dimensions if hidden or during render
      const w = el.clientWidth || window.innerWidth || 1200;
      const h = el.clientHeight || 700;
      setStage({ w, h });
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const stageH = h || 700;
    const stageW = w || 1200;
    const cardW = Math.min(stageH * CARD_H * CARD_RATIO, stageW * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    };
  }, [stage, count]);

  // One pass per frame: ease toward the target, then write transforms
  React.useEffect(() => {
    if (!stage.h && typeof window === "undefined") return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last],
  );

  const settling = React.useRef(0);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (event) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      if (next > 0 && next < last + 1) event.preventDefault();
      to(next);
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => to(Math.round(target.current)),
        SETTLE,
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

  const drag = React.useRef(null);

  return (
    <section
      aria-label={label}
      className={cn(
        "relative h-[65vh] sm:h-[75vh] md:h-[80vh] min-h-[420px] sm:min-h-[500px] max-h-[850px] w-full overflow-hidden select-none bg-[#0A0A0A] text-white touch-pan-y",
        className,
      )}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-white absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          to(target.current + (drag.current - event.clientY) / DRAG_UNITS);
          drag.current = event.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
          if (target.current > 1) to(Math.round(target.current));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") to(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp") to(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => (
            <div
              key={item.title + i}
              id={`works-wheel-${i}`}
              role="option"
              aria-selected={i === active}
              onClick={() => onSelectImage?.(item, i)}
              ref={(node) => {
                cardRefs.current[i] = node;
              }}
              className="group absolute [backface-visibility:hidden] cursor-pointer"
              style={{
                width: metrics.cardW,
                height: metrics.cardH,
                marginLeft: -metrics.cardW / 2,
                marginTop: -metrics.cardH / 2,
              }}
            >
              <span className="relative block size-full overflow-hidden rounded-xl border border-white/15 bg-[#141414] shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:border-[#EE4326]/60 group-hover:shadow-[0_0_30px_rgba(238,67,38,0.3)]">
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                {/* Badge caption on card */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-white/90 truncate pr-2">
                    {item.tag ? String(item.tag).replace(' // ', ' · ') : `Archive 0${i + 1}`}
                  </span>
                  {action && (
                    <span className="bg-[#EE4326] text-white font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
                        <path
                          d="M3 9 9 3M4 3h5v5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {action}
                    </span>
                  )}
                </div>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Ring title and front-card title trade places across transition */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 grid place-items-center tracking-tight font-editorial-serif font-light text-white/80"
        style={{ fontSize: Math.max(metrics.title * 0.9, 28) }}
      >
        <div className="flex flex-col items-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EE4326] via-[#F48A25] to-[#EE4326] font-editorial-serif">
            {label}
          </span>
        </div>
      </div>

      <div
        ref={titleRef}
        className="pointer-events-none absolute top-1/2 left-[6%] sm:left-[8%] -translate-y-1/2 tracking-tight opacity-0 max-w-sm sm:max-w-md z-10"
        style={{ fontSize: Math.max(metrics.title * 0.65, 20) }}
      >
        <span className="font-mono text-xs text-[#EE4326] uppercase tracking-widest block mb-2 font-semibold">
          {items[active]?.tag ? String(items[active]?.tag).replace(' // ', ' · ') : `Archive Frame 0${active + 1}`}
        </span>
        <h3 className="font-editorial-serif font-normal text-white leading-tight">
          {items[active]?.title}
        </h3>
        {items[active]?.caption && (
          <p className="font-editorial-sans text-xs text-white/60 mt-3 line-clamp-3 leading-relaxed">
            {items[active]?.caption}
          </p>
        )}
      </div>


    </section>
  );
}

export default WorksWheel;
