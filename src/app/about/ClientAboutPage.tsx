"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { person, about, social } from "@/resources";

const MagneticPill = ({ children, href }: { children: React.ReactNode, href: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-flex items-center px-6 py-3 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--pill-bg)] transition-colors text-[var(--text-main)] hover:text-[var(--text-accent)] font-mono text-sm tracking-wide z-10"
    >
      {children}
    </motion.a>
  );
};

const InteractiveSidebarCat = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const pupilX = useTransform(mouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1000], [-3, 3]);
  const pupilY = useTransform(mouseY, [0, typeof window !== "undefined" ? window.innerHeight : 1000], [-3, 3]);
  const catRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

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
      style={{ rotate: catRotate }}
      className="w-48 h-48 mx-auto mt-12 cursor-pointer"
      whileHover={{ scale: 1.05 }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
        {/* Sleek Silhouette Body */}
        <path d="M 20 45 L 10 10 L 40 30 Z" fill="var(--cat-body)" stroke="var(--cat-stroke)" strokeWidth="1" />
        <path d="M 80 45 L 90 10 L 60 30 Z" fill="var(--cat-body)" stroke="var(--cat-stroke)" strokeWidth="1" />
        <ellipse cx="50" cy="60" rx="40" ry="35" fill="var(--cat-body)" stroke="var(--cat-stroke)" strokeWidth="1" />

        {/* Eyes */}
        <ellipse cx="35" cy="55" rx="8" ry="12" fill="var(--cat-eyes)" />
        <ellipse cx="65" cy="55" rx="8" ry="12" fill="var(--cat-eyes)" />

        {/* Tracking Pupils */}
        <motion.ellipse
          cx="35"
          cy="55"
          rx="4"
          ry="7"
          fill="var(--cat-pupils)"
          style={{ x: pupilX, y: pupilY }}
        />
        <motion.ellipse
          cx="65"
          cy="55"
          rx="4"
          ry="7"
          fill="var(--cat-pupils)"
          style={{ x: pupilX, y: pupilY }}
        />
      </svg>
    </motion.div>
  );
};

