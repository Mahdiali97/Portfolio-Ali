"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Reveal } from "./ui/Reveal";
import { TextReveal } from "./ui/TextReveal";
import { Tilt3D } from "./ui/Tilt3D";

const projects = [
  {
    id: "01",
    title: "UniPerks",
    category: "Mobile E-commerce",
    tech: ["Flutter", "Supabase", "Dart", "UI/UX"],
    desc: "Proprietary gamified e-commerce application designed specifically for university merchandise and student perks. Blending high-conversion flows with modern spatial interfaces.",
    image: "/Portfolio-Ali/images/projects/uniperks.png",
    slug: "uniperks",
    layout: "spatial" // 3D tilt, large display
  },
  {
    id: "02",
    title: "GEP CRM System",
    category: "Enterprise Software",
    tech: ["React", "TypeScript", "MySQL", "Tailwind"],
    desc: "Enterprise multi-module customer relationship management system. Features interactive pipelines, analytics dashboards, and rigorous state management.",
    image: "/Portfolio-Ali/images/projects/CRM1.png",
    slug: "gep-crm-system",
    layout: "landscape" // Wide cinematic display
  },
  {
    id: "03",
    title: "KHAR Hostel Portal",
    category: "Web Application",
    tech: ["Next.js", "PostgreSQL", "Prisma"],
    desc: "Comprehensive accommodation management portal for KHAR university residents. Focuses on accessibility, fast load times, and data density.",
    image: "/Portfolio-Ali/images/projects/khar-hostel-portal.png",
    slug: "khar-hostel-portal",
    layout: "editorial" // Split text/image
  }
];

const infraProjects = [
  {
    id: "04",
    title: "Hermes Agent",
    category: "AI Architecture",
    tech: ["Python", "LLM", "Agentic Frameworks"],
    desc: "Autonomous AI agent architecture designed for complex task orchestration and intelligent workflow automation.",
    image: "/Portfolio-Ali/images/projects/Hermes.png",
    slug: "hermes-agent"
  },
  {
    id: "05",
    title: "Local LLaMA",
    category: "Infrastructure",
    tech: ["Docker", "Containerization", "Inference"],
    desc: "Privacy-first local LLM orchestration setup utilizing Docker containers for zero-latency private inference.",
    image: "/Portfolio-Ali/images/projects/LLama.png",
    slug: "local-llama-ai"
  }
];

const ParallaxImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div ref={ref} className={`overflow-hidden relative bg-[var(--surface-card)] ${className}`}>
      <motion.img
        style={{ y: shouldReduceMotion ? 0 : y, scale: 1.15 }}
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
      />
    </div>
  );
};

