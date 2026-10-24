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
                   min-h-[100svh] pt-40 sm:pt-44 md:pt-48 pb-16 px-4 sm:px-6 lg:px-8 text-center pointer-events-none"
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

        {/* Main headline — refined scale preserving signature 4-line typography layout */}
        <motion.h1
          variants={item}
          className="max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-[60px] xl:text-[68px]
                     leading-[1.05] tracking-tight font-bold uppercase mb-6
                     text-transparent bg-clip-text
                     bg-gradient-to-b from-white via-white/90 to-white/40
                     drop-shadow-[0_2px_40px_rgba(255,255,255,0.12)]"
        >
          <span className="block">Curiosity into</span>
          <span className="block font-serif font-normal italic lowercase tracking-normal
                           text-white
                           my-1">
            code.
          </span>
          <span className="block text-white/95">Software that</span>
          <span className="block text-white/70">matters.</span>
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
          className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
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
      </motion.div>
    </VolumetricStudio>
  </section>
);

export default Hero;
