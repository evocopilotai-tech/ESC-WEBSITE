import React from 'react';
import { Shell } from './components/layout/Shell';
import { Hero } from './components/hero/Hero';
import { About } from './components/about/About';
import { Motive } from './components/motive/Motive';
import { Experiences } from './components/experiences/Experiences';
import { Gallery } from './components/gallery/Gallery';
import { Team } from './components/team/Team';
import { Join } from './components/join/Join';

export function App() {
  return (
    <Shell>
      {/* Skip to main content — accessibility + SEO */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#EE4326] focus:text-white focus:font-mono focus:text-sm focus:rounded-sm focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Hero — above the fold landmark */}
      <Hero />

      {/* Main content landmark — wraps all body sections for accessibility & SEO */}
      <main id="main-content" role="main" aria-label="EvoCopilot Student Chapter — Main Content">

        {/* 01. About Section */}
        <About />

        {/* 02. Our Motive Section */}
        <Motive />

        {/* 03. What We Do / Experiences Section */}
        <Experiences />

        {/* 04. Campus Gallery / Visual Archive */}
        <Gallery />

        {/* 05. Core Team Directory */}
        <Team />

        {/* 06. Join / Community Section */}
        <Join />

      </main>
    </Shell>
  );
}

export default App;
