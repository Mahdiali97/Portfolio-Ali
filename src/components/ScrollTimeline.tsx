"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Column, Text } from "@once-ui-system/core";

export const ScrollTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section id="journey" className="py-24 px-6 flex flex-col items-center w-full" ref={containerRef}>
      <Column maxWidth="m" horizontal="center" gap="xl" style={{ width: '100%' }}>
        <Text variant="heading-strong-xl" className="text-dark">Milestones & Journey</Text>
        
        <div className="relative w-full max-w-2xl mx-auto pl-10 mt-12">
            {/* The SVG Line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-dark/10"></div>
            
            <svg 
                className="absolute left-[19px] top-0 bottom-0 w-2 h-full z-10" 
                preserveAspectRatio="none"
                style={{ overflow: "visible" }}
            >
                <motion.line
                    x1="0" y1="0" x2="0" y2="100%"
                    stroke="var(--color-dark)"
                    strokeWidth="3"
                    style={{ pathLength: scrollYProgress }}
                />
            </svg>

            {/* Items */}
            <div className="space-y-16">
                <div className="relative">
                    <div className="absolute -left-12 top-2 w-4 h-4 rounded-full bg-dark border-4 border-base shadow-lg z-20"></div>
                    <div className="bg-white/40 p-6 rounded-2xl border border-dark/10 shadow-sm">
                        <h3 className="text-xl font-bold text-dark">Software Designer Internship</h3>
                        <p className="text-sm font-mono text-dark/70 mb-4">SecureLabX Sdn Bhd | Feb - Aug 2026</p>
                        <p className="text-dark/80">Spearheaded Figma-driven UI workflows and component library standardization.</p>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -left-12 top-2 w-4 h-4 rounded-full bg-dark border-4 border-base shadow-lg z-20"></div>
                    <div className="bg-white/40 p-6 rounded-2xl border border-dark/10 shadow-sm">
                        <h3 className="text-xl font-bold text-dark">BSc Software Engineering</h3>
                        <p className="text-sm font-mono text-dark/70 mb-4">UPSI | Sep 2022 - Aug 2026</p>
                        <p className="text-dark/80">Dean's List (3.85 CGPA). FCDO Certified.</p>
                    </div>
                </div>
            </div>
        </div>
      </Column>
    </section>
  );
};
