"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useScroll, useVelocity } from "framer-motion";

export const BlackCatEntity = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const pupilX = useTransform(mouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1000], [-3, 3]);
  const pupilY = useTransform(mouseY, [0, typeof window !== "undefined" ? window.innerHeight : 1000], [-3, 3]);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    return scrollVelocity.on("change", (latestVelocity) => {
      if (Math.abs(latestVelocity) > 300) {
        setIsRunning(true);
      } else {
        const timeout = setTimeout(() => setIsRunning(false), 800);
        return () => clearTimeout(timeout);
      }
    });
  }, [scrollVelocity]);

  return (
    <motion.div
      className="fixed bottom-6 right-8 z-[100] pointer-events-auto cursor-pointer"
      animate={
        isRunning
          ? {
              y: [0, -12, 0, -12, 0],
              rotate: [0, -8, 8, -8, 0],
              scale: [1, 1.1, 1],
            }
          : {
              y: [0, -4, 0],
            }
      }
      transition={
        isRunning
          ? { repeat: Infinity, duration: 0.3, ease: "easeInOut" }
          : { repeat: Infinity, duration: 3, ease: "easeInOut" }
      }
    >
      <div className="relative group">
        {/* Cat State Label / Speech Bubble */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isRunning ? 1 : 0, y: isRunning ? 0 : 10 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 bg-dark text-base text-xs font-mono font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-md pointer-events-none"
        >
          {isRunning ? "Zoomies! 🐾" : "Watching you..."}
        </motion.div>

        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xl"
        >
          {/* Ears */}
          <path d="M 25 35 L 15 10 L 40 25 Z" fill="var(--color-dark)" />
          <path d="M 75 35 L 85 10 L 60 25 Z" fill="var(--color-dark)" />
          <path d="M 27 32 L 18 14 L 38 25 Z" fill="var(--color-mid-hover)" />
          <path d="M 73 32 L 82 14 L 62 25 Z" fill="var(--color-mid-hover)" />

          {/* Head */}
          <ellipse cx="50" cy="50" rx="35" ry="30" fill="var(--color-dark)" />

          {/* Eyes Outer */}
          <ellipse cx="38" cy="45" rx="9" ry="12" fill="var(--color-base)" />
          <ellipse cx="62" cy="45" rx="9" ry="12" fill="var(--color-base)" />

          {/* Interactive Pupils */}
          <motion.ellipse
            cx="38"
            cy="45"
            rx="4"
            ry="7"
            fill="var(--color-dark)"
            style={{ x: pupilX, y: pupilY }}
          />
          <motion.ellipse
            cx="62"
            cy="45"
            rx="4"
            ry="7"
            fill="var(--color-dark)"
            style={{ x: pupilX, y: pupilY }}
          />

          {/* Cute Nose & Whiskers */}
          <polygon points="47,56 53,56 50,60" fill="var(--color-mid-hover)" />
          <line x1="20" y1="52" x2="33" y2="54" stroke="var(--color-mid-ambient)" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="58" x2="32" y2="58" stroke="var(--color-mid-ambient)" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="52" x2="67" y2="54" stroke="var(--color-mid-ambient)" strokeWidth="2" strokeLinecap="round" />
          <line x1="82" y1="58" x2="68" y2="58" stroke="var(--color-mid-ambient)" strokeWidth="2" strokeLinecap="round" />

          {/* Paws */}
          <ellipse cx="35" cy="78" rx="8" ry="5" fill="var(--color-dark)" />
          <ellipse cx="65" cy="78" rx="8" ry="5" fill="var(--color-dark)" />
        </svg>
      </div>
    </motion.div>
  );
};
