"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const assets = [
  "/images/gallery/ComasPro1.jpg",
  "/images/gallery/ComasPro2.jpg",
  "/images/gallery/FCDO.jpg",
  "/images/gallery/iierich.jpg",
  "/images/gallery/KHARpresent.jpg",
  "/images/gallery/ProjectPresent.jpg",
  "/images/gallery/SyncFura.jpg",
  "/images/gallery/Uniperks.mp4",
  "/images/gallery/KHARBuild.jpg",
  "/images/gallery/ChampionFC25.jpg",
  "/images/gallery/FinalClass.jpg",
  "/images/gallery/ChampionPauxRekreasi.jpg",
  "/images/gallery/DeanList_sem1-8.jpg",
  "/images/gallery/SukiptMLBB.jpg",
  "/images/gallery/ChampionUPSIMLBB.jpg",
  "/images/gallery/Internship.jpg",
  "/images/gallery/Petanque2ndPlace.jpg",
  "/images/gallery/Muallim1stPlaceMLBB.jpg",
  "/images/gallery/UniversityMalayaMLBB3rdPlace.jpg",
  "/images/gallery/UniPerksFYP.jpg",
  "/images/gallery/AwardFYP.jpg",
  "/images/gallery/AwardFYP1.jpg",
  "/images/gallery/ProgramWithHaroq.jpg",
  "/images/gallery/SuperUPSI2ndPlaceMLBB.jpg",
];

function seededPositions(count: number) {
  const positions: { top: number; left: number; scale: number; rotate: number }[] = [];
  let seed = 42;
  const rnd = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  for (let i = 0; i < count; i++) {
    positions.push({
      top: 10 + rnd() * 65,
      left: 6 + rnd() * 75,
      scale: 0.75 + rnd() * 0.45,
      rotate: (rnd() - 0.5) * 20,
    });
  }
  return positions;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 70,
  damping: 18,
  mass: 0.9,
};

