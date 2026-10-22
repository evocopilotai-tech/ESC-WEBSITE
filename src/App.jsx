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
      {/* 00. Hero Section */}
      <Hero />

      {/* 01. About Section */}
      <About />

      {/* 02. Our Motive Section */}
      <Motive />

      {/* 03. What We Do / Experiences Section */}
      <Experiences />

      {/* 04. Campus Gallery / Visual Archive */}
      <Gallery />

      {/* 05. Faculty Coordinator & Core Team Directory */}
      <Team />

      {/* 06. Join Section */}
      <Join />
    </Shell>
  );
}

export default App;

