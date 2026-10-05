"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./ui/Reveal";

type CaseStudy = {
  id: string;
  title: string;
  role: string;
  tech: string[];
  link?: string;
  context: string;
  approach: string;
  designProcess?: string;
  engineering?: string;
  features?: string;
  images?: string[];
  previewImage?: string;
  sequenceImages?: string[];
};

const caseStudies: CaseStudy[] = [
  {
    id: "uniperks",
    title: "UniPerks: Gamified Campus E-Commerce",
    role: "Lead Developer & UI Designer",
    tech: ["Flutter", "Supabase", "Dart", "Firebase", "Stripe", "Figma"],
    link: "https://uniperks-app.vercel.app/",
    context: "Universiti Pendidikan Sultan Idris (UPSI) relied on a fragmented, external catalog for merchandise, lacking an integrated checkout or student incentive structure.",
    approach: "Designed and engineered a native full-stack mobile commerce ecosystem. I combined a gamified daily educational quiz (which generates digital coin rewards) with a secure voucher wallet and role-based administrative dashboards.",
    designProcess: "Conducted user research to build personas representing typical UPSI students. Shifted from fragmented Shopee redirects to a centralized app. Developed low-fidelity wireframes into high-fidelity Figma mockups, standardizing the UI kit before development.",
    engineering: "Implemented the cross-platform application in Flutter, relying on Supabase (PostgreSQL, Row-Level Security) for real-time database synchronization and Firebase/Supabase Auth for security. Integrated Stripe for payment processing.",
    images: [
      "/Portfolio-Ali/images/projects/uniperks.png",
    ]
  },
  {
    id: "gep-crm",
    title: "GEP CRM System",
    role: "Full-Stack Developer & UI/UX",
    tech: ["React", "TypeScript", "Vite", "Express", "Prisma", "MySQL", "Tailwind"],
    context: "Enterprise client needed a scalable customer relationship management system to handle complex hierarchies of clients, zones, premises, and invoicing without overwhelming users.",
    approach: "Built a robust web application using a modern React + Vite frontend and a Prisma + Express backend. Prioritized rigorous state management and clean component architecture.",
    features: "Interactive pipelines, analytics dashboards, multi-module entity management (up to 2 PICs per company), single-step confirm modals, and intelligent drill-down widgets.",
    previewImage: "/Portfolio-Ali/images/projects/gep-crm-system.png",
    sequenceImages: [
      "/Portfolio-Ali/images/projects/CRM1.png",
      "/Portfolio-Ali/images/projects/CRM2.png",
      "/Portfolio-Ali/images/projects/CRM3.png",
      "/Portfolio-Ali/images/projects/CRM4.png",
      "/Portfolio-Ali/images/projects/CRM5.png",
    ],
  },
  {
    id: "khar-hostel",
    title: "KHAR Hostel Portal",
    role: "Full-Stack Developer",
    tech: ["Laravel", "Livewire", "Tailwind CSS", "MySQL", "Docker", "Fly.io"],
    link: "https://khar-hostel-portal-1788598384.fly.dev/",
    context: "Kolej Harun Aminurrashid (KHAR) suffered from physical queues and uncoordinated spreadsheet records during high-traffic intake windows.",
    approach: "Engineered a high-concurrency web allocation and residential governance portal. The platform provides automated, real-time dormitory room selection for thousands of university students.",
    features: "Multi-student group booking (synchronizing 2-4 peers), real-time allocation engine with Livewire preventing double-booking race conditions, and an administrative hub for staff.",
    images: [
      "/Portfolio-Ali/images/projects/khar-hostel-portal.png",
      "/Portfolio-Ali/images/gallery/KHARBuild.jpg"
    ]
  },
  {
    id: "hr-payroll",
    title: "HR Payroll System",
    role: "Full-Stack Developer & UI/UX",
    tech: ["Full-Stack", "Enterprise Architecture"],
    context: "Manual salary processing, leave tracking, and payslip generation caused administrative bottlenecks and errors.",
    approach: "Designed an enterprise Human Resources platform to centralize employee data and automate financial/administrative workflows.",
    features: "Automated salary calculations, integrated leave management, and dynamic payslip generation.",
    previewImage: "/Portfolio-Ali/images/projects/hr-payroll-system.png",
    sequenceImages: [
      "/Portfolio-Ali/images/projects/HR1.png",
      "/Portfolio-Ali/images/projects/HR2.png",
      "/Portfolio-Ali/images/projects/HR3.png",
      "/Portfolio-Ali/images/projects/HR4.png",
    ],
  },
  {
    id: "hermes-agent",
    title: "Hermes Agent",
    role: "AI Engineer",
    tech: ["Python", "LLM APIs", "Vector DB", "Docker", "Linux CLI"],
    context: "Rigid automation scripts fail when encountering unexpected errors or requiring dynamic context outside their hardcoded boundaries.",
    approach: "Engineered an autonomous AI agent framework designed for multi-step task decomposition and recursive problem-solving. It references contextual knowledge databases and executes dynamic pipelines.",
    features: "Dynamic task decomposition, persistent context/memory, and an autonomous tool execution loop that interacts with CLI commands and API endpoints.",
    images: [
      "/Portfolio-Ali/images/projects/Hermes.png"
    ]
  },
  {
    id: "local-llama",
    title: "Local LLaMA Infrastructure",
    role: "DevOps Engineer",
    tech: ["llama.cpp", "Docker", "Linux Server", "Bash"],
    context: "Cloud-hosted AI APIs presented high recurring costs and potential data sovereignty / privacy issues.",
    approach: "Deployed a privacy-centric, on-premise Large Language Model pipeline engineered to deliver zero-latency inference entirely offline on dedicated hardware.",
    features: "Containerized isolation of model weights (GGUF 4-bit Quantization), hardware resource optimization (CPU/GPU thread allocation), and an interactive CLI / API Gateway.",
    images: [
      "/Portfolio-Ali/images/projects/LLama.png"
    ]
  }
];

