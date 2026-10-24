"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import "./second-draft-text-utils/second-draft-text.css";

type Seg = { text: string; kind: "plain" | "struck" | "final" };
type Props = {
  lead?: string;
  first?: string;
  second?: string;
  last?: string;
  theme?: "paper" | "night";
  motion?: "full" | "reduced";
  className?: string;
  kickerTitle?: string;
};

const wait = (ms: number, sig: { off: boolean }) =>
  new Promise<void>((res, rej) => {
    const t = window.setTimeout(
      () => (sig.off ? rej(new Error("off")) : res()),
      ms,
    );
    if (sig.off) {
      clearTimeout(t);
      rej(new Error("off"));
    }
  });

const pace = (ch: string, prev: string) => {
  let ms = 55 + Math.random() * 55;
  if (prev === " ") ms += 40 + Math.random() * 60;
  if (/[,.—]/.test(prev)) ms += 220;
  if (ch === " ") ms *= 0.7;
  return ms;
};

export function SecondDraftText({
  lead = "We build software that feels",
  first = "fast",
  second = "calm",
  last = "yours",
  theme = "night",
  motion = "full",
  className = "",
  kickerTitle = "CHAPTER MANIFESTO",
}: Props) {
  const [segs, setSegs] = useState<Seg[]>([]);
  const [selected, setSelected] = useState(0);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState(1);
  const [flourish, setFlourish] = useState(false);
  const [done, setDone] = useState(false);
  const [run, setRun] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const sig = useRef({ off: false });

  const finalState = useCallback(
    (): Seg[] => [
      { text: `${lead} `, kind: "plain" },
      { text: second, kind: "struck" },
      { text: " ", kind: "plain" },
      { text: last, kind: "final" },
      { text: ".", kind: "plain" },
    ],
    [lead, second, last],
  );

  useEffect(() => {
    const rm = matchMedia("(prefers-reduced-motion: reduce)");
    if (motion === "reduced" || rm.matches) {
      setSegs(finalState());
      setDraft(3);
      setFlourish(true);
      setDone(true);
      return;
    }
    const s = { off: false };
    sig.current = s;
    setSegs([]);
    setSelected(0);
    setDraft(1);
    setFlourish(false);
    setDone(false);
    let doc: Seg[] = [];
    const push = () => setSegs(doc.map((x) => ({ ...x })));
    const type = async (
      text: string,
      kind: Seg["kind"] = "plain",
      slow = 1,
    ) => {
      setTyping(true);
      if (!doc.length || doc[doc.length - 1].kind !== kind)
        doc.push({ text: "", kind });
      const seg = doc[doc.length - 1];
      for (let i = 0; i < text.length; i++) {
        await wait(
          pace(text[i], i ? text[i - 1] : seg.text.slice(-1) || " ") * slow,
          s,
        );
        seg.text += text[i];
        push();
      }
      setTyping(false);
    };

    const el = rootRef.current;
    let started = false;
    const go = async () => {
      try {
        await wait(500, s);
        await type(`${lead} `);
        await type(first);
        await wait(900, s);
        for (let k = 1; k <= first.length; k++) {
          await wait(70, s);
          setSelected(k);
        }
        await wait(380, s);
        doc[doc.length - 1].text = doc[doc.length - 1].text.slice(
          0,
          -first.length,
        );
        setSelected(0);
        push();
        setDraft(2);
        await wait(650, s);
        doc.push({ text: "", kind: "plain" });
        await type(second, "struck");
        doc[doc.length - 1] = { ...doc[doc.length - 1], kind: "plain" };
        push();
        await wait(1000, s);
        doc[doc.length - 1].kind = "struck";
        push();
        setDraft(3);
        await wait(700, s);
        await type(" ");
        await type(last, "final", 1.7);
        await type(".");
        await wait(250, s);
        setFlourish(true);
        setDone(true);
      } catch {
        /* stopped */
      }
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          started = true;
          go();
        }
      },
      { threshold: 0.3 },
    );
    if (el) io.observe(el);
    return () => {
      s.off = true;
      io.disconnect();
    };
  }, [run, lead, first, second, last, motion, finalState]);

  const out: React.ReactNode[] = [];
  let remaining = selected;
  const parts = segs.map((x) => ({ ...x }));
  parts.forEach((seg, i) => {
    const isLast = i === parts.length - 1;
    const sel = isLast ? Math.min(remaining, seg.text.length) : 0;
    const head = seg.text.slice(0, seg.text.length - sel),
      tail = seg.text.slice(seg.text.length - sel);
    if (seg.kind === "struck") {
      out.push(
        <span key={i} className="sd__struck">
          {seg.text}
          <svg
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M2 13 C 22 10, 40 12, 60 9 S 88 8, 98 6" />
          </svg>
        </span>,
      );
    } else if (seg.kind === "final") {
      out.push(
        <span key={i} className="sd__final">
          {seg.text}
          {flourish && (
            <svg
              viewBox="0 0 120 24"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M3 9 C 30 15, 70 15, 104 8 C 112 6, 117 5, 116 10 C 114 16, 96 18, 84 15" />
            </svg>
          )}
        </span>,
      );
    } else {
      out.push(
        <span key={i}>
          {head}
          {tail && <span className="sd__sel">{tail}</span>}
        </span>,
      );
    }
  });

  return (
    <div
      ref={rootRef}
      className={`sd sd--${theme} ${className}`}
      data-motion={motion}
    >
      <p className="sd__kicker" aria-hidden="true">
        <span>{kickerTitle}</span>
        <span className="sd__draft">Draft {draft} of 3</span>
      </p>
      <h2 className="sd__line">
        <span className="sd__sr">
          {lead} {last}.
        </span>
        <span aria-hidden="true">
          {out}
          <span
            className="sd__caret"
            data-typing={typing || undefined}
            data-done={done || undefined}
          />
        </span>
      </h2>
      <button
        type="button"
        className="sd__replay"
        onClick={() => setRun((r) => r + 1)}
        disabled={!done}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3.5 8a4.5 4.5 0 1 0 1.4-3.3M3.5 2.8v2.6h2.6" />
        </svg>
        Replay
      </button>
    </div>
  );
}

export default SecondDraftText;
