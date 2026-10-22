import React, { useState } from 'react';
import { Masthead } from '../navigation/Masthead';
import { Navbar } from '../navigation/Navbar';
import { CommandPalette } from '../navigation/CommandPalette';
import { Footer } from './Footer';

export const Shell = ({ children }) => {
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FCFBF8] flex flex-col font-editorial-sans relative selection:bg-[#EE4326] selection:text-white">
      {/* Editorial Vertical Architectural Guide Lines */}
      <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-7xl pointer-events-none z-0 hidden lg:block">
        <div className="h-full w-full border-x border-white/5" />
      </div>

      {/* Global Interactive Command Palette */}
      <CommandPalette
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
      />

      {/* Sticky Navigation directly at top — no white gap */}
      <Navbar onOpenCommandPalette={() => setCmdPaletteOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {children}
      </main>

      {/* Comprehensive Editorial Footer */}
      <Footer />
    </div>
  );
};

export default Shell;
