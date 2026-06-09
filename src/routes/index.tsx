import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/Components/sections/heroSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vranda Garg - Full Stack Developer | Portfolio" },
      {
        name: "description",
        content:
          "Full Stack Developer who ships AI-powered products end-to-end with strong UI/UX. Currently at Kakiyo OÜ. Built MemContext, MUJ General, CappyChat, CappyUI, Bashio, ResuMate, and Quoridor Online using TanStack Start, TypeScript, React, and modern AI tooling.",
      },
    ],
    links: [{ rel: "canonical", href: "https://vrandagarg.in" }],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="flex justify-center px-6">
      <div className="w-full max-w-4xl">
        <HeroSection />
      </div>
    </main>
  );
}
