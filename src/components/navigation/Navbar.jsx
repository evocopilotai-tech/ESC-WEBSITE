import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../brand/Logo';
import { MagneticButton } from '../ui/MagneticButton';

export const NAV_LINKS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Motive', href: '#motive', id: 'motive' },
  { label: 'Experiences', href: '#experiences', id: 'experiences' },
  { label: 'Gallery', href: '#gallery', id: 'gallery' },
  { label: 'Core Team', href: '#core-team', id: 'core-team' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ids = ['about', 'motive', 'experiences', 'gallery', 'core-team'];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <>
      <nav
        id="main-navigation"
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ease-out ${isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-white/15 shadow-2xl py-3 text-white'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent border-b border-transparent py-4 text-white'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Brand */}
            <a
              href="#"
              className="flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-xs"
              aria-label="EvoCopilot Student Chapter"
            >
              <Logo variant="compact" size="md" inline={true} subtitle="Student Chapter" dark={true} />
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setActiveSection(link.id)}
                    className={`group relative px-3 py-1.5 text-xs font-medium tracking-wider uppercase font-editorial-sans transition-colors duration-200 flex items-center ${isActive ? 'text-white' : 'text-white/60 hover:text-white'
                      }`}
                  >
                    <span>{link.label}</span>

                    {isActive ? (
                      <motion.div
                        layoutId="navSectionIndicator"
                        className="absolute -bottom-1 left-3 right-3 h-[2px] bg-gradient-to-r from-[#EE4326] to-[#F48A25]"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    ) : (
                      <span className="absolute -bottom-1 left-3 right-3 h-[1px] bg-[#EE4326] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Mobile / Tablet Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((o) => !o)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xs border border-white/20 bg-white/10 text-white hover:bg-white hover:text-black transition-colors"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-black/95 backdrop-blur-xl border-b border-white/20 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base uppercase tracking-wider font-editorial-sans text-neutral-300 hover:text-white py-2 border-b border-white/10 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </a>
              ))}
              <a
                href="#join"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full text-center py-3 bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-neutral-200 transition-colors"
              >
                Join the Chapter
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
