import { HeroCinema } from "@/components/HeroCinema";
import { IntroMockups } from "@/components/IntroMockups";
import { HorizontalWork } from "@/components/HorizontalWork";
import { JourneyOutline } from "@/components/JourneyOutline";
import { MassiveFooter } from "@/components/MassiveFooter";
import { SmoothScroll } from "@/components/SmoothScroll";
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
    <SmoothScroll>
      <main className="bg-[var(--bg-main)] min-h-screen text-[var(--text-main)] transition-colors duration-300">
        <HeroCinema />
        <IntroMockups />
        <HorizontalWork />
        <JourneyOutline />
        <MassiveFooter />
      </main>
    </SmoothScroll>
  );
}
