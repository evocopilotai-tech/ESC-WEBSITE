import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Terminal, Cpu, GitFork, Compass, ArrowUpRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Motive = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Controlled entrance trigger for the section header
      gsap.from('.motive-header', {
        scrollTrigger: {
          trigger: '.motive-header',
          start: 'top 85%',
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Subtle parallax on the pillar separators
      gsap.utils.toArray('.motive-pillar').forEach((pillar) => {
        gsap.from(pillar, {
          scrollTrigger: {
            trigger: pillar,
            start: 'top 88%',
          },
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: 'power2.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="motive"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-36 bg-[#0A0A0A] text-[#FCFBF8] border-b border-white/10 overflow-hidden"
    >
      {/* Editorial Vertical Architectural Guide Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="h-full w-full max-w-7xl mx-auto border-x border-white/5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Oversized Section Index & Eyebrow */}
        <div className="motive-header flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-16 sm:mb-24 border-b border-white/10">
          <div className="flex items-center gap-4">
            <span className="font-editorial-serif text-5xl sm:text-6xl text-white font-normal leading-none select-none">
              02
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#EE4326] font-semibold">
                OUR MOTIVE // GUIDING ETHOS
              </span>
              <span className="text-xs text-white/50 tracking-wider uppercase font-medium">
                Four Pillars of the Student Chapter
              </span>
            </div>
          </div>

          <div className="mt-4 sm:mt-0 font-mono text-[11px] text-white/40">
            ETHOS // CORE PRINCIPLES
          </div>
        </div>

        {/* ----------------- PILLAR 1: Learn by Building (Horizontal Technical Banner) ----------------- */}
        <div className="motive-pillar mb-20 sm:mb-28 border-b border-white/10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="font-editorial-serif text-4xl sm:text-5xl text-[#EE4326] font-normal">
                  01
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                  Pillar One · The Constructive Imperative
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-editorial-serif font-normal text-white leading-tight">
                Learn by <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#EE4326] via-[#F48A25] to-[#EE4326]">Building</span>.
              </h3>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Passive tutorials do not forge engineers. At EvoCopilot BV(DU)COEP Pune, deep understanding is born when compilers throw errors, tests fail, and algorithms are debugged at 1 AM. We prioritize working prototypes and reproducible codebases over superficial certifications.
              </p>

              <div className="flex items-center gap-4 pt-2 text-xs font-mono text-white/80">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#EE4326]" />
                  <span>Hands-on Code</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#EE4326]" />
                  <span>Iterative Failure</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#EE4326]" />
                  <span>Working Deployments</span>
                </div>
              </div>
            </div>

            {/* Micro-Artifact: Interactive Developer Shell Preview */}
            <div className="lg:col-span-6">
              <div className="bg-[#141414] text-[#FCFBF8] border border-white/10 p-4 sm:p-5 rounded-xs font-mono text-xs shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-[11px] text-white/50">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EE4326]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F48A25]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  </div>
                  <span>esc-dev // terminal</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <p className="text-white/40">$ git clone chapter/autonomous-evals</p>
                  <p className="text-[#F48A25]">&#10140; compiling agent orchestration pipeline...</p>
                  <p className="text-white/80">[INFO] Initializing token context (32k window)</p>
                  <p className="text-[#EE4326] font-medium">&#10003; 14 test suites passed in 1.42s</p>
                  <p className="text-white/40">$ ./deploy --target BV(DU)COEP-cluster</p>
                  <p className="text-white flex items-center gap-1">
                    <span className="animate-pulse text-[#EE4326]">&#9646;</span>
                    <span className="text-white/50">ready for live campus inference</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- PILLAR 2: Explore Artificial Intelligence (Asymmetric 7/5 Layout) ----------------- */}
        <div className="motive-pillar mb-20 sm:mb-28 border-b border-white/10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="font-editorial-serif text-4xl sm:text-5xl text-[#EE4326] font-normal">
                  02
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                  Pillar Two · Theoretical Rigor & Frontier Models
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-editorial-serif font-normal text-white leading-tight">
                Explore <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#EE4326] via-[#F48A25] to-[#EE4326]">Artificial Intelligence</span>.
              </h3>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Rather than treating AI as a magical black box, our chapter dives under the hood. We dissect attention mechanisms, fine-tuning dynamics, neural embeddings, and reasoning scaffolds. From lightweight on-device models to enterprise developer copilots, we unpack how intelligence is engineered.
              </p>

              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-[11px]">
                <div className="p-3 bg-[#141414] border border-white/10">
                  <div className="text-[#EE4326] font-semibold">// 01</div>
                  <div className="text-white font-medium mt-1">Agent Workflows</div>
                </div>
                <div className="p-3 bg-[#141414] border border-white/10">
                  <div className="text-[#EE4326] font-semibold">// 02</div>
                  <div className="text-white font-medium mt-1">Vector Indices</div>
                </div>
                <div className="p-3 bg-[#141414] border border-white/10">
                  <div className="text-[#EE4326] font-semibold">// 03</div>
                  <div className="text-white font-medium mt-1">Evals & Metrics</div>
                </div>
              </div>
            </div>

            {/* Geometric Vector Topology Micro-Card */}
            <div className="lg:col-span-5 bg-[#141414] border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between text-[11px] font-mono text-white/50 border-b border-white/10 pb-2">
                <span>TENSOR MATRIX // EMBEDDING</span>
                <span className="text-[#EE4326] font-semibold">DIM: 1536</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Students benchmark semantic cosine similarities, test quantization schemes (4-bit vs 8-bit), and observe latency tradeoffs across consumer GPUs.
              </p>
              <div className="h-20 bg-[#1C1C1C] border border-white/10 flex items-center justify-center font-mono text-[11px] text-white/70">
                W_q &bull; W_k^T / &radic;d_k &rarr; Softmax(Attn)
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- PILLAR 3: Collaborate Without Limits (Reversed Asymmetry) ----------------- */}
        <div className="motive-pillar mb-20 sm:mb-28 border-b border-white/10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Visual Column on Left */}
            <div className="lg:col-span-5 order-2 lg:order-1 bg-[#141414] border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between text-[11px] font-mono text-white/50 border-b border-white/10 pb-2">
                <span>OPEN FORUM // NO GATEKEEPING</span>
                <span className="text-white">BV(DU)COEP PEERS</span>
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-[#1A1A1A] border border-white/10 text-xs">
                  <div className="font-semibold text-white">Freshmen & Sophomores</div>
                  <div className="text-[11px] text-white/60 mt-0.5">Learn foundational tooling & code etiquette</div>
                </div>
                <div className="p-3 bg-[#1A1A1A] border border-white/10 text-xs">
                  <div className="font-semibold text-white">Juniors & Seniors</div>
                  <div className="text-[11px] text-white/60 mt-0.5">Lead project architecture, reviews & workshops</div>
                </div>
              </div>
            </div>

            {/* Narrative on Right */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="font-editorial-serif text-4xl sm:text-5xl text-[#EE4326] font-normal">
                  03
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                  Pillar Three · Radical Transparency
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-editorial-serif font-normal text-white leading-tight">
                Collaborate <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#EE4326] via-[#F48A25] to-[#EE4326]">Without Limits</span>.
              </h3>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Great software is not built in isolation. We foster an inclusive, cross-disciplinary space where first-year coders work alongside experienced developers. There is no hierarchy in problem solving: good code speaks for itself, and respectful constructive review elevates everyone.
              </p>
            </div>
          </div>
        </div>

        {/* ----------------- PILLAR 4: Create Real-World Impact (High-Contrast Anchor) ----------------- */}
        <div className="motive-pillar">
          <div className="bg-[#141414] border border-white/10 p-8 sm:p-12 lg:p-16 relative">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10 mb-8">
              <div className="flex items-baseline gap-3">
                <span className="font-editorial-serif text-4xl sm:text-6xl text-[#EE4326] font-normal">
                  04
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                  Pillar Four · Pragmatic Utility
                </span>
              </div>

              <div className="font-mono text-xs text-white">
                PRODUCTION &bull; UTILITY &bull; OPEN LABS
              </div>
            </div>

            <div className="max-w-3xl space-y-4">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif font-normal text-white leading-tight">
                Create <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#EE4326] via-[#F48A25] to-[#EE4326]">Real-World</span> Impact.
              </h3>

              <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
                Engineering student projects should not die on a slide deck. We orient our efforts toward software that gets deployed, evaluated by real users, and released as open source. We aim to contribute meaningfully to Pune’s burgeoning technical ecosystem and establish BV(DU)COEP as an epicenter for student-built innovation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Motive;
