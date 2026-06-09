"use client";

import { motion } from "framer-motion";
import Image from "@/Components/ui/Image";
import { skillsData, type Skill } from "@/data/skills";

export default function SkillsMarquee() {
  const allSkills: Skill[] = Object.values(skillsData).flat();
  const duplicatedSkills = [...allSkills, ...allSkills];

  return (
    <div className="w-full overflow-hidden py-3 md:py-8 ">
      <motion.div
        className="flex gap-1 md:gap-8"
        animate={{
          x: [0, -50 + "%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 10,
            ease: "linear",
          },
        }}
      >
        {duplicatedSkills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div
              key={`${skill.name}-${index}`}
              className="flex items-center gap-3 px-6 py-3  shrink-0 group  transition-all duration-200"
            >
              {skill.image ? (
                <Image
                  src={skill.image}
                  alt={skill.name}
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain filter grayscale"
                />
              ) : Icon ? (
                <Icon className="w-7 h-7 text-neutral-900 group-hover:text-foreground transition-colors duration-200" />
              ) : null}
              <span className="text-md font-medium text-neutral-700 group-hover:text-foreground transition-colors duration-200 whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
