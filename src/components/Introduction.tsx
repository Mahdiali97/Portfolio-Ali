"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./ui/Reveal";
import { TextReveal } from "./ui/TextReveal";

export const Introduction = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const xRight = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const driftY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section 
      ref={containerRef}
      className="relative py-48 bg-[var(--surface-ground)] overflow-hidden"
    >
      {/* Background Kinetic Typography */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex flex-col justify-center gap-12 select-none">
        <motion.div style={{ x: xLeft }} className="text-[20vw] font-extrabold whitespace-nowrap uppercase leading-none">
          Design Engineering Perspective
        </motion.div>
        <motion.div style={{ x: xRight }} className="text-[20vw] font-extrabold whitespace-nowrap uppercase leading-none self-end">
          Artistic Technical Scalable
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-12">
            <Reveal direction="down">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--text-accent)]">
                Introduction / 01
              </span>
            </Reveal>

            <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tighter leading-[0.9] uppercase text-[var(--text-primary)]">
              <TextReveal text="Code as Art," /> <br />
              <span className="font-serif italic font-normal lowercase text-[var(--text-secondary)]">
                Design as Logic.
              </span>
            </h2>

            <Reveal direction="up" delay={0.2}>
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed font-light">
                I am Ali, a Creative Software Engineer bridging the gap between 
                complex backend architecture and high-fidelity frontend experiences. 
                I don't just build features; I craft digital artifacts that persist.
              </p>
            </Reveal>

            <div className="pt-8 space-y-6">
               <Reveal direction="right" delay={0.4}>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-[1px] bg-[var(--border-strong)]" />
                     <span className="font-mono text-xs uppercase tracking-widest">Bridging Roles</span>
                  </div>
               </Reveal>
               <div className="grid grid-cols-2 gap-4">
                  {["Next.js", "Flutter", "DevOps", "LLM Ops"].map((skill, i) => (
                    <Reveal key={skill} direction="up" delay={0.5 + i * 0.1}>
                       <span className="text-[var(--text-tertiary)] font-mono text-[10px] uppercase tracking-widest">
                          {skill}
                       </span>
                    </Reveal>
                  ))}
               </div>
            </div>
          </div>

          {/* Portrait Composition */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center lg:pt-12">
             <Reveal direction="up" delay={0.3}>
                <div className="relative w-full max-w-[450px] lg:max-w-[500px]">
                   {/* Decorative Frame Elements */}
                   <div className="absolute -inset-4 border border-[var(--border-subtle)] rounded-sm pointer-events-none" />
                   <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[var(--text-accent)]/30 rounded-tr-sm" />
                   <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-[var(--text-accent)]/30 rounded-bl-sm" />
                   
                   <motion.div 
                     style={{ y: shouldReduceMotion ? 0 : driftY }}
                     whileHover={!shouldReduceMotion ? { scale: 1.02 } : {}}
                     className="relative z-10"
                   >
                     <img 
                       src="/Portfolio-Ali/images/ALI-HANAFIAH.png" 
                       alt="Muhamad Ali Hanafiah" 
                       loading="lazy"
                       className="w-full h-auto object-contain" 
                     />
                   </motion.div>
                </div>
             </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};
