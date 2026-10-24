import React from 'react';
import { SecondDraftText } from '../ui/second-draft-text';

export const Experiences = () => {
  return (
    <section
      id="experiences"
      className="relative pt-16 sm:pt-24 pb-20 sm:pb-28 bg-[#0A0A0A] text-[#FCFBF8] border-b border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="h-full w-full max-w-7xl mx-auto border-x border-white/5" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#EE4326]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-14 sm:mb-20 border-b border-white/10">
          <div className="flex items-center gap-4">
            <span className="font-editorial-serif text-5xl sm:text-6xl text-white font-normal leading-none select-none">
              03
            </span>
            <div className="flex flex-col justify-center">
              <span className="text-xs text-white/50 tracking-wider uppercase font-medium">
                Student-First Engineering
              </span>
            </div>
          </div>

          <div className="mt-4 sm:mt-0 font-mono text-[11px] text-white/40">
            FOR STUDENTS · BY STUDENTS
          </div>
        </div>

        {/* SecondDraftText Showcase Card */}
        <div className="bg-[#121212] border border-white/10 rounded-sm p-8 sm:p-14 lg:p-16 shadow-[0_16px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {/* Subtle gradient scrim */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#EE4326]/10 via-transparent to-transparent pointer-events-none" />

          <SecondDraftText
            lead="You build software that feels"
            first="fast"
            second="complex"
            last="yours"
            theme="night"
            motion="full"
            kickerTitle="STUDENT MANIFESTO"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Experiences;