const BentoCard = ({ title, tags }: { title: string, tags: string[] }) => {
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useTransform(cardY, [-100, 100], [10, -10]);
  const rotateY = useTransform(cardX, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cardX.set(e.clientX - rect.left - rect.width / 2);
    cardY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="p-8 sm:p-10 rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--color-mid-hover)] transition-colors h-[320px] flex flex-col justify-between"
    >
      <h3 className="text-2xl font-bold text-[var(--text-main)] mb-6 transform-gpu translate-z-10">{title}</h3>
      <div className="flex flex-wrap gap-3 transform-gpu translate-z-20">
        {tags.map((tag, i) => (
          <span key={i} className="px-4 py-2 rounded-full border border-[var(--pill-border)] bg-[var(--pill-bg)] text-[var(--pill-text)] text-sm font-mono shadow-md">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default function ClientAboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const title = "Ali Hanafiah".split(" ");
  const subtitle = "Software Engineer & UI/UX Designer".split(" ");

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col lg:flex-row transition-colors duration-300 relative z-10 pt-20">
      
      {/* Sticky Left Sidebar */}
      <aside className="lg:w-1/3 lg:sticky lg:top-0 lg:h-screen p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-r border-[var(--card-border)]/50 z-20">
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--color-dark)]/50 shadow-2xl relative">
            <Image src={person.avatar} alt="Profile" fill className="object-cover" />
          </div>
        </div>
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2">// Current status</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-sm text-[var(--text-main)]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Available for work
          </div>
        </div>
        
        {/* Sidebar Cat - Hidden */}
      </aside>

      {/* Scrolling Right Column */}
      <main className="lg:w-2/3 p-8 sm:p-12 lg:p-24 z-10">
        
        {/* 1. Hero / Intro */}
        <section className="min-h-[70vh] flex flex-col justify-center mb-32">
          <div className="mb-8">
            <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tighter leading-none mb-4 flex flex-wrap gap-x-4 overflow-hidden">
              {title.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-[var(--text-accent)] flex flex-wrap gap-x-3 overflow-hidden">
              {subtitle.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
            className="text-lg md:text-xl leading-relaxed text-[var(--text-muted)] max-w-2xl mb-12"
          >
            Ali Hanafiah is a Software Engineering student from Universiti Pendidikan Sultan Idris (UPSI). With a deep passion for clean architecture and beautiful interfaces, I bridge the gap between robust backend systems and award-winning frontend experiences.
          </motion.p>

          <div className="flex flex-wrap gap-4">
            <MagneticPill href="https://github.com/Mahdiali97">GitHub</MagneticPill>
            <MagneticPill href="https://www.linkedin.com/in/ali-hanafiah-778365353/">LinkedIn</MagneticPill>
            <MagneticPill href="mailto:mahdialihanafiah@gmail.com">Email Me</MagneticPill>
          </div>
        </section>

        {/* 2. Work Experience */}
        <section className="mb-40 relative">
          <div className="sticky top-24 mb-12">
            <h3 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] mb-2">SecureLabX Sdn Bhd</h3>
            <p className="font-mono text-[var(--text-accent)]">Software Designer Intern // Feb 2026 - Aug 2026</p>
          </div>
          
          <div className="pl-0 md:pl-12 space-y-8 max-w-3xl">
            {[
              "Crafted intuitive digital interfaces via Figma, focusing on high-fidelity wireframes and prototyping.",
              "Spearheaded the standardization of UI components, ensuring seamless consistency across enterprise dashboards.",
              "Collaborated closely with engineering teams to bridge design intent with pixel-perfect frontend implementations."
            ].map((bullet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2, type: "spring", stiffness: 50, damping: 20 }}
                className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] text-lg text-[var(--text-muted)]"
              >
                {bullet}
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. Studies (SVG Timeline) */}
        <section className="mb-40 relative">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-16 tracking-tighter">Academic Timeline</h2>
          
          <div className="relative pl-12 border-l-2 border-transparent">
            {/* Animated SVG Line */}
            <div className="absolute left-[-2px] top-4 bottom-4 w-[4px]">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 4 100">
                {/* Background Track */}
                <line x1="2" y1="0" x2="2" y2="100" stroke="var(--card-border)" strokeWidth="4" vectorEffect="non-scaling-stroke" />
                {/* Drawing Track */}
                <motion.line
                  x1="2" y1="0" x2="2" y2="100"
                  stroke="var(--color-dark)"
                  strokeWidth="4"
                  vectorEffect="non-scaling-stroke"
                  style={{ pathLength: scrollYProgress, strokeDasharray: "1 1" }}
                />
              </svg>
            </div>

            <div className="mb-24 relative">
              <div className="absolute w-6 h-6 bg-[var(--bg-main)] border-4 border-[var(--color-dark)] rounded-full -left-[60px] top-1 z-10" />
              <h3 className="text-2xl font-bold mb-1">Universiti Pendidikan Sultan Idris (UPSI)</h3>
              <p className="font-mono text-[var(--text-accent)] mb-4">BSc Software Engineering // 2022 - Present</p>
              <p className="text-[var(--text-muted)]">Current CGPA: 3.85. Dean's List Awardee (Semesters 1-5). Focused on software architecture, DevOps, and full-stack engineering.</p>
            </div>

            <div className="relative">
              <div className="absolute w-6 h-6 bg-[var(--bg-main)] border-4 border-[var(--card-border)] rounded-full -left-[60px] top-1 z-10" />
              <h3 className="text-2xl font-bold mb-1">Kedah Matriculation College</h3>
              <p className="font-mono text-[var(--text-muted)] mb-4">Science Module 1 // 2020 - 2021</p>
              <p className="text-[var(--text-muted)]">Foundation in physical sciences and mathematics. Graduated with CGPA 3.32.</p>
            </div>
          </div>
        </section>

        {/* 4. Technical Skills (3D Grid) */}
        <section className="mb-32">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-16 tracking-tighter">Technical Arsenal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BentoCard 
              title="Frontend Development"
              tags={["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "Framer Motion"]}
            />
            <BentoCard 
              title="Backend & Database"
              tags={["Node.js", "Express", "Laravel", "MySQL", "Prisma", "Supabase", "Firebase"]}
            />
            <BentoCard 
              title="UI/UX & Design"
              tags={["Figma", "Adobe Illustrator", "Prototyping", "Design Systems", "Wireframing"]}
            />
            <BentoCard 
              title="DevOps & Mobile"
              tags={["Docker", "Linux/Ubuntu", "Git/GitHub", "Flutter", "Dart", "Vercel"]}
            />
          </div>
        </section>

      </main>
    </div>
  );
}
