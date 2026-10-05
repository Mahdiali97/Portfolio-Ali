"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Reveal } from "./ui/Reveal";

// Shared data
const galleryImages = [
  { src: "/Portfolio-Ali/images/gallery/ComasPro1.jpg", alt: "COMAS Pro project milestone" },
  { src: "/Portfolio-Ali/images/gallery/FCDO.jpg", alt: "FCDO event milestone" },
  { src: "/Portfolio-Ali/images/gallery/KHARpresent.jpg", alt: "KHAR project presentation" },
  { src: "/Portfolio-Ali/images/gallery/ProjectPresent.jpg", alt: "Project presentation" },
  { src: "/Portfolio-Ali/images/gallery/SyncFura.jpg", alt: "SyncFura project milestone" },
  { src: "/Portfolio-Ali/images/gallery/KHARBuild.jpg", alt: "KHAR project build" },
  { src: "/Portfolio-Ali/images/gallery/ChampionFC25.jpg", alt: "FC 25 championship" },
  { src: "/Portfolio-Ali/images/gallery/FinalClass.jpg", alt: "Final class milestone" },
  { src: "/Portfolio-Ali/images/gallery/ChampionPauxRekreasi.jpg", alt: "Paux Rekreasi championship" },
  { src: "/Portfolio-Ali/images/gallery/DeanList_sem1-8.jpg", alt: "Dean's List recognition" },
  { src: "/Portfolio-Ali/images/gallery/SukiptMLBB.jpg", alt: "SUKIPT Mobile Legends tournament" },
  { src: "/Portfolio-Ali/images/gallery/ChampionUPSIMLBB.jpg", alt: "UPSI Mobile Legends championship" },
  { src: "/Portfolio-Ali/images/gallery/Internship.jpg", alt: "Internship milestone" },
  { src: "/Portfolio-Ali/images/gallery/Petanque2ndPlace.jpg", alt: "Pétanque second-place finish" },
  { src: "/Portfolio-Ali/images/gallery/Muallim1stPlaceMLBB.jpg", alt: "Muallim Mobile Legends first-place finish" },
  { src: "/Portfolio-Ali/images/gallery/UniversityMalayaMLBB3rdPlace.jpg", alt: "University of Malaya Mobile Legends third-place finish" },
  { src: "/Portfolio-Ali/images/gallery/UniPerksFYP.jpg", alt: "UniPerks final-year project" },
  { src: "/Portfolio-Ali/images/gallery/AwardFYP.jpg", alt: "Final-year project award" },
  { src: "/Portfolio-Ali/images/gallery/SuperUPSI2ndPlaceMLBB.jpg", alt: "Super UPSI Mobile Legends second-place finish" }
];

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[number] | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="gallery" className="py-32 bg-[var(--surface-ground)]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal direction="down">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--text-accent)] block mb-8">Archive / 06</span>
          <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tighter uppercase leading-[0.9] mb-16 text-[var(--text-primary)]">
            Moments & <br />
            <span className="font-serif italic font-normal lowercase text-[var(--text-secondary)]">Milestones</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, i) => (
            <Reveal key={image.src} direction="up" delay={(i % 4) * 0.1}>
              <button 
                onClick={() => setSelectedImage(image)}
                className="group relative aspect-square overflow-hidden rounded-sm border border-[var(--border-subtle)] bg-[var(--surface-card)] w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
                aria-label={`View gallery image: ${image.alt}`}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#07090e]/95 p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white font-mono uppercase text-xs tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </button>
            <img 
              src={selectedImage.src} 
              alt={`${selectedImage.alt} (enlarged)`} 
              className="max-w-full max-h-full object-contain rounded-sm shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
