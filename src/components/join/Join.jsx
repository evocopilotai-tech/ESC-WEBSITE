import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronRight, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { CHAPTER_CONFIG } from '../../data/chapterConfig';

export const Join = () => {
  return (
    <section
      id="join-us"
      className="relative pt-24 pb-28 sm:pt-32 sm:pb-36 bg-[#0A0A0A] border-b border-white/10 overflow-hidden"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="h-full w-full max-w-7xl mx-auto border-x border-white/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Eyebrow Hairline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-16 sm:mb-20 border-b border-white/10">
          <div className="flex items-center gap-4">
            <span className="font-editorial-serif text-5xl sm:text-6xl text-white/30 font-normal leading-none select-none">
              06
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#EE4326] font-semibold">
                CHAPTER MEMBERSHIP · ADMISSIONS
              </span>
            </div>
          </div>
        </div>

        {/* Distinctive Asymmetric Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Bold Typography & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Campus Tag */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-white/80 bg-white/5 border border-white/10 rounded-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EE4326] animate-pulse" />
              Student Community
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-editorial-serif font-normal text-white tracking-tight leading-[1.08]">
              Your next idea<br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#EE4326] via-[#F48A25] to-[#EE4326]">starts</span> here.
            </h2>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-white/80 max-w-xl font-editorial-sans font-normal leading-relaxed">
              Learn together. Experiment boldly. Build something meaningful.
            </p>

            <p className="text-xs sm:text-sm text-white/50 max-w-lg leading-relaxed pt-1">
              Whether you are compiling your first neural network or building distributed developer agents, the EvoCopilot chapter offers a disciplined, peer-led environment to take ideas from localhost to production.
            </p>

            {/* Prominent Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {/* Prominent Magnetic Join Button with Logo Brand Gradient */}
              <MagneticButton
                href={CHAPTER_CONFIG.membership.applyUrl}
                target="_blank"
                rel="noreferrer"
                id="join-apply-btn"
                className="btn-editorial bg-gradient-to-r from-[#EE4326] to-[#F48A25] hover:opacity-90 text-white text-xs uppercase tracking-wider font-semibold px-7 py-4 border border-[#EE4326]/50 shadow-[0_0_25px_rgba(238,67,38,0.35)] transition-all gap-2"
              >
                <span>Join the Chapter</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>

              {/* Secondary Explore Our Work action */}
              <MagneticButton
                href="#experiences"
                id="join-explore-work-btn"
                className="btn-editorial bg-transparent hover:bg-white/5 text-white/80 hover:text-white text-xs uppercase tracking-wider font-medium px-6 py-4 border border-white/15 hover:border-white/40 transition-colors gap-2"
              >
                <span>Explore Our Work</span>
                <ChevronRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Animated Visual Matrix Leading Into Footer (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#141414] border border-white/10 p-6 sm:p-8 relative shadow-[0_4px_30px_-15px_rgba(0,0,0,0.5)]">
              {/* Top Hairline Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5 text-[10px] font-mono text-white/50">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#EE4326]" />
                  <span>COMMUNITY ADMISSIONS PIPELINE</span>
                </div>
              </div>

              {/* Minimal Code & Activity Matrix */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-[#1C1C1C] border border-white/10 rounded-xs">
                  <div className="text-[10px] text-[#EE4326] uppercase mb-1 font-semibold">Step 01 · Ingestion</div>
                  <div className="text-white font-semibold text-xs">Submit Membership Application</div>
                  <div className="text-[11px] text-white/60 mt-0.5">Share your GitHub, interests, and curiosity.</div>
                </div>

                <div className="p-3 bg-[#1C1C1C] border border-white/10 rounded-xs">
                  <div className="text-[10px] text-[#F48A25] uppercase mb-1 font-semibold">Step 02 · Alignment</div>
                  <div className="text-white font-semibold text-xs">Informal Technical Discussion</div>
                  <div className="text-[11px] text-white/60 mt-0.5">Meet council leads and discuss areas of curiosity.</div>
                </div>

                <div className="p-3 bg-[#1C1C1C] border border-white/10 rounded-xs">
                  <div className="text-[10px] text-[#EE4326] uppercase mb-1 font-semibold">Step 03 · Execution</div>
                  <div className="text-white font-semibold text-xs">Deploy With Chapter Squads</div>
                  <div className="text-[11px] text-white/60 mt-0.5">Immediate access to workshops, compute & repositories.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
