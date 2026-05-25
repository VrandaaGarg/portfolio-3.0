"use client";

import { motion } from "framer-motion";
import { projectsData } from "@/data/projects";
import ProjectCard from "@/Components/ui/ProjectCard";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProjectsProps {
  limit?: number;
}

export default function Projects({ limit }: ProjectsProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const sortedProjects = [...projectsData].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const filteredProjects = isHomePage
    ? sortedProjects.filter((project) => project.featured)
    : sortedProjects;

  const displayedProjects = limit
    ? filteredProjects.slice(0, limit)
    : filteredProjects;

  return (
    <section className="py-10 md:py-16 px-5 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center flex-col justify-center mb-8">
          <div className="bg-card text-foreground mb-3 px-4 py-1 rounded-full text-sm font-medium border border-neutral-300 shadow-sm">
            Work
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground text-center">
            {pathname === "/projects" ? "My Projects" : "Featured Projects"}
          </h2>
          <div className="max-w-md text-center mt-3 text-neutral-700">
            These are some of the projects I&apos;ve worked on. I love building
            things and I&apos;m always looking for new challenges.
          </div>
          {isHomePage && (
            <div className="mt-4">
              <Link
                href="/projects"
                className="px-4 py-2.5 flex rounded-xl border hover:bg-neutral-950 border-foreground bg-neutral-800 text-background  transition-colors text-center text-sm font-medium"
              >
                View All
                <ChevronDown className="w-4 h-4 ml-2 -rotate-90" />
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 bg-card border border-neutral-200 shadow-sm rounded-2xl p-4 md:p-8 md:grid-cols-2 gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
              image={project.image}
              video={project.video}
              techStack={project.techStack}
              githubUrl={project.githubUrl}
              liveDemoUrl={project.liveDemoUrl}
              index={index}
              featured={project.featured}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
