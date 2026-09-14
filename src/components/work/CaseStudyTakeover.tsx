"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Icon, Button } from "@once-ui-system/core";
import Image from "next/image";

interface CaseStudyTakeoverProps {
  project: any;
  onClose: () => void;
}

function RenderProjectBody({ content }: { content: string }) {
  if (!content) return null;
  // Parse sections by ## and list items
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc ml-6 space-y-3 my-4">
          {currentList.map((item, idx) => {
            const parts = item.split(":");
            if (parts.length > 1) {
              return (
                <li key={idx} className="text-lg leading-relaxed text-[var(--text-main)] dark:text-[rgb(228,208,208)]">
                  <strong className="text-[var(--color-dark)] dark:text-[rgb(245,235,235)] font-bold">{parts[0]}:</strong>
                  {parts.slice(1).join(":")}
                </li>
              );
            }
            return (
              <li key={idx} className="text-lg leading-relaxed text-[var(--text-main)] dark:text-[rgb(228,208,208)]">
                {item}
              </li>
            );
          })}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={`h2-${index}`} className="text-2xl font-bold text-[var(--color-dark)] dark:text-[rgb(245,235,235)] uppercase tracking-widest mt-12 mb-6">
          {trimmed.replace("## ", "")}
        </h2>
      );
    } else if (trimmed.startsWith("- ")) {
      currentList.push(trimmed.replace("- ", "").replace(/\*\*/g, ""));
    } else if (trimmed.length > 0 && !trimmed.startsWith("<")) {
      flushList();
      elements.push(
        <p key={`p-${index}`} className="text-lg leading-relaxed text-[var(--text-main)] dark:text-[rgb(228,208,208)] mb-6">
          {trimmed}
        </p>
      );
    }
  });

  flushList();
  return <div>{elements}</div>;
}

