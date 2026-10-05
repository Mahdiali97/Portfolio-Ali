import { Hero } from "@/components/Hero";
import { Introduction } from "@/components/Introduction";
import { WorkExhibition } from "@/components/WorkExhibition";
import { CaseStudies } from "@/components/CaseStudies";
import { ProfessionalBackground } from "@/components/ProfessionalBackground";
import { Skills } from "@/components/Skills";
import { GallerySection } from "@/components/GallerySection";
import { Conclusion } from "@/components/Conclusion";
import { Meta } from "@once-ui-system/core";
import { baseURL, home } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: "Muhamad Ali Hanafiah — Creative Software Engineer & UI/UX Designer",
    description: "Ultra-smooth interactive developer portfolio.",
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
      <div className="bg-[var(--surface-ground)] min-h-screen text-[var(--text-primary)] transition-colors duration-300">
        <Hero />
        <Introduction />
        <WorkExhibition />
        <CaseStudies />
        <ProfessionalBackground />
        <Skills />
        <GallerySection />
        <Conclusion />
      </div>
  );
}