export default function GalleryView() {
  const [layoutMode, setLayoutMode] = useState<"linear" | "random">("linear");
  const isRandom = layoutMode === "random";
  const containerRef = useRef<HTMLDivElement>(null);

  const randomPositions = useMemo(() => seededPositions(assets.length), []);

  return (
    <div className="relative w-full h-[100vh] min-h-[600px] bg-transparent overflow-hidden flex flex-col pointer-events-none">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-10 py-6 pointer-events-none">
        <p className="font-mono text-xs tracking-widest text-white/40 uppercase">
          Gallery — {assets.length} moments
        </p>
        <p className="font-mono text-xs tracking-widest text-white/40 uppercase hidden sm:block">
          {isRandom ? "Exploded Map · drag to pan" : "Infinite Horizontal Slide · drag or hover"}
        </p>
      </div>

      {/* Constellation SVG — only in random mode */}
      <AnimatePresence>
        {isRandom && (
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          >
            {randomPositions.map((p, i) => (
              <motion.line
                key={`line-${i}`}
                x1="50%"
                y1="50%"
                x2={`${p.left + 8}%`}
                y2={`${p.top + 6}%`}
                stroke="rgba(134,112,112,0.32)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.02 }}
              />
            ))}
            <circle cx="50%" cy="50%" r="4" fill="rgba(213,180,180,0.9)" />
            <circle
              cx="50%"
              cy="50%"
              r="9"
              fill="none"
              stroke="rgba(213,180,180,0.25)"
              strokeWidth="1"
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Shared Animation Canvas Container */}
      <div
        ref={containerRef}
        className="flex-1 relative w-full h-full overflow-hidden flex items-center justify-center pointer-events-none"
      >
        <LayoutGroupContainer
          isRandom={isRandom}
          randomPositions={randomPositions}
        />
      </div>

      {/* Fixed toggle */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <div className="flex items-center rounded-full p-1 border border-[rgb(134,112,112)]/30 bg-white/5 backdrop-blur-md dark:border-[rgb(228,208,208)]/20 dark:bg-[#0a0a0a]/50 relative">
          <button
            onClick={() => setLayoutMode("linear")}
            className={`relative px-6 py-2.5 rounded-full text-sm font-mono tracking-wide transition-all duration-300 cursor-pointer ${
              layoutMode === "linear"
                ? "text-[#0a0a0a] font-semibold"
                : "text-[rgb(134,112,112)] hover:text-[rgb(110,90,90)] bg-transparent dark:text-[rgb(228,208,208)] dark:hover:text-[rgb(245,235,235)]"
            }`}
          >
            {layoutMode === "linear" && (
              <motion.div
                layoutId="gallery-toggle"
                className="absolute inset-0 rounded-full bg-[rgb(134,112,112)] dark:bg-[rgb(213,180,180)] shadow-sm pointer-events-none"
              />
            )}
            <span className="relative z-10">Linear</span>
          </button>
          <button
            onClick={() => setLayoutMode("random")}
            className={`relative px-6 py-2.5 rounded-full text-sm font-mono tracking-wide transition-all duration-300 cursor-pointer ${
              layoutMode === "random"
                ? "text-[#0a0a0a] font-semibold"
                : "text-[rgb(134,112,112)] hover:text-[rgb(110,90,90)] bg-transparent dark:text-[rgb(228,208,208)] dark:hover:text-[rgb(245,235,235)]"
            }`}
          >
            {layoutMode === "random" && (
              <motion.div
                layoutId="gallery-toggle"
                className="absolute inset-0 rounded-full bg-[rgb(134,112,112)] dark:bg-[rgb(213,180,180)] shadow-sm pointer-events-none"
              />
            )}
            <span className="relative z-10">Random</span>
          </button>
        </div>
        <p className="text-center text-[rgb(134,112,112)]/70 dark:text-[rgb(228,208,208)]/60 text-[10px] font-mono tracking-widest mt-4 uppercase">
          {isRandom
            ? "Constellation · connected to center"
            : "Infinite loop · smooth state transition"}
        </p>
      </div>
    </div>
  );
}

function LayoutGroupContainer({
  isRandom,
  randomPositions,
}: {
  isRandom: boolean;
  randomPositions: any[];
}) {
  return (
    <>
      {isRandom ? (
        // RANDOM VIEW — Absolute Exploded Canvas
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0.15}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
        >
          <div className="absolute inset-0 w-full h-full">
            {assets.map((src, i) => {
              const pos = randomPositions[i];
              const isVideo = src.endsWith(".mp4");
              return (
                <motion.div
                  key={src}
                  layoutId={`shared-gallery-card-${src}`}
                  transition={springTransition}
                  drag
                  dragMomentum={false}
                  dragElastic={0.2}
                  whileHover={{ scale: 1.08, zIndex: 50 }}
                  whileDrag={{ scale: 1.1, zIndex: 100 }}
                  className="absolute rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.45)] cursor-grab active:cursor-grabbing"
                  style={{
                    top: `${pos.top}%`,
                    left: `${pos.left}%`,
                    width: isVideo ? "320px" : "220px",
                    height: isVideo ? "200px" : i % 3 === 0 ? "240px" : "180px",
                    rotate: `${pos.rotate}deg`,
                    scale: pos.scale,
                  }}
                >
                  {isVideo ? (
                    <video
                      src={src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={src}
                      alt={`gallery ${i}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  )}
                  <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ) : (
        // LINEAR VIEW — Infinite Auto-Marquee Horizontal Slider
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-auto py-12">
          <motion.div
            className="flex items-center gap-6 w-max cursor-grab active:cursor-grabbing"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
            drag="x"
            dragElastic={0.05}
          >
            {/* Render 2 sets for endless horizontal looping */}
            {[...assets, ...assets].map((src, index) => {
              const originalIndex = index % assets.length;
              const isVideo = src.endsWith(".mp4");
              return (
                <motion.div
                  key={`${src}-${index}`}
                  layoutId={index < assets.length ? `shared-gallery-card-${src}` : undefined}
                  transition={springTransition}
                  whileHover={{ scale: 1.05, y: -10, zIndex: 30 }}
                  className="relative shrink-0 rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                  style={{
                    width: isVideo ? "360px" : "280px",
                    height: isVideo ? "230px" : originalIndex % 2 === 0 ? "360px" : "280px",
                  }}
                >
                  {isVideo ? (
                    <video
                      src={src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={src}
                      alt={`gallery ${originalIndex}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl pointer-events-none" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest text-white/80">
                    {(originalIndex + 1).toString().padStart(2, "0")}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}
    </>
  );
}
