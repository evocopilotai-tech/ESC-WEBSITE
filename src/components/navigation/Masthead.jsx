import React from 'react';
import { MapPin, Sparkles, ExternalLink } from 'lucide-react';

export const Masthead = () => {
  return (
    <header className="w-full bg-[#F6F4EF] border-b border-[#E9E5DF] text-[#595650] text-[11px] font-medium tracking-wide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
        {/* Left: Academic Affiliation */}
        <div className="flex items-center gap-2 truncate">
          <span className="font-semibold text-[#202020] uppercase tracking-wider text-[10px] px-1.5 py-0.5 bg-[#EFECE5] rounded-xs border border-[#E9E5DF]">
            CAMPUS
          </span>
          <span className="truncate">Bharati Vidyapeeth College of Engineering, Pune</span>
          <span className="hidden md:inline text-[#DCD7CE]">/</span>
          <span className="hidden md:inline text-[#8E8A82]">Dept. of Computer Engineering</span>
        </div>

        {/* Right: Chapter Pulse & Location */}
        <div className="hidden sm:flex items-center gap-4 text-[#8E8A82] shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#111111] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#111111]"></span>
            </span>
            <span className="text-[#202020] text-[11px]">Academic Year 2026–27</span>
          </div>

          <span className="text-[#DCD7CE]">|</span>

          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#111111]" />
            <span>Pune, Maharashtra</span>
          </div>

          <span className="text-[#DCD7CE]">|</span>

          <a
            href="https://evocopilot.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[#595650] hover:text-[#111111] transition-colors"
          >
            <span>EvoCopilot HQ</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Masthead;
