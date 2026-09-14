"use client";

import { motion } from "framer-motion";

export const MassiveFooter = () => {
  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/ali-hanafiah-778365353/" },
    { name: "GitHub", href: "https://github.com/Mahdiali97" },
    { name: "Email", href: "mailto:mahdialihanafiah@gmail.com" },
  ];

  return (
    <footer className="pt-40 bg-[var(--bg-main)] transition-colors duration-300">
      <div className="px-6 max-w-7xl mx-auto mb-40 text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-mono text-sm uppercase tracking-widest text-[var(--color-dark)] mb-6"
        >
          // Availability: Open for collaboration
        </motion.p>
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-[var(--text-main)] mb-12"
        >
          Let's work <br />
          <span className="font-serif italic font-normal text-[var(--text-accent)]">together.</span>
        </motion.h2>

        <div className="space-y-4">
          <a
            href="mailto:mahdialihanafiah@gmail.com"
            className="block text-2xl sm:text-4xl md:text-5xl font-bold text-[var(--text-main)] hover:text-[var(--text-accent)] transition-colors tracking-tight"
          >
            mahdialihanafiah@gmail.com
          </a>
          <p className="text-xl sm:text-2xl font-mono text-[var(--text-muted)]">
            +6013-5081967
          </p>
        </div>
      </div>

      {/* Social Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[var(--card-border)]">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="group relative py-12 flex items-center justify-center border-b md:border-b-0 md:border-r border-[var(--card-border)] overflow-hidden"
          >
            <motion.div
              initial={false}
              className="absolute inset-0 bg-[var(--footer-sweep)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo"
            />
            <span className="relative z-10 text-xl font-bold text-[var(--text-main)] group-hover:text-[var(--footer-sweep-text)] transition-colors duration-300">
              {link.name}
            </span>
          </a>
        ))}
      </div>
      
      <div className="py-8 text-center bg-[var(--bg-main)]">
        <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-tighter">
          © 2026 Muhamad Ali Hanafiah. Built with Next.js & Motion.
        </p>
      </div>
    </footer>
  );
};
