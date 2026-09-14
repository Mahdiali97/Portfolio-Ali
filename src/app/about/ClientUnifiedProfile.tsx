"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { person } from "@/resources";
import { Icon } from "@once-ui-system/core";

const MagneticButton = ({ children, href, download }: { children: React.ReactNode, href: string, download?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.4);
    y.set(offsetY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      download={download}
      target={download ? undefined : "_blank"}
      rel={download ? undefined : "noreferrer"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ 
        scale: 1.05
      }}
      className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[rgb(134,112,112)]/40 bg-transparent text-[rgb(134,112,112)] font-medium transition-all duration-300 ease-out hover:bg-[rgb(134,112,112)] hover:text-[rgb(245,235,235)] dark:border-[rgb(228,208,208)]/30 dark:text-[rgb(245,235,235)] dark:hover:bg-[rgb(245,235,235)] dark:hover:text-[#0a0a0a] z-10 font-mono shadow-sm"
    >
      {children}
    </motion.a>
  );
};

const InteractiveCat = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const pupilX = useTransform(mouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1000], [-3, 3]);
  const pupilY = useTransform(mouseY, [0, typeof window !== "undefined" ? window.innerHeight : 1000], [-3, 3]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      className="w-32 h-32 mx-auto cursor-pointer"
      whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
        <path d="M 20 45 L 10 10 L 40 30 Z" fill="var(--text-main)" stroke="var(--color-dark)" strokeWidth="1" />
        <path d="M 80 45 L 90 10 L 60 30 Z" fill="var(--text-main)" stroke="var(--color-dark)" strokeWidth="1" />
        <ellipse cx="50" cy="60" rx="40" ry="35" fill="var(--text-main)" stroke="var(--color-dark)" strokeWidth="1" />
        <ellipse cx="35" cy="55" rx="8" ry="12" fill="var(--bg-main)" />
        <ellipse cx="65" cy="55" rx="8" ry="12" fill="var(--bg-main)" />
        <motion.ellipse cx="35" cy="55" rx="4" ry="7" fill="var(--color-dark)" style={{ x: pupilX, y: pupilY }} />
        <motion.ellipse cx="65" cy="55" rx="4" ry="7" fill="var(--color-dark)" style={{ x: pupilX, y: pupilY }} />
      </svg>
    </motion.div>
  );
};

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="p-8 rounded-2xl bg-[var(--card-bg)] dark:bg-white/5 border border-[var(--card-border)] dark:border-[rgb(134,112,112)]/50 shadow-xl backdrop-blur-md relative z-10"
    >
      {children}
    </motion.div>
  );
};

const SkillTag = ({ text }: { text: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 10 });
  const springY = useSpring(y, { stiffness: 100, damping: 10 });

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dist = 60;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    if (Math.abs(dx) < dist && Math.abs(dy) < dist) {
      x.set(dx > 0 ? -20 : 20);
      y.set(dy > 0 ? -20 : 20);
    }
  };

  return (
    <motion.span
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: springX, y: springY }}
      className="px-4 py-2 rounded-full border border-[var(--color-dark)] dark:border-[rgb(134,112,112)]/70 bg-transparent text-[var(--color-dark)] dark:text-[rgb(245,235,235)] font-mono text-sm shadow-sm z-20 relative cursor-default transition-all duration-300 ease-out hover:bg-[var(--color-dark)] hover:text-[var(--bg-main)] hover:border-transparent dark:hover:bg-[rgb(213,180,180)] dark:hover:text-[#0a0a0a]"
    >
      {text}
    </motion.span>
  );
};

const LanguageBar = ({ label, percentage, level }: { label: string, percentage: number, level: string }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <span className="font-bold text-[var(--color-dark)] dark:text-[rgb(245,235,235)]">{label}</span>
        <span className="text-xs font-mono text-[var(--text-main)] dark:text-[rgb(213,180,180)] tracking-widest">{level}</span>
      </div>
      <div className="w-full h-1 bg-[var(--color-mid-ambient)] dark:bg-[rgb(134,112,112)]/20 rounded-full mt-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-full bg-[var(--color-mid-hover)] dark:bg-[rgb(213,180,180)] dark:shadow-[0_0_10px_rgba(213,180,180,0.5)] rounded-full"
        />
      </div>
    </div>
  );
};

