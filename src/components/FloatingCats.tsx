"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const FloatingCats = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Cat 1 */}
      <motion.img
        src="/images/projects/cat.png"
        alt="Floating Cat"
        className="absolute opacity-40 blur-[1px] w-48 h-auto"
        initial={{ x: "-10vw", y: "80vh", rotate: -15 }}
        animate={{
          x: ["-10vw", "110vw"],
          y: ["80vh", "20vh"],
          rotate: [-15, 30],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Floating Cat 2 */}
      <motion.img
        src="/images/projects/Cat1.png"
        alt="Floating Cat Avatar"
        className="absolute opacity-30 blur-[2px] w-64 h-auto"
        initial={{ x: "110vw", y: "40vh", rotate: 20 }}
        animate={{
          x: ["110vw", "-20vw"],
          y: ["40vh", "90vh"],
          rotate: [20, -45],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
          delay: 5,
        }}
      />
      
      {/* Bobbing Cat in corner */}
      <motion.img
        src="/images/projects/cat.png"
        alt="Bobbing Cat"
        className="absolute top-24 left-10 opacity-20 w-32 h-auto hidden md:block"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
