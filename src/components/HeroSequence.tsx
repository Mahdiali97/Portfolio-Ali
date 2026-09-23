"use client";

import { motion } from "framer-motion";
import { Button, Row, Column } from "@once-ui-system/core";

export const HeroSequence = () => {
  const name = "MUHAMAD ALI HANAFIAH BIN SABARUDIN";
  const words = name.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
    },
  };

  const roles = [
    { title: "Software Engineering Graduate", icon: "rocket" },
    { title: "FCDO DevOps Practitioner", icon: "terminal" },
    { title: "UI/UX Designer", icon: "gallery" },
  ];

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="overflow-hidden mb-4">
            <motion.h1 
                className="text-4xl md:text-7xl font-extrabold tracking-tighter leading-tight text-dark"
            >
                {words.map((word, index) => (
                    <motion.span
                        variants={child}
                        key={index}
                        className="inline-block mr-4"
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.h1>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, type: "spring", bounce: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mt-8 mb-12"
        >
            {roles.map((role, i) => (
                <div 
                    key={i}
                    className="group bg-mid-ambient hover:bg-mid-hover text-dark px-5 py-2.5 rounded-full border border-dark/10 shadow-sm transition-all duration-500 hover:scale-105 hover:-rotate-1"
                >
                    <span className="text-sm font-mono font-bold tracking-tight">{role.title}</span>
                </div>
            ))}
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
            <Button
                href="#work"
                variant="primary"
                size="l"
                className="bg-dark text-base border-none hover:scale-110 transition-transform px-10 rounded-full"
            >
                Explore Work
            </Button>
            <Button
                href="/Portfolio-Ali/docs/Resume-Ali.pdf?v=2"
                variant="secondary"
                size="l"
                className="border-dark text-dark hover:bg-mid-ambient transition-all px-10 rounded-full"
            >
                Get Resume
            </Button>
        </motion.div>
      </motion.div>

      {/* Decorative Physics-based background elements */}
      <motion.div
        animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -z-10 top-1/4 -right-12 w-64 h-64 rounded-full bg-mid-hover/20 blur-3xl"
      />

      <motion.div
        animate={{
            y: [0, 30, 0],
            rotate: [0, -10, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -z-10 bottom-1/4 -left-12 w-96 h-96 rounded-full bg-mid-ambient/30 blur-3xl"
      />
    </section>
  );
};