export default function ClientUnifiedProfile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  const experiences = [
    { title: "SecureLabX Sdn Bhd", role: "Software Designer Intern", date: "Feb 2026 - Aug 2026", desc: "Engineered intuitive user interfaces and high-fidelity prototypes using Figma. Standardized cross-platform UI components and simplified complex operational workflows." },
    { title: "Yemz Studio", role: "Customer Service & Promoter", date: "Aug 2025 - Sep 2025", desc: "Managed customer communication and logistical packaging, ensuring precision and user satisfaction." },
  ];

  const education = [
    { title: "Universiti Pendidikan Sultan Idris", role: "Bachelor of Software Engineering (Honours)", date: "Sep 2022 - Aug 2026", desc: "Dean's List (Semester 1-8). Current CGPA: 3.85. Specialized in full-stack architecture and DevOps workflows." },
    { title: "Kolej Matrikulasi Kedah", role: "Science Computer Module", date: "Jun 2020 - Jun 2022", desc: "Dean's List (Semester 3, 4). CGPA: 3.83." }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] overflow-x-hidden relative pt-20 transition-colors duration-300">
      
      {/* ── SECTION 1: THE ULTIMATE HERO ── */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-6"
        >
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[var(--color-dark)] shadow-2xl relative z-20">
            <Image src={person.avatar} alt="Ali Hanafiah" fill className="object-cover" />
          </div>
          <div className="absolute -top-10 -right-10 z-10 scale-75">
            <InteractiveCat />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl sm:text-8xl md:text-[10rem] font-extrabold tracking-tighter leading-none uppercase text-center flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6"
        >
          <span className="text-[var(--color-dark)] dark:text-[rgb(245,235,235)]">ALI</span>
          <span className="hollow-text">HANAFIAH</span>
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="text-center max-w-2xl mb-12 space-y-4"
        >
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-xl sm:text-2xl font-serif italic text-[var(--color-dark)] dark:text-[rgb(213,180,180)] uppercase tracking-wide">
            Software Engineer, DevOps & UI/UX
          </motion.p>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-[var(--text-main)] dark:text-[rgb(228,208,208)] leading-relaxed text-lg">
            Software Engineering student from UPSI. With a deep passion for clean architecture and beautiful interfaces, I bridge the gap between robust backend systems and award-winning frontend experiences.
          </motion.p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          <MagneticButton href="/Portfolio-Ali/docs/Resume-Ali.pdf" download="Resume-Ali.pdf">
            <Icon name="document" size="xs" /> Download CV
          </MagneticButton>
          <MagneticButton href="https://github.com/Mahdiali97">
            <Icon name="github" size="xs" /> GitHub
          </MagneticButton>
          <MagneticButton href="https://www.linkedin.com/in/ali-hanafiah-778365353/">
            <Icon name="linkedin" size="xs" /> LinkedIn
          </MagneticButton>
          <MagneticButton href="mailto:mahdialihanafiah@gmail.com">
            <Icon name="email" size="xs" /> Email Me
          </MagneticButton>
        </div>
      </section>

      {/* ── SECTION 2: DUAL-TRACK JOURNEY ── */}
      <section className="py-32 px-6 relative max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-widest text-[var(--color-dark)] uppercase">The Journey</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          
          {/* COLUMN 1: WORK EXPERIENCE */}
          <div className="relative pl-8 border-l-2 border-[var(--color-dark)]/30 space-y-12">
            <div className="absolute top-0 left-[-2px] bottom-0 w-[2px]">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 2 100">
                <motion.line
                  x1="1" y1="0" x2="1" y2="100"
                  stroke="var(--color-dark)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  style={{ pathLength: scrollYProgress }}
                />
              </svg>
            </div>

            <h3 className="text-2xl font-extrabold text-[var(--color-dark)] uppercase tracking-wider mb-8 flex items-center gap-3">
              <Icon name="work" size="s" /> Work Experience
            </h3>

            {experiences.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] top-6 w-4 h-4 bg-[var(--bg-main)] border-4 border-[var(--color-dark)] rounded-full z-20" />
                <TiltCard>
                  <p className="font-mono text-xs text-[var(--color-dark)] dark:text-[rgb(228,208,208)] mb-2 tracking-widest uppercase">{item.date}</p>
                  <h4 className="text-xl font-bold text-[var(--text-main)] dark:text-[rgb(245,235,235)] mb-1">{item.title}</h4>
                  <p className="font-serif italic text-[var(--color-dark)] dark:text-[rgb(245,235,235)] mb-3">{item.role}</p>
                  <p className="text-[var(--text-main)] dark:text-[rgb(228,208,208)] text-sm leading-relaxed">{item.desc}</p>
                </TiltCard>
              </div>
            ))}
          </div>

          {/* COLUMN 2: EDUCATION */}
          <div className="relative pl-8 border-l-2 border-[var(--color-dark)]/30 space-y-12">
            <div className="absolute top-0 left-[-2px] bottom-0 w-[2px]">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 2 100">
                <motion.line
                  x1="1" y1="0" x2="1" y2="100"
                  stroke="var(--color-dark)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  style={{ pathLength: scrollYProgress }}
                />
              </svg>
            </div>

            <h3 className="text-2xl font-extrabold text-[var(--color-dark)] uppercase tracking-wider mb-8 flex items-center gap-3">
              <Icon name="person" size="s" /> Education
            </h3>

            {education.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] top-6 w-4 h-4 bg-[var(--bg-main)] border-4 border-[var(--color-dark)] rounded-full z-20" />
                <TiltCard>
                  <p className="font-mono text-xs text-[var(--color-dark)] dark:text-[rgb(228,208,208)] mb-2 tracking-widest uppercase">{item.date}</p>
                  <h4 className="text-xl font-bold text-[var(--text-main)] dark:text-[rgb(245,235,235)] mb-1">{item.title}</h4>
                  <p className="font-serif italic text-[var(--color-dark)] dark:text-[rgb(245,235,235)] mb-3">{item.role}</p>
                  <p className="text-[var(--text-main)] dark:text-[rgb(228,208,208)] text-sm leading-relaxed">{item.desc}</p>
                </TiltCard>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 3: THE INTERACTIVE ARSENAL ── */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-widest text-[var(--color-dark)] uppercase">Technical Arsenal</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Frontend", tools: ["Vue.js", "React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
            { title: "Backend", tools: ["Laravel", "Node.js", "Express", "MySQL", "Prisma", "Supabase", "Firebase"] },
            { title: "DevOps & Mobile", tools: ["Docker", "Linux", "Ubuntu", "Git", "CI/CD", "Flutter", "Dart"] },
            { title: "UI/UX & Design", tools: ["Figma", "Illustrator", "Prototyping", "Design Systems"] }
          ].map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-[var(--card-bg)] dark:bg-white/5 border border-[var(--card-border)] dark:border-[rgb(134,112,112)]/40 backdrop-blur-md relative overflow-hidden group"
            >
              <h3 className="text-2xl font-extrabold text-[var(--color-dark)] dark:text-[rgb(245,235,235)] mb-8 uppercase tracking-widest">{cat.title}</h3>
              <div className="flex flex-wrap gap-4 relative z-10">
                {cat.tools.map(tool => <SkillTag key={tool} text={tool} />)}
              </div>
              {/* Pulse Icon Background */}
              <Icon 
                name={cat.title.includes("UI") ? "figma" : cat.title.includes("Frontend") ? "react" : cat.title.includes("Backend") ? "mysql" : "docker" as any} 
                className="absolute -bottom-10 -right-10 w-48 h-48 pointer-events-none z-0 opacity-10 dark:opacity-100 text-[var(--color-dark)] dark:text-[rgb(213,180,180)]/40 dark:stroke-[rgb(213,180,180)]/40 group-hover:opacity-20 dark:group-hover:opacity-100 dark:group-hover:text-[rgb(213,180,180)]/60 group-hover:scale-110 transition-all duration-700" 
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: ANALYTICS & TROPHIES ── */}
      <section className="py-32 px-6 max-w-4xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-3xl font-extrabold tracking-widest text-[var(--color-dark)] uppercase mb-12">Languages</h2>
            <div className="space-y-10">
              <LanguageBar label="Bahasa Melayu" percentage={100} level="NATIVE" />
              <LanguageBar label="English" percentage={90} level="FLUENT" />
              <LanguageBar label="Japanese" percentage={60} level="JLPT N3" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold tracking-widest text-[var(--color-dark)] dark:text-[rgb(245,235,235)] uppercase mb-12">Trophies</h2>
            <div className="space-y-4">
              {[
                { title: "DevOps Certificate", desc: "Foundation Certificate in DevOps (FCDO).", icon: "🏆" },
                { title: "STEM Challenge", desc: "5th Place — Fundamental STEM Coding Challenge.", icon: "🏅" },
                { title: "COMASPRO'23", desc: "Volunteered for System Maintenance.", icon: "💻" }
              ].map((ach, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-2xl bg-[var(--card-bg)] dark:bg-white/5 border border-[var(--card-border)] dark:border-[rgb(134,112,112)]/50 flex items-center gap-6 group cursor-default transition-all"
                >
                  <motion.span 
                    className="text-4xl filter drop-shadow-md grayscale group-hover:grayscale-0"
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {ach.icon}
                  </motion.span>
                  <div>
                    <h3 className="font-bold text-[var(--color-dark)] dark:text-[rgb(245,235,235)] text-sm uppercase tracking-wider">{ach.title}</h3>
                    <p className="text-xs text-[var(--text-main)] dark:text-[rgb(228,208,208)] mt-1">{ach.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
