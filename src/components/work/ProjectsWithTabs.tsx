"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Column, Row, Text, Icon } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import { CaseStudyTakeover } from "./CaseStudyTakeover";

const WorkInteractiveCat = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const pupilX = useTransform(
    mouseX,
    [0, typeof window !== "undefined" ? window.innerWidth : 1000],
    [-3, 3]
  );
  const pupilY = useTransform(
    mouseY,
    [0, typeof window !== "undefined" ? window.innerHeight : 1000],
    [-3, 3]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="relative w-20 h-20 -mb-3 mx-auto cursor-pointer"
      whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        {/* Silhouette Body */}
        <path
          d="M 25 35 L 15 10 L 40 25 Z"
          fill="var(--cat-body)"
          stroke="var(--cat-stroke)"
          strokeWidth="1.5"
        />
        <path
          d="M 75 35 L 85 10 L 60 25 Z"
          fill="var(--cat-body)"
          stroke="var(--cat-stroke)"
          strokeWidth="1.5"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="35"
          ry="30"
          fill="var(--cat-body)"
          stroke="var(--cat-stroke)"
          strokeWidth="1.5"
        />

        {/* Glowing Eyes */}
        <ellipse cx="38" cy="45" rx="7" ry="10" fill="var(--cat-eyes)" />
        <ellipse cx="62" cy="45" rx="7" ry="10" fill="var(--cat-eyes)" />

        {/* Interactive Pupils */}
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
  );
};

export function ProjectsWithTabs({ allProjects }: { allProjects: any[] }) {
  const [activeTab, setActiveTab] = useState<"Project" | "Design">("Project");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const sortedProjects = [...allProjects].sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  const displayedProjects = sortedProjects.filter(
    (p) => (p.metadata.category || "Project") === activeTab
  );

  const tabs: Array<{ id: "Project" | "Design"; label: string; icon: "rocket" | "gallery" }> = [
    { id: "Project", label: "Project", icon: "rocket" },
    { id: "Design", label: "Design", icon: "gallery" },
  ];

  return (
    <Column fillWidth horizontal="center" className="max-w-5xl mx-auto px-4 sm:px-6">
      {/* Interactive Cat Mascot sitting on Tabs Header */}
      <WorkInteractiveCat />

      {/* Fluid Glassmorphic Tab Selector with layoutId Gliding Background */}
      <div className="flex justify-center mb-16 relative z-20">
        <div className="relative flex p-1.5 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-2xl shadow-xl">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative z-10 flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-semibold transition-colors duration-200 outline-none cursor-pointer ${
                  isActive
                    ? "text-[#0a0a0a]"
                    : "text-[var(--color-dark)] hover:text-[var(--text-main)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-work-tab-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[var(--color-mid-hover)] shadow-md -z-10"
                  />
                )}
                <Icon name={tab.icon} size="s" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects List with Staggered Entrance and 3D Cards */}
      <div className="w-full flex flex-col gap-16 mb-32">
        {displayedProjects.length > 0 ? (
          displayedProjects.map((post, index) => (
            <ProjectCard
              onSelect={() => setSelectedProject(post)}
              slug={post.slug}
              priority={index < 2}
              key={post.slug}
              href={`/work/${post.slug}`}
              images={post.metadata.images}
              title={post.metadata.title}
              description={post.metadata.summary}
              content={post.content}
              avatars={
                post.metadata.team?.map((member: any) => ({
                  src: member.avatar,
                })) || []
              }
              link={post.metadata.link || ""}
            />
          ))
        ) : (
          <div className="text-center py-20">
            <Text
              align="center"
              variant="body-default-m"
              className="text-[var(--text-muted)]"
            >
              No projects found in this category.
            </Text>
          </div>
        )}
      </div>
      {/* Takeover Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyTakeover
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </Column>
  );
}