export const WorkExhibition = () => {
  return (
    <section id="work" className="relative py-32 bg-[var(--surface-ground)] text-[var(--text-primary)]">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <Reveal direction="down">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--text-accent)]">Selected Works / 02</span>
            <div className="flex-1 h-[1px] bg-[var(--border-strong)]" />
          </div>
        </Reveal>
        <h2 className="text-5xl lg:text-8xl font-extrabold tracking-tighter uppercase leading-[0.85]">
          <TextReveal text="Exhibition" /> <br />
          <span className="font-serif italic font-normal text-[var(--text-secondary)] lowercase">
             Archive & Architecture
          </span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-48">
        
        {/* 01: UniPerks (Spatial 3D) */}
        <div className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col gap-6">
            <Reveal direction="left">
              <span className="font-mono text-xs text-[var(--text-accent)]">{projects[0].id}</span>
              <h3 className="text-4xl lg:text-5xl font-bold uppercase tracking-tight mt-2">{projects[0].title}</h3>
              <p className="font-serif italic text-xl text-[var(--text-secondary)] mt-2">{projects[0].category}</p>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] max-w-sm">
                {projects[0].desc}
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <div className="flex flex-wrap gap-2 mt-4">
                {projects[0].tech.map(t => (
                  <span key={t} className="px-3 py-1 border border-[var(--border-strong)] text-[var(--text-tertiary)] font-mono text-[9px] uppercase tracking-widest">{t}</span>
                ))}
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.4}>
              <a href={`#${projects[0].slug}`} className="inline-flex items-center gap-4 mt-8 group/btn">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-primary)] group-hover/btn:text-[var(--text-accent)] transition-colors">Explore Project</span>
                <div className="w-8 h-[1px] bg-[var(--text-primary)] group-hover/btn:bg-[var(--text-accent)] group-hover/btn:w-12 transition-all" />
              </a>
            </Reveal>
          </div>
          <div className="lg:col-span-8 order-1 lg:order-2">
            <Tilt3D intensity={8}>
              <a href={`#${projects[0].slug}`}>
                <ParallaxImage src={projects[0].image} alt={projects[0].title} className="w-full aspect-[4/3] lg:aspect-[16/10] rounded-sm border border-[var(--border-strong)] shadow-2xl" />
              </a>
            </Tilt3D>
          </div>
        </div>

        {/* 02: GEP CRM (Landscape Cinematic) */}
        <div className="group flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <Reveal direction="up">
              <span className="font-mono text-xs text-[var(--text-accent)] block mb-2">{projects[1].id}</span>
              <h3 className="text-4xl lg:text-6xl font-bold uppercase tracking-tighter">{projects[1].title}</h3>
              <p className="font-serif italic text-xl text-[var(--text-secondary)] mt-2">{projects[1].category}</p>
            </Reveal>
            <Reveal direction="left" delay={0.2}>
               <a href="#gep-crm" className="inline-flex items-center gap-4 group/btn pb-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-primary)] group-hover/btn:text-[var(--text-accent)] transition-colors">View System</span>
                <div className="w-12 h-[1px] bg-[var(--text-primary)] group-hover/btn:bg-[var(--text-accent)] group-hover/btn:w-16 transition-all" />
              </a>
            </Reveal>
          </div>
          <Tilt3D intensity={3}>
            <Reveal direction="up" delay={0.1}>
               <a href="#gep-crm">
                 <ParallaxImage src={projects[1].image} alt={projects[1].title} className="w-full aspect-video rounded-sm border border-[var(--border-strong)]" />
               </a>
            </Reveal>
          </Tilt3D>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
             <Reveal direction="up">
               <p className="text-sm leading-relaxed text-[var(--text-secondary)] max-w-lg">
                 {projects[1].desc}
               </p>
             </Reveal>
             <Reveal direction="up" delay={0.2}>
               <div className="flex flex-wrap gap-2 md:justify-end">
                  {projects[1].tech.map(t => (
                    <span key={t} className="px-3 py-1 border border-[var(--border-strong)] text-[var(--text-tertiary)] font-mono text-[9px] uppercase tracking-widest">{t}</span>
                  ))}
               </div>
             </Reveal>
          </div>
        </div>

        {/* 03: KHAR Portal (Editorial Split) */}
        <div className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal direction="right">
              <a href="#khar-hostel">
                <ParallaxImage src={projects[2].image} alt={projects[2].title} className="w-full aspect-square md:aspect-[4/3] rounded-sm border border-[var(--border-strong)]" />
              </a>
            </Reveal>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-12 border-l border-transparent lg:border-[var(--border-subtle)]">
            <Reveal direction="left">
              <span className="font-mono text-xs text-[var(--text-accent)]">{projects[2].id}</span>
              <h3 className="text-4xl lg:text-5xl font-bold uppercase tracking-tight mt-2 leading-[0.9]">{projects[2].title}</h3>
              <p className="font-serif italic text-xl text-[var(--text-secondary)] mt-4">{projects[2].category}</p>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {projects[2].desc}
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <div className="flex flex-wrap gap-2 mt-4">
                {projects[2].tech.map(t => (
                  <span key={t} className="px-3 py-1 border border-[var(--border-strong)] text-[var(--text-tertiary)] font-mono text-[9px] uppercase tracking-widest">{t}</span>
                ))}
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.4}>
              <a href="#khar-hostel" className="inline-flex items-center gap-4 mt-8 group/btn">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-primary)] group-hover/btn:text-[var(--text-accent)] transition-colors">Read Case Study</span>
                <div className="w-8 h-[1px] bg-[var(--text-primary)] group-hover/btn:bg-[var(--text-accent)] group-hover/btn:w-12 transition-all" />
              </a>
            </Reveal>
          </div>
        </div>

        {/* 04 & 05: Tech/Infra Grid (Hermes & Local LLaMA) */}
        <div className="pt-24 border-t border-[var(--border-subtle)]">
          <Reveal direction="down">
             <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--text-tertiary)] mb-16">Infrastructure & AI Agents</h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {infraProjects.map((proj, i) => (
              <Reveal key={proj.id} direction="up" delay={i * 0.2}>
                <a href={`#${proj.id === "04" ? "hermes-agent" : "local-llama"}`} className="group/infra flex flex-col gap-6">
                  <div className="overflow-hidden rounded-sm border border-[var(--border-strong)] bg-[var(--surface-card)] aspect-video relative">
                     <img 
                       src={proj.image} 
                       alt={proj.title} 
                       loading="lazy"
                       className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover/infra:opacity-100 group-hover/infra:grayscale-0 transition-all duration-700 group-hover/infra:scale-105" 
                     />
                     <div className="absolute inset-0 border border-[var(--text-accent)] opacity-0 group-hover/infra:opacity-20 transition-opacity duration-500" />
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-4">
                       <h4 className="text-2xl font-bold uppercase tracking-tight">{proj.title}</h4>
                       <span className="font-mono text-[10px] text-[var(--text-accent)]">{proj.id}</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 h-16">{proj.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {proj.tech.map(t => (
                        <span key={t} className="text-[var(--text-tertiary)] font-mono text-[9px] uppercase tracking-widest border border-transparent group-hover/infra:border-[var(--border-subtle)] px-2 py-1 transition-colors">{t}</span>
                      ))}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
