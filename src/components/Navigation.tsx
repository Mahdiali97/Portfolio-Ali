"use client";

import Link from "next/link";
import { Reveal } from "./ui/Reveal";
import { Magnetic } from "./ui/Magnetic";

export const Navigation = () => {
  const navItems = [
    { label: "Index", href: "#top" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-8 flex justify-between items-start pointer-events-none">
      <Reveal direction="none">
        <Magnetic>
          <Link
            href="/" 
            className="pointer-events-auto font-mono text-xs uppercase tracking-widest text-[var(--text-primary)] hover:text-[var(--text-accent)] transition-colors"
          >
            Ali Hanafiah / 2026
          </Link>
        </Magnetic>
      </Reveal>

      <div className="flex flex-col items-end gap-2">
        {navItems.map((item, i) => (
          <Reveal key={item.href} direction="right" delay={i * 0.1}>
            <Magnetic distance={0.2}>
              <a
                href={item.href}
                className="pointer-events-auto font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] transition-all duration-500 hover:tracking-[0.4em] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2"
              >
                {item.label}
              </a>
            </Magnetic>
          </Reveal>
        ))}
      </div>
    </nav>
  );
};
