"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./ui/Reveal";

const journey = [
  {
    year: "2026",
    title: "Software Designer Intern",
    org: "SecureLabX Sdn Bhd",
    type: "Experience",
    desc: "Refined enterprise UI/UX design systems in Figma. Integrated complex workflow logic into high-fidelity design artifacts.",
    tags: ["Figma", "Design Systems", "Enterprise UI"]
  },
  {
    year: "2022-26",
    title: "Bachelor of Software Engineering",
    org: "Universiti Pendidikan Sultan Idris",
    type: "Education",
    desc: "Rigorous training in software architecture, frontend development, and formal product thinking methodology.",
    tags: ["Software Engineering", "Frontend", "Product Thinking"]
  }
];

export const ProfessionalBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" ref={containerRef} className="py-32 bg-[var(--surface-ground)] text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-24">
          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
             <Reveal direction="down">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--text-accent)] block mb-8">Background / 03</span>
              <h2 className="text-5xl font-extrabold tracking-tighter uppercase leading-[0.9]">
                Professional <br />
                <span className="font-serif italic font-normal lowercase text-[var(--text-secondary)]">Narrative</span>
              </h2>
             </Reveal>
          </div>

          {/* Timeline */}
          <div className="lg:w-2/3 space-y-24">
            {journey.map((item, i) => (
              <div key={i} className="relative pl-8 border-l border-[var(--border-strong)]">
                <div className="absolute -left-[5px] top-2 w-2 h-2 bg-[var(--text-accent)] rounded-full" />
                
                <Reveal direction="up" delay={i * 0.2}>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl font-bold uppercase tracking-tight">{item.title}</h3>
                    <span className="font-mono text-xs text-[var(--text-tertiary)]">{item.year}</span>
                  </div>
                  
                  <p className="font-serif italic text-xl text-[var(--text-secondary)] mb-6">{item.org} • {item.type}</p>
                  
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)] max-w-lg mb-8">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 border border-[var(--border-strong)] text-[var(--text-tertiary)] font-mono text-[9px] uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
