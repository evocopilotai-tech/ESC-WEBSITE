import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEAM_CATEGORIES, CORE_MEMBERS } from '../../data/teamData';
import { TailwindImageAccordion } from '../ui/tailwind-image-accordion';

export const Team = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredMembers = activeTab === 'all'
    ? CORE_MEMBERS
    : CORE_MEMBERS.filter((m) => m.category === activeTab);

  return (
    <section
      id="core-team"
      className="relative py-20 sm:py-28 lg:py-36 bg-[#0A0A0A] text-[#FCFBF8] border-b border-white/10 overflow-hidden"
    >
      {/* Editorial Vertical Architectural Guide Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="h-full w-full max-w-7xl mx-auto border-x border-white/5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-16 sm:mb-20 border-b border-white/10">
          <div className="flex items-center gap-4">
            <span className="font-editorial-serif text-5xl sm:text-6xl text-white font-normal leading-none select-none">
              05
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#EE4326] font-semibold">
                CHAPTER LEADERSHIP · COUNCIL
              </span>
              <span className="text-xs text-white/50 tracking-wider uppercase font-medium">
                Student Core Team
              </span>
            </div>
          </div>

          <div className="mt-4 sm:mt-0 font-mono text-[11px] text-white/40 tracking-widest uppercase">
            TERM · 2026–2027
          </div>
        </div>

        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif font-normal text-white leading-[1.15] mb-4">
            Student leadership<br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#EE4326] via-[#F48A25] to-[#EE4326]">shaping</span> our engineering direction.
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            The EvoCopilot Student Chapter is steered by an energetic council of student leads driving technical sessions, design systems, and campus hackathons.
          </p>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#EE4326] font-semibold block mb-1">
                STUDENT LEADERSHIP DIRECTORY & DIRECT CONNECT
              </span>
              <h3 className="text-2xl sm:text-3xl font-editorial-serif text-white font-normal">
                Core Team & Department Heads
              </h3>
            </div>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-6 mb-10 border-b border-white/10">
            {TEAM_CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 rounded-full border ${isActive
                    ? 'bg-[#EE4326] text-white border-[#EE4326]'
                    : 'bg-[#141414] text-white/70 hover:text-white border-white/10 hover:border-white/30'
                    }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Horizontal Image Accordion — TailwindImageAccordion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <TailwindImageAccordion
                items={filteredMembers}
                className="min-h-[340px] sm:min-h-[420px] lg:min-h-[480px]"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Team;
