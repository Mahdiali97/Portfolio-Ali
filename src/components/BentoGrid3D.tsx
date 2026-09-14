"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Column, Text, Row } from "@once-ui-system/core";

const SkillCard = ({ title, stack, iconColor }: { title: string, stack: string[], iconColor: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div
      onMouseMove={(e: any) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="bg-white/50 backdrop-blur-md border border-dark/10 p-6 rounded-3xl shadow-sm hover:shadow-3d transition-shadow"
    >
      <motion.div style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-xl font-bold mb-6 text-dark">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {stack.map(s => (
                <span key={s} className="px-3 py-1 bg-mid-ambient/50 text-dark text-xs font-mono rounded-full border border-dark/10">
                    {s}
                </span>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const BentoGrid3D = () => {
    return (
        <section id="about" className="py-24 px-6 perspective-1000 flex flex-col items-center w-full">
            <Column maxWidth="m" horizontal="center" gap="xl" style={{ width: '100%' }}>
                <Text variant="heading-strong-xl" className="text-dark">Core Arsenal</Text>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    <SkillCard title="Frontend UI" stack={["Vue.js", "React", "TypeScript", "Tailwind CSS"]} iconColor="dark" />
                    <SkillCard title="Backend Sys" stack={["Laravel", "MySQL", "Firebase", "Supabase"]} iconColor="dark" />
                    <SkillCard title="Cloud / DevOps" stack={["Docker", "Linux/Ubuntu", "MS Azure"]} iconColor="dark" />
                    <SkillCard title="Mobile & UX" stack={["Flutter", "Figma", "Adobe Illustrator"]} iconColor="dark" />
                </div>
            </Column>
        </section>
    );
};