export const CaseStudyTakeover: React.FC<CaseStudyTakeoverProps> = ({ project, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  // Subtle parallax for the massive hero image
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Lock body scroll and pause window Lenis when overlay is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("lenis:stop"));

    return () => {
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("lenis:start"));
    };
  }, []);

  const { slug, metadata } = project;

  // Background opacity shifting for HR Payroll System
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.95]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="fixed inset-0 z-[500] bg-[var(--bg-main)] text-[var(--text-main)] overflow-y-auto"
      ref={containerRef}
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      style={{
        backgroundColor: slug === "hr-payroll-system" 
          ? (typeof window !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light' ? `rgba(245, 235, 235, ${bgOpacity.get()})` : `rgba(10, 10, 10, ${bgOpacity.get()})`)
          : undefined
      }}
    >
      {/* Close Button */}
      <div className="fixed top-6 right-6 z-[110]">
        <button
          onClick={onClose}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--pill-bg)] border border-[var(--card-border)] backdrop-blur-md hover:bg-[var(--color-mid-hover)]/40 transition-colors"
        >
          <Icon name="close" size="m" />
        </button>
      </div>

      {/* Massive Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        {metadata.images && metadata.images.length > 0 && (
          <motion.div
            layoutId={`image-${slug}`}
            className="absolute inset-0 w-full h-full"
            style={{ y: heroY }}
          >
            <Image
              src={metadata.images[0]}
              alt={metadata.title}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)]/40 to-transparent" />
          </motion.div>
        )}

        <div className="absolute bottom-10 left-0 px-6 md:px-16 lg:px-24 w-full">
          <motion.h1
            layoutId={`title-${slug}`}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-[var(--text-main)]"
          >
            {metadata.title}
          </motion.h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 md:px-16 lg:px-24 py-16 max-w-6xl mx-auto">
        {/* Dynamic Content based on Slug */}

        {/* ================== CODING PROJECTS (UniPerks, KHAR, Local LLaMA, Hermes Agent) ================== */}
        {(slug === "uniperks" || slug === "khar-hostel-portal" || slug === "local-llama-ai" || slug === "hermes-agent") && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="flex flex-col gap-16"
          >
            {/* Overview & Live Button */}
            <div className="flex flex-col md:flex-row gap-12 border-b border-[var(--card-border)] pb-12">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[var(--color-dark)] dark:text-[rgb(245,235,235)] uppercase tracking-widest mb-6">Overview</h2>
                <p className="text-lg leading-relaxed text-[var(--text-main)] dark:text-[rgb(228,208,208)] mb-8">
                  {metadata.summary}
                </p>
                {metadata.link && (
                  <a
                    href={metadata.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--text-main)] dark:bg-[rgb(245,235,235)] text-[var(--bg-main)] dark:text-[#0a0a0a] hover:opacity-80 transition-all font-mono font-bold text-sm tracking-wide"
                  >
                    <Icon name="rocket" size="s" /> View Live Application
                  </a>
                )}
              </div>
            </div>

            {/* Render MDX content natively with custom styling applied */}
            <div className="w-full">
              <RenderProjectBody content={project.content} />
            </div>
          </motion.div>
        )}

        {/* ================== DESIGN TAB: GEP CRM System ================== */}
        {slug === "gep-crm-system" && (
          <div className="flex flex-col gap-0 w-full mt-10">
            {["CRM1.png", "CRM2.png", "CRM3.png", "CRM4.png", "CRM5.png"].map((img, i) => (
              <motion.div
                key={img}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 50, damping: 20, delay: i * 0.1 }}
                className="w-full relative"
              >
                <img
                  src={`/Portfolio-Ali/images/projects/${img}`}
                  alt={`CRM Screenshot ${i + 1}`}
                  className="w-full h-auto block"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* ================== DESIGN TAB: UniPerks UI/UX Case Study ================== */}
        {slug === "uniperks-design" && (
          <div className="flex flex-col gap-24">
            <section>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] mb-6">Overview</h2>
              <p className="text-xl text-[var(--text-muted)] leading-relaxed mb-10 max-w-4xl">
                UniPerks is a gamified university merchandise e-commerce platform designed for Universiti Pendidikan Sultan Idris (UPSI). Students earn coins by completing quizzes and can redeem them for vouchers or spend them in the in-app store.
              </p>
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                src="/Portfolio-Ali/images/projects/uniperks.png"
                className="w-full rounded-2xl shadow-2xl"
              />
            </section>

            <section>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] mb-6">The Existing Design</h2>
              <p className="text-xl text-[var(--text-muted)] leading-relaxed mb-10 max-w-4xl">
                Before UniPerks, UPSI relied on a basic catalog website. There was no integrated checkout system for students to purchase official merchandise. Fragmented user journey caused by external Shopee redirects. No centralised native app for purchases and voucher redemption. Lack of university control over the third-party shopping experience. Inability to integrate student-focused incentives like digital coins.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["uniperks-before-home.png", "uniperks-before-categories.png", "uniperks-before-checkout.png"].map((img, i) => (
                  <motion.img
                    key={img}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    src={`/Portfolio-Ali/images/projects/${img}`}
                    className="w-full rounded-xl shadow-lg border border-[var(--card-border)]"
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] mb-6">User Research & Persona</h2>
              <p className="text-xl text-[var(--text-muted)] leading-relaxed mb-10 max-w-4xl">
                Understanding student habits and motivations to build a seamless purchasing and reward system.
              </p>
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                src="/Portfolio-Ali/images/projects/uniperks-persona.png"
                className="w-full rounded-2xl shadow-xl"
              />
            </section>

            <section>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] mb-6">Wireframes & Iterations</h2>
              <p className="text-xl text-[var(--text-muted)] leading-relaxed mb-10 max-w-4xl">
                Starting with low-fidelity sketches and moving to digital wireframes in Figma.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {["uniperks-wf-home.png", "uniperks-wf-shop.png", "uniperks-wf-voucher.png", "uniperks-wf-quiz.png", "uniperks-wf-checkout.png", "uniperks-wf-ordertracking.png"].map((img, i) => (
                  <motion.img
                    key={img}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    src={`/Portfolio-Ali/images/projects/${img}`}
                    className="w-full rounded-xl shadow-lg border border-[var(--card-border)]"
                  />
                ))}
              </div>
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                src="/Portfolio-Ali/images/projects/uniperks-hifi-screens.png"
                className="w-full rounded-2xl shadow-xl mt-6"
              />
            </section>

            <section>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--text-main)] mb-6">Full Screen Mockups</h2>
              <div className="flex flex-col gap-10">
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  src="/Portfolio-Ali/images/projects/uniperks.png"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  src="/Portfolio-Ali/images/projects/uniperks-mockup.png"
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
            </section>
          </div>
        )}

        {/* ================== DESIGN TAB: HR Payroll System ================== */}
        {slug === "hr-payroll-system" && (
          <div className="flex flex-col gap-0 w-full mt-10">
            {["HR1.png", "HR2.png", "HR3.png", "HR4.png"].map((img, i) => (
              <motion.div
                key={img}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 50, damping: 20, delay: i * 0.1 }}
                className="w-full relative"
              >
                <img
                  src={`/Portfolio-Ali/images/projects/${img}`}
                  alt={`HR Screenshot ${i + 1}`}
                  className="w-full h-auto block"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};