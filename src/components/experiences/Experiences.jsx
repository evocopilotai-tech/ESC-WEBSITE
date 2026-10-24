import React from 'react';
import {
  Cpu,
  Terminal,
  Code2,
  Trophy,
  BookOpen,
  FlaskConical,
  ArrowUpRight,
} from 'lucide-react';

export const Experiences = () => {

  const activities = [
    {
      num: '01',
      title: 'AI & Emerging-Technology Sessions',
      subtitle: 'Conceptual Foundations & Frontier Architectures',
      desc: 'Interactive lectures and technical deep-dives into autonomous agent scaffolds, vector databases, local LLM execution, and multimodal pipelines. Bridging textbook computer science with industry practice.',
      icon: Cpu,
      tag: 'RESEARCH & THEORY',
    },
    {
      num: '02',
      title: 'Hands-On Technical Workshops',
      subtitle: 'From Whiteboard Concept to Running Localhost',
      desc: 'Step-by-step implementation workshops where students set up developer environments, configure modern frameworks, write unit tests, and integrate AI APIs using production-standard tooling.',
      icon: Terminal,
      tag: 'PRACTICE & TOOLING',
    },
    {
      num: '03',
      title: 'Collaborative Software Development',
      subtitle: 'Git Workflows, Code Reviews & Monorepos',
      desc: 'Simulating high-performing engineering teams: branch management, semantic versioning, pull request peer reviews, and automated CI/CD deployment pipelines.',
      icon: Code2,
      tag: 'SYSTEMS & CODE',
    },
    {
      num: '04',
      title: 'Hackathons & Buildathons',
      subtitle: 'Sprint-Based Prototyping Under Real Constraints',
      desc: 'Time-boxed engineering competitions and collaborative hack sprints where cross-year student squads design, build, and deploy working applications in intensive 24-to-48-hour sessions.',
      icon: Trophy,
      tag: 'SPRINTS & CHALLENGES',
    },
    {
      num: '05',
      title: 'Technical Discussions & Paper Reading',
      subtitle: 'Critical Analysis of Landmark Computer Science',
      desc: 'Weekly seminars analyzing foundational AI papers, systems design trade-offs, database internals, and ethical considerations surrounding intelligent autonomous software.',
      icon: BookOpen,
      tag: 'SEMINARS & DISCOURSE',
    },
    {
      num: '06',
      title: 'Student-Led Experimentation & Product Building',
      subtitle: 'Incubating Open-Source Developer Tools',
      desc: 'Dedicated studio cycles allowing student creators to architect original open-source utilities, developer plugins, and campus productivity agents from first principles.',
      icon: FlaskConical,
      tag: 'INCUBATION & OPEN LABS',
    },
  ];

  return (
    <section
      id="experiences"
      className="relative pt-16 sm:pt-24 pb-16 sm:pb-24 bg-[#0A0A0A] text-[#FCFBF8] border-b border-white/10"
    >
      {/* Editorial Vertical Architectural Guide Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="h-full w-full max-w-7xl mx-auto border-x border-white/5" />
      </div>

      {/* ── Inner content — constrained width ──────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="exp-header flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-16 sm:mb-24 border-b border-white/10">
          <div className="flex items-center gap-4">
            <span className="font-editorial-serif text-5xl sm:text-6xl text-white font-normal leading-none select-none">
              03
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#EE4326] font-semibold">
                WHAT WE DO // ACTIVITY ROADMAP
              </span>
              <span className="text-xs text-white/50 tracking-wider uppercase font-medium">
                Six Areas of Focus · BV(DU)COEP Pune
              </span>
            </div>
          </div>

          <div className="mt-4 sm:mt-0 font-mono text-[11px] text-white/40">
            ROADMAP // TERM 2026-2027
          </div>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif font-normal text-white leading-[1.15] mb-4">
            Structured for deep inquiry.<br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#EE4326] via-[#F48A25] to-[#EE4326]">Engineered</span> for action.
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            The chapter's calendar balances conceptual rigor with hands-on development. These six activity pillars define our community's work at Bharati Vidyapeeth College of Engineering, Pune.
          </p>
        </div>

        {/* Activity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {activities.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.num}
                className="activity-item bg-[#121212] border border-white/10 hover:border-[#EE4326]/60 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(238,67,38,0.12)] group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <span className="font-mono text-sm text-[#EE4326] font-semibold">
                      // {act.num}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/60 px-2 py-0.5 bg-[#1C1C1C] border border-white/10 rounded-xs">
                      {act.tag}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="p-2 bg-[#1A1A1A] border border-white/10 rounded-xs text-white group-hover:text-[#EE4326] group-hover:border-[#EE4326]/40 transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white font-editorial-sans leading-snug">
                        {act.title}
                      </h3>
                      <div className="text-xs text-white/50 font-mono mt-0.5">
                        {act.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed pt-2">
                    {act.desc}
                  </p>
                </div>

                {/* Bottom Hairline */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>BV(DU)COEP CAMPUS LABS</span>
                  <span className="text-white/80 flex items-center gap-1 group-hover:text-[#EE4326] transition-colors font-medium">
                    Active Focus Area
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experiences;

