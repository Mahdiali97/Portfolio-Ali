"use client";

import { motion } from "framer-motion";
import { Column, Text } from "@once-ui-system/core";

const projects = [
  { title: "Local LLaMA AI", desc: "Docker containerized AI deployment.", tag: "DevOps" },
  { title: "CRM System", desc: "React, TS, MySQL client management.", tag: "Full-Stack" },
  { title: "UniPerks", desc: "Gamified campus e-commerce app.", tag: "Flutter" },
  { title: "KHAR Hostel", desc: "Laravel/Livewire booking system.", tag: "Backend" },
];

export const InteractiveGallery = () => {
    return (
        <section id="work" className="py-24 px-6 flex flex-col items-center w-full">
            <Column maxWidth="m" horizontal="center" gap="xl" style={{ width: '100%' }}>
                <Text variant="heading-strong-xl" className="text-dark">Selected Work</Text>
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((p, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05, z: 50 }}
                            className="bg-mid-ambient p-8 rounded-3xl cursor-pointer shadow-lg hover:shadow-3d transition-all border border-dark/10"
                        >
                            <Text variant="body-strong-l" className="text-dark">{p.title}</Text>
                            <Text variant="body-default-m" className="text-dark/70">{p.desc}</Text>
                        </motion.div>
                    ))}
                </div>
            </Column>
        </section>
    );
};
