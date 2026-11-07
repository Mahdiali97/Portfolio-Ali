"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./ui/Reveal";
import { TextReveal } from "./ui/TextReveal";
import { Tilt3D } from "./ui/Tilt3D";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const artifacts = [
    { src: "/Portfolio-Ali/images/projects/uniperks-mockup.png", alt: "", className: "w-[300px] h-auto top-[18%] right-[8%] z-0" },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[120vh] flex flex-col items-center justify-center overflow-hidden bg-[var(--surface-ground)] px-6"
    >
      {/* Background Artifacts - Layered Depth */}
      {!shouldReduceMotion && artifacts.map((art, i) => (
        <motion.div
          key={i}
          style={{ y: i === 0 ? y1 : y2, rotate: i === 0 ? rotate : -rotate, opacity }}
          aria-hidden="true"
          className={`absolute pointer-events-none hidden lg:block ${art.className}`}
        >
          <img
            src={art.src}
            alt={art.alt}
            loading="eager"
            fetchPriority="high"
            className="rounded-sm border border-[var(--border-subtle)] shadow-2xl opacity-50"
          />
        </motion.div>
      ))}

      {/* Main Composition */}
      <div className="relative z-10 max-w-7xl w-full flex flex-col items-start lg:items-center">
        <div className="relative w-full">
          <motion.div 
             style={{ y: shouldReduceMotion ? 0 : y1 }}
             className="flex flex-col gap-0"
          >
            <h1 className="text-[12vw] lg:text-[10vw] font-extrabold leading-[0.8] tracking-tighter uppercase text-[var(--text-primary)]">
              <TextReveal text="Muhamad Ali" />
            </h1>
            <h1 className="text-[12vw] lg:text-[10vw] font-extrabold leading-[0.8] tracking-tighter uppercase text-[var(--text-primary)] lg:pl-[10vw]">
              <TextReveal text="Hanafiah" delay={0.4} />
            </h1>
          </motion.div>

          <Reveal 
            direction="left" 
            delay={0.8}
            className="relative mt-6 ml-auto max-w-[300px] text-right lg:absolute lg:top-full lg:bottom-auto lg:mt-2 lg:mr-[5%]"
          >
             <p className="font-serif italic text-2xl lg:text-4xl text-[var(--text-accent)] leading-tight">
               Creative Software Engineer <br /> & UI/UX Designer
             </p>
          </Reveal>
        </div>

        <div className="mt-16 lg:mt-48 w-full flex justify-end">
          <div>
            <Tilt3D intensity={10}>
              <Reveal direction="up" delay={1.2}>
                <div className="group relative overflow-hidden rounded-sm border border-[var(--border-strong)] bg-[var(--surface-card)] p-1">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--text-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img 
                    src="/Portfolio-Ali/images/projects/uniperks.png" 
                    alt="UniPerks Interface" 
                    loading="eager"
                    fetchPriority="high"
                    className="w-full lg:w-[600px] h-auto object-cover brightness-[0.85] group-hover:brightness-100 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-[var(--text-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Technical Excellence / Visual Precision
                  </div>
                </div>
              </Reveal>
            </Tilt3D>
          </div>
        </div>
      </div>

      {/* Spatial Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-[var(--text-tertiary)]">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--text-tertiary)] to-transparent" />
      </motion.div>
    </section>
  );
};
