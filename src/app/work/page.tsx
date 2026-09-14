import { Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { ProjectsWithTabs } from "@/components/work/ProjectsWithTabs";
import { getPosts } from "@/utils/utils";
import { SmoothScroll } from "@/components/SmoothScroll";

export async function generateMetadata() {
  return Meta.generate({
    title: "Projects — Ali Hanafiah",
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  const allProjects = getPosts(["src", "app", "work", "projects"]);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 pt-28 pb-20 relative z-10 overflow-x-hidden">
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={work.path}
          title={work.title}
          description={work.description}
          image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />

        {/* Central Projects Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-dark)] mb-3">
            // Selected Portfolio Showcase
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-[var(--text-main)] uppercase">
            Projects — <span className="font-serif italic font-normal text-[var(--text-accent)] lowercase">Ali Hanafiah</span>
          </h1>
        </div>

        {/* Tabbed Projects Feed */}
        <ProjectsWithTabs allProjects={allProjects} />
      </main>
    </SmoothScroll>
  );
}
