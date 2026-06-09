import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import Projects from "@/Components/sections/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | Vranda Garg - Full Stack Developer" },
      {
        name: "description",
        content:
          "Explore my portfolio of AI-powered products and full-stack web applications: MemContext, MUJ General, CappyChat, CappyUI, Bashio, ResuMate, Quoridor Online, SkillCompass, SmartBite, and more. Built with TanStack Start, React, TypeScript, and modern AI tooling.",
      },
      {
        name: "keywords",
        content:
          "Vranda Garg Projects, AI Products, AI Engineer Portfolio, Web Development Projects, TanStack Start Projects, React Projects, Portfolio Projects, MemContext, MUJ General, CappyChat, CappyUI, Bashio, Quoridor Online, ResuMate, SkillCompass, Full Stack Projects",
      },
      { property: "og:title", content: "Projects - Vranda Garg Portfolio" },
      {
        property: "og:description",
        content:
          "AI-powered products and full-stack web apps including MemContext, MUJ General, CappyChat, CappyUI, Bashio, ResuMate, and Quoridor Online. Built with TanStack Start, React, TypeScript, and modern AI tooling.",
      },
      { property: "og:url", content: "https://vrandagarg.in/projects" },
      { property: "og:site_name", content: "Vranda Garg - Portfolio" },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1765637887/banner_hfyoau.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Projects - Vranda Garg Portfolio" },
      {
        name: "twitter:description",
        content: "AI-powered products and full-stack web apps shipped end-to-end with strong UI/UX.",
      },
      { name: "twitter:creator", content: "@vrandaagarg" },
      {
        name: "twitter:image",
        content: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1765637887/banner_hfyoau.png",
      },
    ],
    links: [{ rel: "canonical", href: "https://vrandagarg.in/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 md:px-0">
      <div className="relative w-full border-l border-r border-neutral-200 pt-16">
        <Projects />

        <div className="relative border-t border-neutral-200">
          <Plus className="absolute -top-3 -left-3 z-20 h-6 w-6 text-neutral-400" />
          <Plus className="absolute -top-3 -right-3 z-20 h-6 w-6 text-neutral-400" />
        </div>
      </div>
    </main>
  );
}
