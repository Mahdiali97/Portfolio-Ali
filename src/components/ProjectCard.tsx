"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  Icon,
  Text,
} from "@once-ui-system/core";
import Link from "next/link";

interface ProjectCardProps {
  onSelect?: () => void;
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

const MagneticButton = ({
  href,
  children,
  isExternal = false,
  icon,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  isExternal?: boolean;
  icon?: "arrowRight" | "arrowUpRightFromSquare";
  onClick?: (e: React.MouseEvent) => void;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.35);
    y.set(offsetY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = motion.a;

  return (
    <Component
      onClick={onClick}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      style={{ x: springX, y: springY }}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--pill-bg)] hover:bg-[var(--color-mid-hover)]/30 border border-[var(--card-border)] text-[var(--text-main)] hover:text-[var(--text-accent)] text-sm font-medium transition-colors backdrop-blur-md shadow-sm"
    >
      <span>{children}</span>
      {icon === "arrowRight" && <Icon name="arrowRight" size="xs" />}
      {icon === "arrowUpRightFromSquare" && <Icon name="arrowUpRightFromSquare" size="xs" />}
    </Component>
  );
};

export const ProjectCard: React.FC<ProjectCardProps & { slug?: string }> = ({
  onSelect,
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  slug,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for 3D tilt
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(smoothY, [-250, 250], [5, -5]);
  const rotateY = useTransform(smoothX, [-400, 400], [-5, 5]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="relative w-full rounded-3xl p-6 sm:p-8 bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--color-mid-hover)]/60 transition-colors shadow-2xl backdrop-blur-xl group overflow-hidden"
    >
      {/* Dynamic Cursor Glowing Backlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-3xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(134, 112, 112, 0.22), transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Exact Media Carousel */}
        {images && images.length > 0 && (
          <motion.div layoutId={slug ? `image-${slug}` : undefined} className="w-full rounded-2xl overflow-hidden">
            <Carousel
              sizes="(max-width: 960px) 100vw, 960px"
              items={images.map((image) => ({
                slide: image,
                alt: title,
              }))}
            />
          </motion.div>
        )}

        {/* Content Layout Preserved */}
        <Flex
          s={{ direction: "column" }}
          fillWidth
          paddingX="s"
          paddingTop="12"
          paddingBottom="12"
          gap="l"
        >
          {title && (
            <Flex flex={5}>
              <motion.h2 layoutId={slug ? `title-${slug}` : undefined} className="text-3xl md:text-4xl font-extrabold tracking-tighter text-[var(--text-main)] group-hover:text-[var(--text-accent)] transition-colors">
                {title}
              </motion.h2>
            </Flex>
          )}

          {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
            <Column flex={7} gap="16">
              {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
              
              {description?.trim() && (
                <Text wrap="balance" variant="body-default-s" className="text-[var(--text-muted)] leading-relaxed">
                  {description}
                </Text>
              )}

              {/* Magnetic Interactive Action Buttons */}
              <Flex gap="16" wrap className="pt-2">
                {content?.trim() && (
                  <MagneticButton 
                    onClick={(e: any) => {
                      if (onSelect) {
                        e.preventDefault();
                        onSelect();
                      }
                    }} 
                    href={href} 
                    icon="arrowRight"
                  >
                    Read case study
                  </MagneticButton>
                )}
                {link && (
                  <MagneticButton href={link} isExternal icon="arrowUpRightFromSquare">
                    View project
                  </MagneticButton>
                )}
              </Flex>
            </Column>
          )}
        </Flex>
      </div>
    </motion.div>
  );
};
