"use client";

import { motion } from "framer-motion";

export const JourneyOutline = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-main)] uppercase">
          Process & <span className="font-serif italic font-normal text-[var(--text-accent)] lowercase">milestones</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Experience Pill */}
        <motion.div
          whileInView={{ scale: 1, opacity: 1 }}
          initial={{ scale: 0.95, opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative group p-10 rounded-[4rem] border-4 border-[var(--color-dark)] bg-transparent flex flex-col items-center text-center justify-center min-h-[400px] hover:bg-[var(--pill-bg)] transition-colors"
        >
          <div className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--color-dark)] text-[var(--bg-main)] font-mono text-xs uppercase">
            Experience
          </div>
          <h3 className="text-3xl font-bold mb-4 text-[var(--text-main)]">SecureLabX Sdn Bhd</h3>
          <p className="text-xl font-serif italic text-[var(--text-accent)] mb-4">Software Designer Intern</p>
          <p className="text-[var(--text-muted)] max-w-sm leading-relaxed">
            Feb - Aug 2026. Specialized in Figma-driven UI workflows, component standardization, and high-fidelity prototyping.
          </p>
        </motion.div>

        {/* Education Pill */}
        <motion.div
          whileInView={{ scale: 1, opacity: 1 }}
          initial={{ scale: 0.95, opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group p-10 rounded-[4rem] border-4 border-[var(--color-dark)] bg-transparent flex flex-col items-center text-center justify-center min-h-[400px] hover:bg-[var(--pill-bg)] transition-colors"
        >
          <div className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--color-dark)] text-[var(--bg-main)] font-mono text-xs uppercase">
            Education
          </div>
          <h3 className="text-3xl font-bold mb-4 text-[var(--text-main)]">Univ. Pendidikan Sultan Idris</h3>
          <p className="text-xl font-serif italic text-[var(--text-accent)] mb-4">BSc Software Engineering</p>
          <p className="text-[var(--text-muted)] max-w-sm leading-relaxed">
            Sep 2022 - Aug 2026. CGPA 3.85, Dean's List Awardee. Focused on enterprise system architecture and DevOps.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
