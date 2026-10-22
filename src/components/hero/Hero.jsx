import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ChevronRight } from 'lucide-react';
import { VolumetricStudio } from '../ui/volumetric-studio';
import { MagneticButton } from '../ui/MagneticButton';

/* ── Animation variants ──────────────────────────────────── */
const container = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 1.2 } },
};

const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

/* ── Hero ────────────────────────────────────────────────── */
export const Hero = () => (
  <section id="hero" className="relative w-full overflow-hidden bg-black">
    {/* VolumetricStudio fills the entire hero viewport */}
    <VolumetricStudio className="min-h-[100svh]">

      {/* Content layer – centered with safe top padding to prevent overlapping with top light fixtures */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center
                   min-h-[100svh] pt-32 sm:pt-36 md:pt-40 pb-16 px-4 sm:px-6 lg:px-8 text-center pointer-events-none"
      >

        {/* Chapter badge */}
        <motion.div variants={item} className="mb-5 flex flex-col items-center gap-1.5">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white
                             bg-white/10 px-2.5 py-1 border border-white/20 font-semibold rounded-sm">
              Official Campus Chapter
            </span>
            <span className="text-white/40">/</span>
            <span className="font-sans font-semibold text-white/80 tracking-tight">
              EvoCopilot Student Chapter
            </span>
          </div>
          <p className="text-[11px] text-white/40 font-medium tracking-wide font-mono">
            Bharati Vidyapeeth College of Engineering, Pune
          </p>
        </motion.div>

        {/* Main headline — positioned cleanly below the studio light beams without overlap */}
        <motion.h1
          variants={item}
          className="max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[88px]
                     leading-[1.0] tracking-tight font-bold uppercase mb-6
                     text-transparent bg-clip-text
                     bg-gradient-to-b from-white via-white/90 to-white/40
                     drop-shadow-[0_2px_40px_rgba(255,255,255,0.12)]"
        >
          {/* "IDEAS INTO" */}
          <span className="block">Ideas into</span>
          {/* "INTELLIGENCE" */}
          <span className="block font-serif font-normal italic lowercase tracking-normal
                           text-white
                           my-1">
            intelligence.
          </span>
          {/* "INTELLIGENCE INTO IMPACT" */}
          <span className="block text-white/95">Intelligence</span>
          <span className="block text-white/70">into impact.</span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          variants={item}
          className="max-w-xl text-sm sm:text-base md:text-lg text-white/60 leading-relaxed mb-8"
        >
          A student-led community exploring AI, building technology,<br className="hidden sm:inline" />
          and shaping what's next.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 pointer-events-auto mb-10"
        >
          <MagneticButton
            href="#about"
            id="hero-explore-btn"
            className="btn-editorial inline-flex items-center gap-2.5
                       bg-white hover:bg-neutral-200
                       text-[#202020]
                       text-xs uppercase tracking-wider font-semibold
                       px-7 py-3.5 border border-white hover:border-neutral-300
                       shadow-[0_0_30px_rgba(255,255,255,0.15)]
                       transition-colors duration-200"
          >
            <span>Explore Our Chapter</span>
            <ChevronRight className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            href="#join"
            id="hero-join-btn"
            className="btn-editorial inline-flex items-center gap-2.5
                       bg-transparent hover:bg-white/10
                       text-white text-xs uppercase tracking-wider font-semibold
                       px-7 py-3.5 border border-white/20 hover:border-white/40
                       transition-colors duration-200"
          >
            <span>Join the Chapter</span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </MagneticButton>
        </motion.div>

        {/* Meta row */}
        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-4 text-[10px]
                     font-mono text-white/40 tracking-widest uppercase"
        >
          <span><span className="text-white/70 font-semibold">Campus:</span> Katraj-Dhankawadi, Pune</span>
          <span className="hidden sm:block text-white/20">|</span>
          <span><span className="text-white/70 font-semibold">Focus:</span> Applied AI · Dev Intelligence</span>
          <span className="hidden sm:block text-white/20">|</span>
          <span><span className="text-white/70 font-semibold">Term:</span> 2026–2027 Active</span>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          variants={item}
          className="mt-8 pointer-events-auto"
        >
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-2 text-[10px] font-mono
                       uppercase tracking-wider text-white/40 hover:text-white
                       transition-colors group"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="p-1 border border-white/20 rounded-sm
                         group-hover:border-white/60 transition-colors"
            >
              <ArrowDown className="w-3.5 h-3.5 text-white" />
            </motion.div>
            <span>Scroll to explore</span>
          </a>
        </motion.div>

      </motion.div>
    </VolumetricStudio>
  </section>
);

export default Hero;
