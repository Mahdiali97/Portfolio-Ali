"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export const IntroMockups = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const springConfig = { damping: 20, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Scroll Parallax Y
  const card1Y = useTransform(scrollYProgress, [0, 1], [150, -50]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [250, -100]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [350, -150]);

  // Cursor Parallax Tilt
  const rotateX1 = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY1 = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  const rotateX2 = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY2 = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  const rotateX3 = useTransform(smoothY, [-0.5, 0.5], [20, -20]);
  const rotateY3 = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: any = {
    hidden: { opacity: 0, scale: 0.8, x: 50, rotateZ: 0 },
    show: (custom: any) => ({
      opacity: 1,
      scale: 1,
      x: custom.x,
      rotateZ: custom.rotateZ,
      transition: { type: "spring", stiffness: 70, damping: 15 }
    })
  };

  return (
    <section ref={containerRef} className="py-32 px-6 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Big Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <p className="font-mono text-sm tracking-widest text-[var(--color-dark)] uppercase">
            // Philosophy & Vision
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[var(--text-main)]">
            "I create <span className="font-serif italic font-normal text-[var(--text-accent)]">unconventional yet functional</span> applications and visually pleasing interfaces."
          </h2>
          <p className="text-[var(--text-muted)] leading-relaxed text-base md:text-lg">
            Blending strict Software Engineering principles with high-end creative direction. Every project is engineered for speed, responsiveness, and memorable user experiences.
          </p>
        </div>

        {/* Right Side Overlapping 3D Cards */}
        <motion.div 
          className="lg:col-span-6 relative h-[450px] flex items-center justify-center group"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          style={{ perspective: 1200 }}
        >
          {/* Mockup Card 1 - Spatie Hostel */}
          <motion.div
            custom={{ x: 0, rotateZ: -6 }}
            variants={cardVariants}
            style={{ y: card1Y, rotateX: rotateX1, rotateY: rotateY1 }}
            className="absolute w-72 sm:w-80 h-48 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl shadow-2xl left-4 top-10 flex flex-col justify-between overflow-hidden group/card"
          >
            {/* Background Image Layer */}
            <img 
              src="/images/projects/CRM1.png"
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1581291518655-9523b932edcf?auto=format&fit=crop&w=800&q=80"; }}
              alt="GEP Corporate UI"
              className="absolute inset-0 w-full h-full object-cover scale-100 group-hover/card:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Vignette & Gradient Shield */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent/40" />

            {/* Foreground UI Layer */}
            <div className="relative z-10 flex items-center justify-between p-5">
              <span className="font-mono text-xs font-bold text-white shadow-sm">Figma • UI Kit</span>
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            </div>
            <div className="relative z-10 p-5 mt-auto">
              <p className="text-xs text-gray-300">Design System</p>
              <h3 className="font-bold text-lg text-white">GEP Corporate</h3>
            </div>
          </motion.div>

          {/* Mockup Card 2 - UniPerks */}
          <motion.div
            custom={{ x: 0, rotateZ: 6 }}
            variants={cardVariants}
            style={{ y: card2Y, rotateX: rotateX2, rotateY: rotateY2 }}
            className="absolute w-72 sm:w-80 h-52 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl shadow-2xl right-4 top-20 flex flex-col justify-between overflow-hidden group/card"
          >
            {/* Background Image Layer */}
            <img 
              src="/images/projects/uniperks-mockup.png"
              onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"; }}
              alt="Campus Mobile E-Commerce"
              className="absolute inset-0 w-full h-full object-cover scale-100 group-hover/card:scale-105 transition-transform duration-700 ease-out translate-x-4 translate-y-4 drop-shadow-2xl"
            />
            {/* Vignette & Gradient Shield */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent/40" />

            {/* Foreground UI Layer */}
            <div className="relative z-10 flex items-center justify-between p-5">
              <span className="font-mono text-xs font-bold text-white shadow-sm">Flutter • Supabase</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </div>
            <div className="relative z-10 p-5 mt-auto">
              <p className="text-xs text-gray-300">Campus Mobile</p>
              <h3 className="font-bold text-lg text-white">E-Commerce</h3>
            </div>
          </motion.div>

          {/* Mockup Card 3 - Main Highlight */}
          <motion.div
            custom={{ x: 0, rotateZ: -2 }}
            variants={cardVariants}
            style={{ y: card3Y, rotateX: rotateX3, rotateY: rotateY3 }}
            className="absolute w-80 sm:w-88 h-56 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-2xl shadow-2xl z-10 flex flex-col justify-between overflow-hidden group/card"
          >
            {/* Background Image Layer */}
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
              alt="Local AI Engine"
              className="absolute inset-0 w-full h-full object-cover scale-100 group-hover/card:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Vignette & Gradient Shield */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/40" />

            {/* Foreground UI Layer */}
            <div className="relative z-10 flex items-center justify-between p-6">
              <span className="font-mono text-xs font-bold text-white shadow-sm">Docker • LLaMA</span>
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.9)] animate-pulse" />
            </div>
            <div className="relative z-10 p-6 mt-auto">
              <p className="text-xs font-mono text-gray-300">Infrastructure</p>
              <h3 className="font-bold text-xl text-white">Local AI Engine</h3>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