export const CaseStudies = () => {
  const [activeGallery, setActiveGallery] = useState<{ title: string; images: string[] } | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!activeGallery) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("lenis:stop"));
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveGallery(null);
      } else if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      window.dispatchEvent(new Event("lenis:start"));
      previousFocus?.focus();
    };
  }, [activeGallery]);

  return (
    <section id="case-studies" className="py-32 bg-[var(--surface-ground)] text-[var(--text-primary)]">
      <div className="max-w-4xl mx-auto px-6 mb-32">
        <Reveal direction="down">
           <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--text-accent)] block mb-8">Detailed Archives / 02.1</span>
           <h2 className="text-5xl font-extrabold tracking-tighter uppercase leading-[0.9]">
              Project <br />
              <span className="font-serif italic font-normal lowercase text-[var(--text-secondary)]">Case Studies</span>
           </h2>
        </Reveal>
      </div>

      <div className="space-y-48 max-w-7xl mx-auto px-6">
        {caseStudies.map((study, index) => (
          <article key={study.id} id={study.id} className="scroll-mt-32">
            <Reveal direction="up">
              <header className="mb-12 border-b border-[var(--border-strong)] pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div>
                    <h3 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">{study.title}</h3>
                    <p className="font-serif italic text-xl md:text-2xl text-[var(--text-accent)] mt-4">{study.role}</p>
                  </div>
                  {study.link && (
                    <a 
                      href={study.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-3 border border-[var(--text-primary)] font-mono text-xs uppercase tracking-widest hover:bg-[var(--text-primary)] hover:text-[var(--surface-ground)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
                    >
                      View Live
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-8">
                  {study.tech.map(t => (
                    <span key={t} className="px-3 py-1 border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-secondary)] font-mono text-[9px] uppercase tracking-widest">
                      {t}
                    </span>
                  ))}
                </div>
              </header>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5 space-y-12">
                <Reveal direction="up" delay={0.1}>
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--text-tertiary)]">Context & Problem</h4>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{study.context}</p>
                  </div>
                </Reveal>
                
                <Reveal direction="up" delay={0.2}>
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--text-tertiary)]">Approach</h4>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{study.approach}</p>
                  </div>
                </Reveal>

                {study.designProcess && (
                  <Reveal direction="up" delay={0.3}>
                    <div className="space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--text-tertiary)]">Design Process</h4>
                      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{study.designProcess}</p>
                    </div>
                  </Reveal>
                )}

                {(study.engineering || study.features) && (
                  <Reveal direction="up" delay={0.4}>
                    <div className="space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--text-tertiary)]">Implementation / Features</h4>
                      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{study.engineering || study.features}</p>
                    </div>
                  </Reveal>
                )}
              </div>

              <div className="lg:col-span-7 flex flex-col gap-8">
                {study.previewImage && study.sequenceImages ? (
                  <Reveal direction="up" delay={0.2}>
                    <button
                      type="button"
                      onClick={() => setActiveGallery({ title: study.title, images: study.sequenceImages! })}
                      aria-label={`Open ${study.title} design sequence`}
                      className="group relative block w-full overflow-hidden rounded-sm border border-[var(--border-strong)] bg-[var(--surface-card)] text-left shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
                    >
                      <img
                        src={study.previewImage}
                        alt={`${study.title} preview`}
                        loading="lazy"
                        className="block h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#07090e]/95 to-transparent px-5 pb-5 pt-14">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white">View continuous design</span>
                        <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full border border-white/40 text-xl text-white transition-transform duration-300 group-hover:scale-110">↗</span>
                      </span>
                    </button>
                  </Reveal>
                ) : (
                  (study.images ?? []).map((img, i) => (
                    <Reveal key={img} direction="up" delay={0.2 + (i * 0.1)}>
                      <div className="overflow-hidden rounded-sm border border-[var(--border-strong)] shadow-2xl">
                        <img
                          src={img}
                          alt={`${study.title} project image ${i + 1}`}
                          loading="lazy"
                          className="h-auto w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                        />
                      </div>
                    </Reveal>
                  ))
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {activeGallery && (
          <motion.div
            role="presentation"
            className="fixed inset-0 z-[220] flex items-center justify-center bg-[#05070b]/95 p-2 backdrop-blur-sm md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.28, ease: "easeOut" }}
            onClick={(event) => {
              if (event.target === event.currentTarget) setActiveGallery(null);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-gallery-title"
              className="relative h-[92vh] w-[96vw] max-w-[1440px] overflow-hidden border border-white/20 bg-[#080a10] shadow-[0_24px_100px_rgba(0,0,0,0.65)] md:h-[90vh] md:w-[92vw]"
              initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.97 }}
              animate={{ scale: 1 }}
              exit={shouldReduceMotion ? { scale: 1 } : { scale: 0.985 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.32, ease: [0.2, 0.75, 0.25, 1] }}
            >
              <header className="absolute inset-x-0 top-0 z-10 flex h-14 items-center justify-between border-b border-white/15 bg-[#080a10]/95 px-4 backdrop-blur md:px-6">
                <h2 id="case-study-gallery-title" className="min-w-0 truncate pr-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white md:text-xs">
                  {activeGallery.title} <span className="text-white/45">/ Design Sequence</span>
                </h2>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setActiveGallery(null)}
                  className="flex min-h-10 shrink-0 items-center gap-2 border border-white/30 px-3 font-mono text-[10px] uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-[#080a10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
                >
                  Close <span aria-hidden="true">×</span>
                </button>
              </header>

              <div
                aria-label={`${activeGallery.title} images in sequence`}
                data-lenis-prevent
                tabIndex={0}
                className="absolute inset-0 overflow-y-auto overscroll-contain pt-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--border-focus)]"
              >
                <div className="flex flex-col gap-0">
                  {activeGallery.images.map((image, index) => (
                    <img
                      key={image}
                      src={image}
                      alt={`${activeGallery.title} design screen ${index + 1}`}
                      loading={index < 2 ? "eager" : "lazy"}
                      className="m-0 block h-auto w-full shrink-0 border-0 p-0"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
