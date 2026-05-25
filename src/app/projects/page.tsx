import Projects from "@/Components/sections/projects";
import { Plus } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of AI-powered products and full-stack web applications: MemContext (persistent memory for AI agents), MUJ General (research repository), CappyChat (AI chat platform), CappyUI (component library), Bashio (AI CLI), ResuMate (AI resume builder), Quoridor Online (real-time multiplayer), SkillCompass, SmartBite, and more. Built with Next.js, React, TypeScript, and modern AI tooling.",
  keywords: [
    "Vranda Garg Projects",
    "AI Products",
    "AI Engineer Portfolio",
    "Web Development Projects",
    "Next.js Projects",
    "React Projects",
    "Portfolio Projects",
    "MemContext",
    "MUJ General",
    "CappyChat",
    "CappyUI",
    "Bashio",
    "Quoridor Online",
    "ResuMate",
    "SkillCompass",
    "Full Stack Projects",
  ],
  openGraph: {
    title: "Projects - Vranda Garg Portfolio",
    description:
      "AI-powered products and full-stack web apps including MemContext, MUJ General, CappyChat, CappyUI, Bashio, ResuMate, and Quoridor Online. Built with Next.js, React, TypeScript, and modern AI tooling.",
    url: "https://vrandagarg.in/projects",
    siteName: "Vranda Garg - Portfolio",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1765637887/banner_hfyoau.png",
        width: 2160,
        height: 1215,
        alt: "Vranda Garg - Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Vranda Garg Portfolio",
    description:
      "AI-powered products and full-stack web apps shipped end-to-end with strong UI/UX.",
    creator: "@vrandaagarg",
    images: ["https://res.cloudinary.com/dyetf2h9n/image/upload/v1765637887/banner_hfyoau.png"],
  },
  alternates: {
    canonical: "https://vrandagarg.in/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto flex flex-col items-center justify-center  px-4 md:px-0">
      <div className="w-full pt-16 border-l border-r border-neutral-200 relative ">


        <Projects />

        <div className="border-t border-neutral-200 relative">
          <Plus className="absolute -top-3 -left-3 h-6 w-6 text-neutral-400 z-20" />
          <Plus className="absolute -top-3 -right-3 h-6 w-6 text-neutral-400 z-20" />
        </div>
      </div>
    </main>
  );
}
