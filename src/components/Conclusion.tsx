"use client";

import { Reveal } from "./ui/Reveal";
import { TextReveal } from "./ui/TextReveal";
import { Magnetic } from "./ui/Magnetic";

export const Conclusion = () => {
  const links = [
    { label: "Email", href: "mailto:mahdialihanafiah@gmail.com", desc: "For work and collaborations" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ali-hanafiah-778365353/", desc: "Professional network" },
    { label: "GitHub", href: "https://github.com/Mahdiali97", desc: "Code architecture and experiments" },
    { label: "Résumé", href: "/Portfolio-Ali/docs/Resume-Ali.pdf?v=2", desc: "Download the PDF résumé" }
  ];

  return (
    <section
      className="relative min-h-[90vh] bg-[var(--surface-ground)] text-[var(--text-primary)] flex flex-col justify-end pb-12 pt-32 lg:pt-0 transform-gpu"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-card)] to-transparent pointer-events-none opacity-50" />
      
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row justify-between items-end gap-16 mb-24 border-b border-[var(--border-strong)] pb-12">
           <div className="max-w-2xl">
             <Reveal direction="down">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--text-accent)] block mb-8">Conclusion / 05</span>
             </Reveal>
             <h2 className="text-5xl lg:text-8xl font-extrabold tracking-tighter uppercase leading-[0.85] mb-8">
                <TextReveal text="Direct" /> <br />
                <span className="font-serif italic font-normal text-[var(--text-secondary)] lowercase">
                   Communication
                </span>
             </h2>
             <Reveal direction="up" delay={0.2}>
                <p className="text-lg text-[var(--text-secondary)] font-light max-w-md leading-relaxed">
                   Currently based in Kuala Lumpur. Open to technical discussions, architectural reviews, and challenging roles where engineering and design intersect.
                </p>
             </Reveal>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {links.map((link, i) => (
            <Reveal key={link.label} direction="up" delay={0.3 + i * 0.1}>
              <Magnetic distance={0.15}>
                <a 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-4 py-8 border-t border-transparent hover:border-[var(--border-focus)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 focus-visible:bg-[var(--surface-raised)]"
                >
                  <div className="flex items-center justify-between">
                     <span className="text-2xl font-bold uppercase tracking-tight group-hover:text-[var(--text-accent)] transition-colors">
                       {link.label}
                     </span>
                     <div className="w-6 h-6 border rounded-full border-[var(--border-strong)] group-hover:border-[var(--text-accent)] flex items-center justify-center transition-colors">
                        <span className="text-[10px] transform -rotate-45 group-hover:text-[var(--text-accent)] transition-colors">→</span>
                     </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)] transition-colors">
                    {link.desc}
                  </span>
                </a>
              </Magnetic>
            </Reveal>
          ))}
        </div>

        <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
           <Reveal direction="up" delay={0.6}>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
                 Designed & Engineered by Ali Hanafiah
              </p>
           </Reveal>
           <Reveal direction="up" delay={0.7}>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
                 MY / {new Date().getFullYear()}
              </p>
           </Reveal>
        </div>

      </div>
    </section>
  );
};
