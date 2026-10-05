"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export const Reveal = ({ children, delay = 0, direction = "up", className = "" }: RevealProps) => {
  const shouldReduceMotion = useReducedMotion();

  const getVariants = () => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
    }

    const offsets = {
      up: { y: 30, x: 0 },
      down: { y: -30, x: 0 },
      left: { x: 30, y: 0 },
      right: { x: -30, y: 0 },
      none: { x: 0, y: 0 },
    };

    return {
      hidden: { opacity: 0, ...offsets[direction] },
      visible: { opacity: 1, x: 0, y: 0 },
    };
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={getVariants()}
      transition={{
        duration: shouldReduceMotion ? 0.1 : 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
