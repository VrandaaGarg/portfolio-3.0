"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsData } from "@/data/skills";
import SkillCard from "@/Components/ui/SkillCard";
import { cn } from "@/lib/utils";

export default function Skills() {
  const [activeTab, setActiveTab] = useState("All");
  const categories = ["All", ...Object.keys(skillsData)];

  const getFilteredSkills = () => {
    if (activeTab === "All") {
      // Flatten all skills into a single array
      return Object.values(skillsData).flat();
    }
    return skillsData[activeTab] || [];
  };

  const displayedSkills = getFilteredSkills();

  return (
    <section className="py-12 md:py-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center flex-col justify-center mb-5 md:mb-8">
          <div className="bg-card text-foreground mb-3 px-4 py-1 rounded-full text-sm font-medium border border-neutral-200 shadow-sm">
            Expertise
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground text-center mb-2 md:mb-4">
            Skills & Tools
          </h2>
          <div className="max-w-md text-center text-neutral-600">
            Explore the technologies and tools I use to craft exceptional digital experiences.
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex flex-wrap justify-center md:gap-2 bg-card p-1.5 rounded-xl border border-neutral-200">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative z-10",
                  activeTab === category
                    ? "text-background"
                    : "text-neutral-500 hover:text-neutral-700"
                )}
              >
                {activeTab === category && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-neutral-800 rounded-lg shadow-sm border border-neutral-200"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {displayedSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  damping: 25,
                  stiffness: 300
                }}
              >
                <SkillCard
                  name={skill.name}
                  icon={skill.icon}
                  image={skill.image}
                  grayscale={skill.grayscale}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
