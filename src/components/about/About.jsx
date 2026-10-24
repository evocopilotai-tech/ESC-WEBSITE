import React from 'react';
import InkOrbitFeatures from '../ui/ink-orbit-features';

export const About = () => {
  return (
    <section id="about" className="relative w-full bg-[#0E0E0E] border-b border-white/10">
      <InkOrbitFeatures
        theme="dark"
        brand="EvoCopilot"
        tag="ABOUT THE CHAPTER · 01"
        title="Where Curious Minds *Ship*.\nFrom Prototype to Production SaaS."
        collaboration={{
          title: "SaaS Product Development & Core Engineering",
          description: "Chapter squads architect, containerize, and ship end-to-end full-stack SaaS platforms with microservices, scalable databases, and production agent backends.",
        }}
        reports={{
          title: "Automated CI/CD & Production Build Digests",
          description: "Continuous integration pipelines, automated regression benchmarks, and deployment digests generated directly from production releases and Git pushes.",
        }}
        integrations={{
          title: "Production Cloud & AI Toolchain",
          description: "Seamless interoperability across modern tech stacks — Next.js, PyTorch, Docker, Kubernetes, and local LLM runtime agents.",
          tools: ["Next.js", "PyTorch", "Docker", "Ollama"],
        }}
        insights={{
          title: "SaaS Velocity & Inference Benchmarks",
          description: "Real-time metrics tracking latency reductions, weekly production commits, and active SaaS application deployments built by chapter engineers.",
          values: [22, 27, 25, 34, 32, 42, 40, 50, 48, 58, 65, 74],
          forecastFrom: 8,
        }}
      />
    </section>
  );
};

export default About;
