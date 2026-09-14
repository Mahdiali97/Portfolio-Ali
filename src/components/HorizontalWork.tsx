"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import Link from "next/link";

const projects = [
  {
    title: "UniPerks Mobile",
    category: "Flutter • Supabase • Dart",
    description: "Proprietary gamified e-commerce application designed specifically for university merchandise and student perks.",
    num: "01",
    slug: "uniperks",
    image: "/images/projects/uniperks.png"
  },
  {
    title: "GEP CRM System",
    category: "React • TypeScript • MySQL",
    description: "Enterprise multi-module customer relationship management system with interactive pipelines and analytics dashboards.",
    num: "02",
    slug: "gep-crm-system",
    image: "/images/projects/gep-crm-system.png"
  },
  {
    title: "Local LLaMA Infrastructure",
    category: "Docker • Containerization • AI",
    description: "Privacy-first local LLM orchestration setup utilizing Docker containers for zero-latency inference.",
    num: "03",
    slug: "local-llama-ai",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Hermes Agent",
    category: "Python • LLM • Agentic Frameworks",
    description: "Autonomous AI agent architecture designed for complex task orchestration and intelligent workflow automation.",
    num: "04",
    slug: "hermes-agent",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "KHAR Hostel Portal",
    category: "Laravel • Livewire • Spatie",
    description: "High-concurrency web registration portal for university accommodation featuring real-time validation and group booking synchronization.",
    num: "05",
    slug: "khar-hostel-portal",
    image: "/images/projects/khar-hostel-portal.png"
  },
];

export const HorizontalWork = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[var(--bg-main)] w-full transition-colors duration-300">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Massive Sticky Hollow Background Text */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap select-none pointer-events-none opacity-60 z-0">
          <h2 className="text-[18vw] font-extrabold uppercase hollow-text leading-none tracking-tighter">
            WORK WORK WORK WORK
          </h2>
        </div>

        {/* Horizontal Moving Cards Track */}
        <motion.div 
          style={{ x, top: "50%", translateY: "-50%" }} 
          className="absolute left-0 flex gap-6 md:gap-10 z-10 w-max"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.02 }}
              className="w-[85vw] sm:w-[500px] h-[520px] rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group shrink-0"
            >
              {/* Background Image Layer */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 z-0 opacity-40 group-hover:opacity-100 mix-blend-luminosity dark:mix-blend-overlay"
              />

              {/* Dual-Theme Gradient Overlay Shield */}
              <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-[rgb(245,235,235)] via-[rgb(245,235,235)]/90 to-[rgb(245,235,235)]/20 dark:from-[#0a0a0a] dark:via-[#0a0a0a]/90 dark:to-[#0a0a0a]/20" />

              {/* Foreground Content */}
              <div className="relative z-20 flex flex-col h-full justify-between">
                {/* Top Meta */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-extrabold text-[#1a1a1a] dark:text-[rgb(245,235,235)]">
                    {project.num}
                  </span>
                  <span className="font-mono text-xs px-3 py-1 rounded-full border border-[#867070]/50 text-[#3b2d2d] bg-[#867070]/10 dark:border-[rgb(228,208,208)]/30 dark:text-[rgb(228,208,208)] dark:bg-transparent font-medium">
                    {project.category}
                  </span>
                </div>

                {/* Center Content */}
                <div className="space-y-4 my-auto">
                  <h3 className="text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-[rgb(245,235,235)] group-hover:text-[var(--color-dark)] dark:group-hover:text-[var(--text-accent)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="!text-[rgb(110,90,90)] dark:!text-[rgb(228,208,208)] !opacity-100 font-medium text-xs md:text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center gap-4 pt-6 border-t border-[var(--card-border)]">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href={`/work`}
                      className="inline-block bg-[rgb(134,112,112)] !text-[#f5ebeb] hover:!text-[#f5ebeb] font-semibold text-xs md:text-sm px-5 py-2.5 rounded-full shadow-sm hover:bg-[rgb(110,90,90)] transition-colors duration-200 dark:bg-[rgb(245,235,235)] dark:!text-[#0a0a0a] dark:hover:!text-[#0a0a0a] dark:hover:bg-[rgb(213,180,180)]"
                    >
                      View Project
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
