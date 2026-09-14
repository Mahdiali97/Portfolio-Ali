"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export const HeroCinema = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const pupilX = useTransform(mouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1000], [-4, 4]);
  const pupilY = useTransform(mouseY, [0, typeof window !== "undefined" ? window.innerHeight : 1000], [-4, 4]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const pills = [
    { text: "Vue.js", className: "top-12 left-10 md:left-24 rotate-[-6deg]" },
    { text: "React", className: "bottom-16 left-8 md:left-32 rotate-[8deg]" },
    { text: "Docker", className: "top-16 right-8 md:right-28 rotate-[12deg]" },
    { text: "FCDO Certified", className: "bottom-12 right-12 md:right-36 rotate-[-4deg]" },
  ];

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
      {/* Floating Pill Tags */}
      {pills.map((pill, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -15, 0],
            rotate: [0, index % 2 === 0 ? 3 : -3, 0],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute z-20 px-6 py-2 rounded-full border border-[var(--pill-border)] bg-[var(--pill-bg)] backdrop-blur-md text-[var(--pill-text)] font-mono text-sm shadow-xl hidden sm:block ${pill.className}`}
        >
          {pill.text}
        </motion.div>
      ))}

      {/* Main Kinetic Typography */}
      <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Cat Silhouette sitting on hero */}
        <motion.div 
          className="relative w-28 h-28 -mb-6 cursor-pointer"
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
            {/* Silhouette Body */}
            <path d="M 25 35 L 15 10 L 40 25 Z" fill="var(--cat-body)" stroke="var(--cat-stroke)" strokeWidth="1.5" />
            <path d="M 75 35 L 85 10 L 60 25 Z" fill="var(--cat-body)" stroke="var(--cat-stroke)" strokeWidth="1.5" />
            <ellipse cx="50" cy="50" rx="35" ry="30" fill="var(--cat-body)" stroke="var(--cat-stroke)" strokeWidth="1.5" />

            {/* Glowing Eyes */}
            <ellipse cx="38" cy="45" rx="7" ry="10" fill="var(--cat-eyes)" />
            <ellipse cx="62" cy="45" rx="7" ry="10" fill="var(--cat-eyes)" />

            {/* Interactive Eye Pupils */}
            <motion.ellipse
              cx="38"
              cy="45"
              rx="3"
              ry="6"
              fill="var(--cat-pupils)"
              style={{ x: pupilX, y: pupilY }}
            />
            <motion.ellipse
              cx="62"
              cy="45"
              rx="3"
              ry="6"
              fill="var(--cat-pupils)"
              style={{ x: pupilX, y: pupilY }}
            />
          </svg>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.95] text-[var(--text-main)] mb-8 uppercase"
        >
          Creative <br />
          <span className="font-serif italic font-normal tracking-normal text-[var(--text-accent)] lowercase">software engineer</span> <br />
          & UI/UX Designer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl font-light leading-relaxed"
        >
          Muhamad Ali Hanafiah — specialized in crafting highly aesthetic, scalable web systems, DevOps pipelines, and mobile applications.
        </motion.p>
      </div>
    </section>
  );
};
