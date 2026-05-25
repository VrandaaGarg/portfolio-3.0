"use client";

import { motion } from "framer-motion";
import { experienceData } from "@/data/experience";
import Image from "next/image";
import { Trophy, Medal, Code, GraduationCap, Briefcase } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";

const iconMap = {
  trophy: Trophy,
  medal: Medal,
  code: Code,
  academic: GraduationCap,
};

export default function Experience() {
  if (experienceData.length === 0) return null;

  // Single Item Layout (Centered)
  if (experienceData.length === 1) {
    const item = experienceData[0];

    return (
      <section id="experience" className="py-12 md:py-16 px-5 md:px-8 relative scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center flex-col justify-center mb-5 md:mb-8">
            <div className="bg-card text-foreground mb-3 px-4 py-1 rounded-full text-sm font-medium border border-neutral-300 shadow-sm">
              Journey
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-center">
              Experience
            </h2>
            <div className="max-w-md text-center mt-1 md:mt-3 text-neutral-700">
              My professional journey and achievements in technology and development.
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <SpotlightCard
              className="bg-card shadow-sm rounded-2xl p-5 md:p-8 transition-all duration-300"
              spotlightColor="rgba(var(--glow-color), var(--glow-opacity))"
            >
              <div className="flex flex-col md:flex-row gap-6 md:items-start">
                {/* Logo Section */}
                <div className="shrink-0 flex flex-row gap-2">
                  <div className="relative w-12 h-12 md:w-20 md:h-20 overflow-hidden">
                    <Image
                      src={item.logo}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="md:hidden">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                      {item.role}
                    </h3>
                    <p className="text-base md:text-lg font-medium text-neutral-600">
                      {item.name} {item.company && <span className="text-neutral-400">•</span>} {item.company}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2 md:mb-4">
                    <div className="hidden md:block">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                        {item.role}
                      </h3>
                      <p className="text-base md:text-lg font-medium text-neutral-600">
                        {item.name} {item.company && <span className="text-neutral-400">•</span>} {item.company}
                      </p>
                    </div>
                    {!item.positions && (
                      <div className="flex items-center gap-2 self-start md:self-start">
                        <span className="rounded-lg text-xs md:text-sm font-mono text-neutral-500 bg-neutral-200 px-3 py-1.5 whitespace-nowrap border border-neutral-300/50">
                          {item.duration}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Positions Section for Single Layout */}
                  {item.positions && (
                    <div className="mb-6 relative pl-4 space-y-6">
                      <div className="absolute left-0 top-2 h-[60%] bottom-0 w-px bg-neutral-600"/>

                      {item.positions.map((pos, idx) => (
                        <div key={idx} className="relative">
                          {/* Dot indicator */}
                          <div className={`absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 border-white ${idx === 0 ? "bg-emerald-500" : "bg-neutral-400"}`} />
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                           <div className=" flex gap-4 items-center">
                             <h4 className={`text-lg font-bold ${idx === 0 ? "text-foreground" : "text-neutral-600"}`}>
                              {pos.role}
                            </h4>
                            {/* {idx === 0 && (
                            <span className="inline-block mt-1 text-xs font-medium text-neutral-200 bg-neutral-900 px-2 py-0.5 rounded-full">
                              Latest Role
                            </span>
                          )} */}
                           </div>
                            <span className="text-xs font-mono text-neutral-600 bg-neutral-200 px-2 py-1 rounded whitespace-nowrap self-start sm:self-auto">
                              {pos.duration}
                            </span>
                          </div>
                          
                        </div>
                      ))}
                    </div>
                  )}

                  <ul className="text-base text-neutral-600 leading-relaxed mb-3 md:mb-6 space-y-2 list-disc list-items pl-3">
                    {item.description.map((point, index) => (
                      <li key={index} className="text-left">
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-200 text-neutral-700 border border-neutral-300/50 hover:bg-neutral-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  // Timeline Layout (Multiple Items)
  return (
    <section id="experience" className="py-16 px-8 relative scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center flex-col justify-center mb-8">
          <div className="bg-card text-foreground mb-3 px-4 py-1 rounded-full text-sm font-medium border border-neutral-300 shadow-sm">
            Journey
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground text-center">
            Experience
          </h2>
          <div className="max-w-md text-center mt-3 text-neutral-700">
            My professional journey and achievements in technology and development.
          </div>
        </div>

        <div className="bg-card border border-neutral-200 shadow-sm rounded-2xl p-8">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-neutral-200 via-neutral-400 to-neutral-200 transform -translate-x-1/2 hidden md:block" />

            {/* Mobile Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-neutral-300 md:hidden" />

            <div className="space-y-12">
              {experienceData.map((item, index) => {
                const Icon = iconMap[item.iconType] || Briefcase;
                const isLeft = item.left;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${isLeft ? "md:flex-row-reverse" : ""
                      }`}
                  >
                    {/* Content Side */}
                    <div className="flex-1 md:w-1/2 md:px-8 pl-20">
                      <SpotlightCard
                        className="bg-card rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                        spotlightColor="rgba(120, 120, 120, 0.15)"
                      >
                        <div className="flex flex-col mb-4 gap-2">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 overflow-hidden bg-white border border-neutral-200 p-1">
                                <Image
                                  src={item.logo}
                                  alt={item.name}
                                  fill
                                  className="object-contain p-1"
                                />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-foreground leading-tight">
                                  {item.role}
                                </h3>
                                <p className="text-sm font-medium text-neutral-600">
                                  {item.name} {item.company && `• ${item.company}`}
                                </p>
                              </div>
                            </div>
                            {!item.positions && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-neutral-500 bg-neutral-200 px-2 py-1 border border-neutral-300/50 whitespace-nowrap">
                                  {item.duration}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Positions Section for Timeline Layout */}
                          {item.positions && (
                            <div className="mt-4 mb-2 relative pl-4 border-l-2 border-neutral-200 space-y-4 ml-6">
                              {item.positions.map((pos, idx) => (
                                <div key={idx} className="relative">
                                  {/* Dot indicator */}
                                  <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white ${idx === 0 ? "bg-emerald-500" : "bg-neutral-400"}`} />
                                  
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <h4 className={`text-base font-bold ${idx === 0 ? "text-foreground" : "text-neutral-600"}`}>
                                      {pos.role}
                                    </h4>
                                    <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded whitespace-nowrap self-start sm:self-auto">
                                      {pos.duration}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <ul className="text-sm text-neutral-600 leading-relaxed mb-4 space-y-1.5 list-disc list-inside">
                          {item.description.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-[10px] font-medium bg-neutral-200 text-neutral-700 border border-neutral-300/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </SpotlightCard>
                    </div>

                    {/* Center Icon */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-neutral-100 border-4 border-white shadow-sm z-10">
                      <Icon className="w-5 h-5 text-neutral-700" />
                    </div>

                    {/* Empty Side for Desktop spacing */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
