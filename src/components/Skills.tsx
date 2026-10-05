"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./ui/Reveal";

const skills = [
  { group: "UI/UX & Design", items: ["Figma", "Design Systems", "Prototyping", "User Research", "Interaction Design"] },
  { group: "Frontend Development", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Sass", "Framer Motion"] },
  { group: "Backend & Systems", items: ["Python", "Node.js", "Express", "API Architecture", "Python LLM Pipelines"] },
  { group: "Mobile & Platforms", items: ["Flutter", "Dart", "Cross-platform Development"] },
  { group: "Data & DevOps", items: ["PostgreSQL", "MySQL", "Prisma", "Docker", "Containerization"] }
];

export const Skills = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-32 bg-[var(--surface-ground)] text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        
        <Reveal direction="down">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--text-accent)] block mb-8">Capabilities / 04</span>
          <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tighter uppercase leading-[0.9] mb-24">
            Technical <br />
            <span className="font-serif italic font-normal lowercase text-[var(--text-secondary)]">Range</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {skills.map((group, i) => (
            <div key={group.group} className="space-y-8">
              <Reveal direction="up" delay={i * 0.1}>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-tertiary)] border-b border-[var(--border-strong)] pb-4">
                  {group.group}
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-4">
                  {group.items.map((item, j) => (
                    <motion.span
                      key={item}
                      whileHover={!shouldReduceMotion ? { x: 5, color: "var(--text-accent)" } : {}}
                      className="text-lg font-medium cursor-default transition-colors duration-300"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal direction="up" delay={0.6}>
          <div className="mt-32 p-8 border border-[var(--border-strong)] bg-[var(--surface-card)]">
            <p className="font-serif italic text-xl text-[var(--text-secondary)]">
              "Technical precision is the skeleton; interface design is the personality. My stack is chosen to bridge both effectively."
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
