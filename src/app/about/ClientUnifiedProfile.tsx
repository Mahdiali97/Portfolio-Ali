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
      <section className="w-full flex flex-col items-center pt-20">
        
        {/* BULLETPROOF FULL BLEED BREAKOUT CONTAINER */}
        <div className="relative flex flex-col items-center justify-center mt-12 md:mt-24 w-screen left-1/2 -translate-x-1/2 min-h-[60vh] py-10 overflow-hidden">
        
          {/* LAYER 1: Background Solid Text (Single Line) */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden">
            <h1 className="font-black leading-none tracking-tighter text-[#0a0a0a] dark:text-[rgb(245,235,235)] text-center whitespace-nowrap opacity-100" style={{ fontSize: 'clamp(3rem, 10vw, 13vw)' }}>
              ALI HANAFIAH
            </h1>
          </div>
        
          {/* LAYER 2: The Floating Subject (Re-centered) */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <motion.div 
              animate={{ y: [-12, 12, -12] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-72 md:w-[32rem] h-auto drop-shadow-2xl translate-y-4"
            >
              <Image 
                src="/Portfolio-Ali/images/ALI-HANAFIAH.png"
                alt="Ali Hanafiah Creative Engineer"
                width={800}
                height={800}
                className="w-full h-auto object-contain"
                unoptimized
                priority
              />
            </motion.div>
          </div>

          {/* Floating Tech Icons */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="relative w-full max-w-4xl h-full flex items-center justify-center translate-y-4">
              {/* Photoshop - Top Left */}
              <motion.div
                animate={{ y: [0, -15, 0], x: [0, 5, 0], rotate: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-[15%] left-[8%] md:left-[18%] w-12 h-12 md:w-16 md:h-16 shadow-xl z-20 pointer-events-none"
              >
                <Image src="https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" alt="Photoshop" width={64} height={64} />
              </motion.div>

              {/* Figma - Top Right */}
              <motion.div
                animate={{ y: [0, 15, 0], x: [0, -5, 0], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="absolute top-[10%] right-[8%] md:right-[18%] w-12 h-12 md:w-16 md:h-16 shadow-xl z-20 pointer-events-none"
              >
                <Image src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Figma" width={64} height={64} />
              </motion.div>

              {/* Illustrator - Bottom Left */}
              <motion.div
                animate={{ y: [0, 20, 0], x: [0, 10, 0], rotate: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute bottom-[20%] left-[5%] md:left-[12%] w-12 h-12 md:w-16 md:h-16 shadow-xl z-20 pointer-events-none"
              >
                <Image src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg" alt="Illustrator" width={64} height={64} />
              </motion.div>

              {/* React - Bottom Right */}
              <motion.div
                animate={{ y: [0, -20, 0], x: [0, -10, 0], rotate: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                className="absolute bottom-[15%] right-[5%] md:right-[12%] w-12 h-12 md:w-16 md:h-16 shadow-xl z-20 pointer-events-none"
              >
                <Image src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width={64} height={64} />
              </motion.div>
            </div>
          </div>
        
          {/* LAYER 3: Foreground Outlined Text (Single Line) */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none overflow-hidden">
            <h1 className="font-black leading-none tracking-tighter text-transparent [-webkit-text-stroke:2px_#0a0a0a] dark:[-webkit-text-stroke:2px_rgb(245,235,235)] text-center drop-shadow-sm whitespace-nowrap opacity-100" style={{ fontSize: 'clamp(3rem, 10vw, 13vw)' }}>
              ALI HANAFIAH
            </h1>
          </div>
        </div>
        
        {/* LAYER 4: High-Contrast Bio & Unified Buttons */}
        <div className="relative z-40 mt-8 md:mt-16 flex flex-col items-center text-center max-w-2xl px-4 mx-auto mb-16">
          <h2 className="text-neutral-900 dark:text-neutral-300 font-mono text-xs md:text-sm tracking-widest uppercase mb-6 font-bold">
            Software Engineer, DevOps & UI/UX
          </h2>
          <p className="text-black/80 dark:text-white/80 text-base md:text-lg leading-relaxed mb-10 font-medium">
            Software Engineering student from UPSI. With a deep passion for clean architecture and beautiful interfaces, I bridge the gap between robust backend systems and award-winning frontend experiences.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4">
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
            </div>
            <div>
              <MagneticButton href="mailto:mahdialihanafiah@gmail.com">
                <Icon name="email" size="xs" /> Email Me
              </MagneticButton>
            </div>
          </div>
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
