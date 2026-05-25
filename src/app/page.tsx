import HeroSection from "@/Components/sections/heroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vranda Garg - Full Stack Developer | Portfolio",
  description:
    "Full Stack Developer who ships AI-powered products end-to-end with strong UI/UX. Currently at Kakiyo OÜ. Built MemContext, MUJ General, CappyChat, CappyUI, Bashio, ResuMate, and Quoridor Online using Next.js, TypeScript, React, and modern AI tooling.",
  alternates: {
    canonical: "https://vrandagarg.in",
  },
};

export default function Home() {
  return (
    <main className="flex justify-center px-6">
      <div className="w-full max-w-4xl">
        <HeroSection />
      </div>
    </main>
  );
}
